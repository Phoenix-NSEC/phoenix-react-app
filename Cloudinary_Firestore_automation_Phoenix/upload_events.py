import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import os
from datetime import datetime

from pathlib import Path

# Load environment variables
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Initialize Firebase (check if already initialized)
if not firebase_admin._apps:
    firebase_key_path = os.getenv('FIREBASE_KEY_PATH', './firebase-key.json')
    if firebase_key_path.startswith('.'):
        firebase_key_path = str(env_path.parent / firebase_key_path)
    cred = credentials.Certificate(firebase_key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()


def upload_image_to_cloudinary(image_path):
    """
    Upload image to Cloudinary and return the secure URL
    """
    try:
        if not image_path or pd.isna(image_path) or image_path == 'null':
            return None

        # Resolve relative image paths to absolute relative to script directory
        if image_path and (image_path.startswith('.') or not os.path.isabs(image_path)):
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))

        # Check if file exists (with extension variation check)
        if not os.path.exists(image_path):
            if image_path.endswith('.jpeg'):
                alt_path = image_path.replace('.jpeg', '.jpg')
                if os.path.exists(alt_path):
                    image_path = alt_path
            elif image_path.endswith('.jpg'):
                alt_path = image_path.replace('.jpg', '.jpeg')
                if os.path.exists(alt_path):
                    image_path = alt_path

        if not os.path.exists(image_path):
            print(f"Warning: Image file not found: {image_path}")
            return None

        # Upload to Cloudinary in events folder
        response = cloudinary.uploader.upload(
            image_path,
            folder="events",
            resource_type="image"
        )
        return response['secure_url']
    except Exception as e:
        print(f"Error uploading image {image_path}: {str(e)}")
        return None


def parse_date(date_value):
    """
    Parse date from various formats
    """
    try:
        if pd.isna(date_value):
            return None

        # If it's already a datetime object
        if isinstance(date_value, datetime):
            return date_value.strftime('%Y-%m-%d')

        # If it's a string, try to parse it
        if isinstance(date_value, str):
            # Try common date formats
            for fmt in ['%Y-%m-%d', '%d-%m-%Y', '%m/%d/%Y', '%d/%m/%Y']:
                try:
                    parsed_date = datetime.strptime(date_value, fmt)
                    return parsed_date.strftime('%Y-%m-%d')
                except ValueError:
                    continue

        # If it's a pandas timestamp
        return pd.to_datetime(date_value).strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Warning: Could not parse date {date_value}: {str(e)}")
        return str(date_value) if date_value else None


def process_excel_and_upload(excel_file_path):
    """
    Read Excel file, process each event, and upload to Firestore
    """
    try:
        # Read Excel file
        df = pd.read_excel(excel_file_path)

        # Validate required columns
        required_columns = ['Title', 'Description', 'Date', 'Wing', 'Image_Path']
        missing_columns = [col for col in required_columns if col not in df.columns]

        if missing_columns:
            raise ValueError(f"Excel file missing required columns: {missing_columns}")

        if df.empty:
            raise ValueError("Excel file is empty")

        # Process each event
        successful_uploads = 0
        failed_uploads = 0

        for index, row in df.iterrows():
            try:
                print(f"\nProcessing event {index + 1}: {row['Title']}")

                # Upload image to Cloudinary
                image_url = upload_image_to_cloudinary(row['Image_Path'])

                if not image_url:
                    print(f"⚠ Warning: No image uploaded for {row['Title']}")

                # Parse date
                event_date = parse_date(row['Date'])

                # Construct event object
                event = {
                    'title': row['Title'],
                    'description': row['Description'],
                    'date': event_date,
                    'wing': row['Wing'],
                    'image': image_url
                }

                # Remove None values
                event = {k: v for k, v in event.items() if v is not None}

                # Upload to Firestore as individual document
                # Auto-generate document ID
                doc_ref = db.collection('events').document()
                doc_ref.set(event)

                successful_uploads += 1
                print(f"[OK] Successfully uploaded: {row['Title']}")
                print(f"  Document ID: {doc_ref.id}")

            except Exception as e:
                failed_uploads += 1
                print(f"[ERROR] Failed to upload event {row['Title']}: {str(e)}")
                continue

        # Summary
        print(f"\n{'=' * 60}")
        print(f"Upload Summary:")
        print(f"{'=' * 60}")
        print(f"[OK] Successfully uploaded: {successful_uploads} events")
        if failed_uploads > 0:
            print(f"[ERROR] Failed uploads: {failed_uploads} events")
        print(f"{'=' * 60}")

        return successful_uploads > 0

    except Exception as e:
        print(f"Error processing Excel file: {str(e)}")
        return False


if __name__ == "__main__":
    # Specify your Excel file path
    excel_file = "./sample_data/events.xlsx"
    if excel_file.startswith('.') or not os.path.isabs(excel_file):
        excel_file = os.path.abspath(os.path.join(os.path.dirname(__file__), excel_file))

    if not os.path.exists(excel_file):
        print(f"Error: Excel file '{excel_file}' not found")
        print("Please update the excel_file variable with the correct path")
    else:
        print(f"Processing events from: {excel_file}")
        print(f"{'=' * 60}\n")
        success = process_excel_and_upload(excel_file)

        if success:
            print("\n[SUCCESS] Event upload process completed!")
        else:
            print("\n[ERROR] Event upload failed. Please check the errors above.")
import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import os
from pathlib import Path

# Load environment variables relative to script
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Firebase configuration
if not firebase_admin._apps:
    firebase_key_path = os.getenv('FIREBASE_KEY_PATH', './firebase-key.json')
    if firebase_key_path.startswith('.'):
        firebase_key_path = str(env_path.parent / firebase_key_path)
    cred = credentials.Certificate(firebase_key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()


def is_empty_value(val):
    """Check if value is empty or NA/Null/None"""
    if val is None:
        return True
    if pd.isna(val):
        return True
    val_str = str(val).strip().upper()
    if val_str in ['NULL', 'NA', 'N/A', 'NONE', '', 'NAN']:
        return True
    return False


def upload_image_to_cloudinary(image_path):
    """Upload image to Cloudinary and return the secure URL"""
    try:
        if not image_path or pd.isna(image_path) or image_path == "null":
            return None

        # Resolve relative image paths to absolute relative to script directory
        if image_path and (image_path.startswith('.') or not os.path.isabs(image_path)):
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))

        # Resolve path issues if extension is slightly off
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
            print(f"Warning: {image_path} does not exist")
            return None

        response = cloudinary.uploader.upload(
            image_path,
            folder="team_members",
            resource_type="image"
        )
        url = response["secure_url"]
        if url and url.lower().endswith('.heic'):
            url = url[:-5] + '.jpg'
        return url

    except Exception as e:
        print(f"Error uploading image {image_path}: {str(e)}")
        return None


def process_excel_and_upload(excel_file_path):
    """Read Excel file and upload team members to Firestore"""
    try:
        df = pd.read_excel(excel_file_path)

        if 'Year' not in df.columns or df.empty:
            raise ValueError('Excel file must have "Year" column with data')

        year = str(df['Year'].iloc[0])
        team_members = []

        for index, row in df.iterrows():
            print(f"Processing member {index + 1}: {row['Name']}")

            # Upload avatar image
            avatar_url = upload_image_to_cloudinary(row['Image_Path'])

            # Build social links
            social_links = {}
            instagram = row.get('Instagram')
            if not is_empty_value(instagram):
                social_links['instagram'] = str(instagram).strip()

            github = row.get('Github') or row.get('GitHub')
            if not is_empty_value(github):
                social_links['github'] = str(github).strip()

            linkedin = row.get('Linkedin') or row.get('LinkedIn')
            if not is_empty_value(linkedin):
                social_links['linkedin'] = str(linkedin).strip()

            # Create member object
            member = {
                'name': row['Name'],
                'designation': row['Designation'],
                'photo': avatar_url,
                'profileImgUrl': avatar_url,
                'socials': social_links,
                'socialMedia': social_links,
            }

            # Add optional portfolio link
            portfolio = row.get('Portfolio')
            if not is_empty_value(portfolio):
                member['portfolio'] = str(portfolio).strip()

            team_members.append(member)
            print(f"[OK] Successfully processed member: {row['Name']}")

        # Create team document
        team_document = {
            'year': year,
            'members': team_members
        }

        # Upload to Firestore (this will update the core-team collection)
        doc_ref = db.collection('core-team').document(year)
        doc_ref.set(team_document)

        print(f"\n{'=' * 60}")
        print(f"[SUCCESS] Successfully uploaded {len(team_members)} team members")
        print(f"[SUCCESS] Document ID: {year}")
        print(f"[SUCCESS] Collection: core-team")
        print(f"{'=' * 60}")

        return True

    except Exception as e:
        print(f"Error processing Excel file: {str(e)}")
        return False


if __name__ == "__main__":
    # Specify your Excel file path
    excel_file = "./data/core_members_data.xlsx"
    if excel_file.startswith('.') or not os.path.isabs(excel_file):
        excel_file = os.path.abspath(os.path.join(os.path.dirname(__file__), excel_file))

    if not os.path.exists(excel_file):
        print(f"Error: Excel file '{excel_file}' not found")
        print("Please update the excel_file variable with the correct path")
    else:
        print(f"Processing team members from: {excel_file}\n")
        success = process_excel_and_upload(excel_file)

        if success:
            print("\n[SUCCESS] Team upload completed successfully!")
        else:
            print("\n[ERROR] Team upload failed. Please check the errors above.")

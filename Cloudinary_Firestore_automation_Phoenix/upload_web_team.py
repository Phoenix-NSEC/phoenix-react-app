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
    """Upload image to Cloudinary and return the secure URL with extension fallback support"""
    try:
        if not image_path or pd.isna(image_path) or image_path == "null":
            return None

        # Resolve relative image paths to absolute relative to script directory
        if image_path and (image_path.startswith('.') or not os.path.isabs(image_path)):
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))

        # Resolve path issues if extension is missing or slightly off
        resolved_path = image_path
        if not os.path.exists(resolved_path):
            extensions = ['.png', '.jpg', '.jpeg', '.webp']
            found = False
            for ext in extensions:
                test_path = resolved_path + ext
                if os.path.exists(test_path):
                    resolved_path = test_path
                    found = True
                    break
            
            if not found:
                # Try modifying existing extension
                if resolved_path.endswith('.jpeg'):
                    test_path = resolved_path.replace('.jpeg', '.jpg')
                    if os.path.exists(test_path):
                        resolved_path = test_path
                elif resolved_path.endswith('.jpg'):
                    test_path = resolved_path.replace('.jpg', '.jpeg')
                    if os.path.exists(test_path):
                        resolved_path = test_path

        if not os.path.exists(resolved_path):
            print(f"Warning: Image path '{image_path}' could not be resolved on disk.")
            return None

        print(f"Uploading resolved image path: {resolved_path}")
        response = cloudinary.uploader.upload(
            resolved_path,
            folder="web_team_members",
            resource_type="image"
        )
        url = response["secure_url"]
        return url

    except Exception as e:
        print(f"Error uploading image {image_path}: {str(e)}")
        return None


def process_excel_and_upload(excel_file_path):
    """Read Excel file and upload web team members to Firestore"""
    try:
        df = pd.read_excel(excel_file_path)

        if 'Year' not in df.columns or df.empty:
            raise ValueError('Excel file must have "Year" column with data')

        year_str = str(df['Year'].iloc[0])
        # Format document ID to web_team_YYYY (e.g. web_team_2026 from 2026-27)
        start_year = year_str.split('-')[0].strip()
        doc_id = f"web_team_{start_year}"
        
        team_members = []

        for index, row in df.iterrows():
            print(f"Processing member {index + 1}: {row['Name']}")

            # Upload avatar image
            avatar_url = upload_image_to_cloudinary(row['Image_Path'])

            # Create member object with flat properties expected by Webteam.js
            member = {
                'name': row['Name'].strip(),
                'designation': row['Designation'].strip(),
                'avatar': avatar_url
            }

            # Optional Social fields
            instagram = row.get('Instagram')
            if not is_empty_value(instagram):
                member['instagram'] = str(instagram).strip()

            github = row.get('Github') or row.get('GitHub')
            if not is_empty_value(github):
                member['github'] = str(github).strip()

            linkedin = row.get('Linkedin') or row.get('LinkedIn')
            if not is_empty_value(linkedin):
                member['linkedin'] = str(linkedin).strip()

            facebook = row.get('Facebook')
            if not is_empty_value(facebook):
                member['facebook'] = str(facebook).strip()

            portfolio = row.get('Portfolio')
            if not is_empty_value(portfolio):
                member['portfolio'] = str(portfolio).strip()

            team_members.append(member)
            print(f"[OK] Successfully processed member: {row['Name']}")

        # Create team document
        team_document = {
            'year': year_str,
            'members': team_members
        }

        # Upload to Firestore (this will update the web-team collection)
        doc_ref = db.collection('web-team').document(doc_id)
        doc_ref.set(team_document)

        print(f"\n{'=' * 60}")
        print(f"[SUCCESS] Successfully uploaded {len(team_members)} web team members")
        print(f"[SUCCESS] Document ID: {doc_id}")
        print(f"[SUCCESS] Collection: web-team")
        print(f"{'=' * 60}")

        return True

    except Exception as e:
        print(f"Error processing Excel file: {str(e)}")
        return False


if __name__ == "__main__":
    excel_file = "./data/web_team_data.xlsx"
    if excel_file.startswith('.') or not os.path.isabs(excel_file):
        excel_file = os.path.abspath(os.path.join(os.path.dirname(__file__), excel_file))

    if not os.path.exists(excel_file):
        print(f"Error: Excel file '{excel_file}' not found")
    else:
        print(f"Processing web team members from: {excel_file}\n")
        success = process_excel_and_upload(excel_file)

        if success:
            print("\n[SUCCESS] Web team upload completed successfully!")
        else:
            print("\n[ERROR] Web team upload failed. Please check the errors above.")

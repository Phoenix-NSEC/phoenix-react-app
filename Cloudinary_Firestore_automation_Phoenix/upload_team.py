import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials,firestore
from dotenv import load_dotenv
import os
from pathlib import Path

from google.auth import api_key

# Load environment variables relative to script
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

#Cloudinary:
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

#Firebase:
if not firebase_admin._apps:
    firebase_key_path = os.getenv('FIREBASE_KEY_PATH', './pheonix-backend-fba61-firebase-adminsdk-fbsvc-9404e878c4.json')
    if firebase_key_path.startswith('.'):
        firebase_key_path = str(env_path.parent / firebase_key_path)
    cred = credentials.Certificate(firebase_key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()

def upload_image_to_cloudinary(image_path):
    try:
        if not image_path or pd.isna(image_path) or image_path == "null":
            return None

        # Resolve relative image paths to absolute relative to script directory
        if image_path.startswith('.') or not os.getenv('FIREBASE_KEY_PATH') or not os.path.isabs(image_path):
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))

        # Check alternative extensions
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
            print(f"{image_path} does not exist")
            return None

        response=cloudinary.uploader.upload(image_path,folder="team_members",resource_type="image")
        return response["secure_url"]

    except Exception as e:
        print(f"Error uploading image {image_path}: {str(e)}")
        return None

def process_excel_and_upload(excel_file_path):
    try:
        df=pd.read_excel(excel_file_path)

        if 'Year' not in df.columns or df.empty:
            raise ValueError('Excel file must have "Year" column with data')
        year=str(df['Year'].iloc[0])

        team_members=[]

        for index,row in df.iterrows():
            print(f"Processing member {index+1}: {row['Name']}")

            avatar_url=upload_image_to_cloudinary(row['Image_Path'])

            social_links={}
            if pd.notna(row['Instagram']) and row['Instagram']!='null':
                social_links['instagram']=row['Instagram']

            if pd.notna(row['GitHub']) and row['GitHub'] != 'null':
                social_links['github'] = row['GitHub']

            if pd.notna(row['LinkedIn']) and row['LinkedIn'] != 'null':
                social_links['linkedin'] = row['LinkedIn']

            #member object:
            member={
                'name': row['Name'],
                'designation': row['Designation'],
                'avatar_url': avatar_url,
                'photo': avatar_url,
                'profileImgUrl': avatar_url,
                'social_links': social_links,
                'socials': social_links,
                'socialMedia': social_links,
            }

            if pd.notna(row['Portfolio']) and row['Portfolio'] != 'null':
                member['portfolio'] = row['Portfolio']

            team_members.append(member)
            print(f"Successfully processed member:{row['Name']}")


        team_document={
            'year': year,
            'members': team_members
        }

        #upload to FireStore
        doc_ref=db.collection('core-team').document(year)
        doc_ref.set(team_document)

        print(f"\n[SUCCESS] Successfully uploaded {len(team_members)} team members to Firestore")
        print(f"[SUCCESS] Document ID: {year}")

        return True

    except Exception as e:
        print(f"Error processing Excel file: {str(e)}")
        return False


if __name__ == "__main__":
    # Specify your Excel file path
    excel_file = "./sample_data/team_members.xlsx"  # Change this to your Excel file path
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
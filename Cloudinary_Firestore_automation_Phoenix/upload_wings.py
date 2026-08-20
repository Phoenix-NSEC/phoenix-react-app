import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
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

# Configure Firebase
if not firebase_admin._apps:
    firebase_key_path = os.getenv('FIREBASE_KEY_PATH', './firebase-key.json')
    if firebase_key_path.startswith('.'):
        firebase_key_path = str(env_path.parent / firebase_key_path)
    cred = credentials.Certificate(firebase_key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()

IMAGES_DIR = Path(__file__).parent / "data" / "images"

def is_empty_value(val):
    """Check if value is empty or NA/Null/None"""
    if val is None:
        return True
    if pd.isna(val):
        return True
    val_str = str(val).strip().upper()
    if val_str in ['NULL', 'NA', 'N/A', 'NONE', '', 'NAN', '_']:
        return True
    return False

def upload_image_to_cloudinary(image_name):
    """Upload local image to Cloudinary and return secure URL"""
    try:
        if is_empty_value(image_name):
            return None

        # Resolve image path
        image_path = IMAGES_DIR / str(image_name).strip()
        
        # Check fallback extensions if the file isn't found exactly
        if not image_path.exists():
            extensions = ['.png', '.jpg', '.jpeg', '.webp', '.JPG', '.PNG', '.JPEG']
            found = False
            for ext in extensions:
                test_path = image_path.with_suffix(ext)
                if test_path.exists():
                    image_path = test_path
                    found = True
                    break
            
            if not found:
                print(f"Warning: Image '{image_name}' not found in {IMAGES_DIR}")
                return None

        print(f"Uploading image to Cloudinary: {image_path.name}")
        response = cloudinary.uploader.upload(
            str(image_path),
            folder="Wing",
            resource_type="image"
        )
        return response["secure_url"]

    except Exception as e:
        print(f"Error uploading image {image_name}: {str(e)}")
        return None

def main():
    # Look for wings_data.xlsx or wings_data.csv
    xlsx_path = Path(__file__).parent / "data" / "wing_members_data.xlsx"
    csv_path = Path(__file__).parent / "data" / "wing_members_data.csv"
    
    if xlsx_path.exists():
        file_path = xlsx_path
        print(f"Reading Excel data from: {file_path.name}")
        df = pd.read_excel(file_path)
    elif csv_path.exists():
        file_path = csv_path
        print(f"Reading CSV data from: {file_path.name}")
        df = pd.read_csv(file_path)
    else:
        print("Error: No wing data file found.")
        print(f"Please place your wing members data in either:\n  - {xlsx_path}\n  - {csv_path}")
        return

    # Normalize wing names to standard lowercase keys
    wing_mapping = {
        'robonics': 'robonix',
        'robonix': 'robonix',
        'cybernix': 'cybernix',
        'eloquence': 'eloquense',
        'eloquense': 'eloquense',
        'virtuix': 'virtuix',
        'illustro': 'illustro',
        'flagship': 'flagship'
    }

    # Group members by wing key
    wings_members = {}
    
    for idx, row in df.iterrows():
        wing_input = str(row.get('Wing', '')).strip().lower()
        wing_key = wing_mapping.get(wing_input, wing_input)
        
        if not wing_key:
            continue
            
        name = str(row.get('Name', '')).strip()
        designation = str(row.get('Designation', '')).strip()
        image_name = row.get('Image_Name') or row.get('Image_Path')
        
        if is_empty_value(name) or is_empty_value(wing_key):
            continue
            
        print(f"Processing {name} for {wing_key}...")
        profile_img_url = upload_image_to_cloudinary(image_name)
        
        socials = {}
        # Get socials
        for col_name, social_key in [('Instagram', 'insta'), ('Github', 'github'), ('LinkedIn', 'linkedin'), ('Facebook', 'facebook')]:
            val = row.get(col_name)
            if not is_empty_value(val):
                socials[social_key] = str(val).strip()
                
        member_obj = {
            'name': name,
            'designation': designation,
            'profileImgUrl': profile_img_url,
            'socials': socials
        }
        
        if wing_key not in wings_members:
            wings_members[wing_key] = []
        wings_members[wing_key].append(member_obj)

    if not wings_members:
        print("No valid wing members data found in file.")
        return

    print("\n--- Uploading wings to Firebase Firestore ---")
    for wing_key, members in wings_members.items():
        print(f"Uploading '{wing_key}' ({len(members)} members) to Firestore...")
        try:
            doc_ref = db.collection('wings').document(wing_key)
            doc_ref.set({
                'name': wing_key,
                'members': members
            }, merge=True)
            print(f"  [OK] Uploaded '{wing_key}' successfully to collection 'wings'")
        except Exception as e:
            print(f"  [ERROR] Failed to upload '{wing_key}' to Firestore: {str(e)}")

    print(f"\n[SUCCESS] Successfully updated wings in Firestore!")

if __name__ == "__main__":
    main()

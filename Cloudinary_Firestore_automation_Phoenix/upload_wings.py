import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials, firestore
import os
import re
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

# Target JS file
WING_DATA_JS_PATH = Path(__file__).parent.parent / "src" / "data" / "wingData.js"
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

def find_matching_bracket(text, start_index):
    """Finds matching closing bracket ']' starting from the index of the opening bracket '['"""
    bracket_count = 0
    in_string = False
    string_char = None
    escaped = False
    
    for i in range(start_index, len(text)):
        char = text[i]
        
        if escaped:
            escaped = False
            continue
        if char == '\\':
            escaped = True
            continue
            
        if char in ['"', "'", '`']:
            if not in_string:
                in_string = True
                string_char = char
            elif string_char == char:
                in_string = False
        
        if not in_string:
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    return i
    return -1

def generate_members_js(members_list):
    """Generate formatting for members array in JS"""
    js_lines = ["[\n"]
    for member in members_list:
        js_lines.append("      {\n")
        js_lines.append(f"        name: {repr(member['name'])},\n")
        js_lines.append(f"        designation: {repr(member['designation'])},\n")
        
        # Wrap photo URL
        if member['profileImgUrl']:
            js_lines.append(f"        profileImgUrl: {repr(member['profileImgUrl'])},\n")
        else:
            js_lines.append("        profileImgUrl: \"\",\n")
            
        # Socials
        js_lines.append("        socials: {\n")
        for key, val in member['socials'].items():
            if val:
                js_lines.append(f"          {key}: {repr(val)},\n")
        js_lines.append("        },\n")
        js_lines.append("      },\n")
        
    js_lines.append("    ]")
    return "".join(js_lines)

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
    # Map synonyms if user types differently
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

    # Now read wingData.js and update it
    if not WING_DATA_JS_PATH.exists():
        print(f"Error: Target file {WING_DATA_JS_PATH} not found.")
        return

    with open(WING_DATA_JS_PATH, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # For each wing we have new members for, replace the members array
    for wing_key, members in wings_members.items():
        print(f"Updating wing '{wing_key}' with {len(members)} members in wingData.js...")
        
        # Regex to locate: wing_key: { ... members: [
        # We search for wing_key followed by opening brace, and then "members: ["
        pattern = rf"{wing_key}\s*:\s*\{{[^}}]*?members\s*:\s*\["
        match = re.search(pattern, js_content, re.DOTALL)
        
        if not match:
            print(f"Warning: Could not find members array for wing '{wing_key}' in wingData.js. Skipping.")
            continue
            
        # Find index of '[' which is match.end() - 1
        open_bracket_idx = match.end() - 1
        close_bracket_idx = find_matching_bracket(js_content, open_bracket_idx)
        
        if close_bracket_idx == -1:
            print(f"Error: Unbalanced brackets in wingData.js for '{wing_key}' members array.")
            continue
            
        new_members_js = generate_members_js(members)
        
        # Replace the old array with the new one
        js_content = js_content[:open_bracket_idx] + new_members_js + js_content[close_bracket_idx + 1:]

    # Write the updated content back
    with open(WING_DATA_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print("\n--- Uploading wings to Firebase Firestore ---")
    for wing_key, members in wings_members.items():
        print(f"Uploading '{wing_key}' members list to Firestore...")
        try:
            doc_ref = db.collection('wings').document(wing_key)
            doc_ref.set({
                'name': wing_key,
                'members': members
            })
            print(f"  [OK] Uploaded '{wing_key}' successfully to collection 'wings'")
        except Exception as e:
            print(f"  [ERROR] Failed to upload '{wing_key}' to Firestore: {str(e)}")

    print(f"\n[SUCCESS] Successfully updated wings in wingData.js and Firestore!")

if __name__ == "__main__":
    main()

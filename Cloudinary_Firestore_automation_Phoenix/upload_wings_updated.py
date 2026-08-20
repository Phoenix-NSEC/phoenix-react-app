import pandas as pd
import cloudinary
import cloudinary.uploader
import firebase_admin
from firebase_admin import credentials, firestore
import os
import re
import requests
import shutil
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

# Target paths
WING_DATA_JS_PATH = Path(__file__).parent.parent / "src" / "data" / "wingData.js"
TEMP_DIR = Path(__file__).parent / "data" / "temp_images"

# Ensure temp directory exists
TEMP_DIR.mkdir(parents=True, exist_ok=True)

def is_empty_value(val):
    """Check if value is empty or NA/Null/None"""
    if val is None:
        return True
    if pd.isna(val):
        return True
    val_str = str(val).strip().upper()
    if val_str in ['NULL', 'NA', 'N/A', 'NONE', '', 'NAN', '_', 'NIL', 'NAT']:
        return True
    return False

def extract_gdrive_ids(cell_value):
    """Extract all Google Drive file IDs from cell content"""
    if is_empty_value(cell_value):
        return []
    
    # Extract URLs
    urls = re.findall(r'https?://[^\s,]+', str(cell_value))
    gdrive_ids = []
    
    for url in urls:
        if 'drive.google.com' in url:
            # Try open?id=...
            match1 = re.search(r'id=([a-zA-Z0-9_-]{25,})', url)
            if match1:
                gdrive_ids.append(match1.group(1))
                continue
            # Try /file/d/...
            match2 = re.search(r'/file/d/([a-zA-Z0-9_-]{25,})', url)
            if match2:
                gdrive_ids.append(match2.group(1))
    
    return gdrive_ids

def download_from_gdrive(gdrive_id, dest_path):
    """Download file from Google Drive direct link"""
    try:
        URL = "https://docs.google.com/uc?export=download"
        session = requests.Session()
        
        # Initial request
        response = session.get(URL, params={'id': gdrive_id}, stream=True)
        
        # Check for confirmation token
        token = None
        for key, value in response.cookies.items():
            if key.startswith('download_warning'):
                token = value
                break
                
        if token:
            params = {'id': gdrive_id, 'confirm': token}
            response = session.get(URL, params=params, stream=True)
            
        if response.status_code == 200:
            with open(dest_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=32768):
                    if chunk:
                        f.write(chunk)
            
            # Check size to ensure it's a valid download (not an error page)
            if dest_path.stat().st_size > 5000:  # > 5KB
                return True
        return False
    except Exception as e:
        print(f"Error downloading Google Drive ID {gdrive_id}: {str(e)}")
        return False

def upload_gdrive_image_to_cloudinary(gdrive_ids, member_name):
    """Download Google Drive image and upload it to Cloudinary"""
    if not gdrive_ids:
        return None

    clean_name = re.sub(r'[^a-zA-Z0-9]', '_', member_name)
    
    for idx, gid in enumerate(gdrive_ids):
        temp_file = TEMP_DIR / f"{clean_name}_{idx}.jpg"
        print(f"  Attempting download for {member_name} (Drive ID: {gid})...")
        
        if download_from_gdrive(gid, temp_file):
            print(f"  [OK] Downloaded successfully to {temp_file.name}")
            try:
                # Upload to Cloudinary
                print(f"  Uploading {member_name}'s photo to Cloudinary...")
                response = cloudinary.uploader.upload(
                    str(temp_file),
                    folder="Wing",
                    resource_type="image"
                )
                # Cleanup temp file
                if temp_file.exists():
                    temp_file.unlink()
                return response["secure_url"]
            except Exception as e:
                print(f"  Error uploading {temp_file.name} to Cloudinary: {str(e)}")
                if temp_file.exists():
                    temp_file.unlink()
        else:
            print(f"  [FAILED] Failed to download Drive ID: {gid}")
            if temp_file.exists():
                temp_file.unlink()

    return None

def normalize_name(name):
    """Normalize name for comparison / deduplication"""
    if is_empty_value(name):
        return ""
    norm = " ".join(str(name).strip().split()).lower()
    # Map spelling variations
    variation_map = {
        'moniratna roy': 'maniratna roy',
        'monirotno roy': 'maniratna roy',
        'monirotna roy': 'maniratna roy',
        'monirotno roy ': 'maniratna roy'
    }
    return variation_map.get(norm, norm)

def format_instagram(insta_val):
    """Format instagram value to a clean link"""
    if is_empty_value(insta_val):
        return None
    insta_str = str(insta_val).strip()
    if insta_str.startswith(('http://', 'https://', 'www.')):
        if insta_str.startswith('www.'):
            return "https://" + insta_str
        return insta_str
    # It is likely an ID/handle
    insta_str = insta_str.replace('@', '')
    return f"https://www.instagram.com/{insta_str}"

def format_linkedin(linkedin_val):
    """Format linkedin value, ensuring it starts with http"""
    if is_empty_value(linkedin_val):
        return None
    li_str = str(linkedin_val).strip()
    # If they just entered their name or ID, or something invalid
    if not li_str.startswith(('http://', 'https://', 'www.')):
        # If it doesn't look like a URL at all, skip it (unless it could be a profile ID)
        if 'linkedin.com' in li_str:
            return "https://" + li_str
        elif '/' in li_str:
            return f"https://www.linkedin.com/in/{li_str}"
        else:
            # Not a URL, probably just plain text name, ignore
            return None
    if li_str.startswith('www.'):
        return "https://" + li_str
    return li_str

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
    xlsx1_path = Path(__file__).parent / "data" / "wing member response 1.xlsx"
    xlsx2_path = Path(__file__).parent / "data" / "wing member response 2.xlsx"
    
    if not xlsx1_path.exists():
        print(f"Error: Required file '{xlsx1_path}' does not exist.")
        return
    if not xlsx2_path.exists():
        print(f"Error: Required file '{xlsx2_path}' does not exist.")
        return

    print("Reading Excel files...")
    df1 = pd.read_excel(xlsx1_path)
    df2 = pd.read_excel(xlsx2_path)
    
    print(f"Loaded {len(df1)} rows from Response 1 and {len(df2)} rows from Response 2")
    
    # Wing normalization mapping
    wing_mapping = {
        'robonics': 'robonix',
        'robonix': 'robonix',
        'cybernix': 'cybernix',
        'cybersec': 'cybernix',
        'eloquence': 'eloquense',
        'eloquense': 'eloquense',
        'virtuix': 'virtuix',
        'illustro': 'illustro',
        'illustro core': 'illustro',
        'flagship': 'flagship'
    }

    # Consolidated members dict: { normalized_name: member_data_dict }
    consolidated_members = {}

    # 1. Process Wing Member Response 1
    # Columns: ['Timestamp', 'Email address', 'Full Name', 'Designation (Wing Lead or \nWing Coordinator)', 'Wing name', ' Your photos (upload 2 photos only)  ', 'Instagram account LINK (not ID)', 'Phone number', 'Year of study']
    print("\n--- Processing Wing Member Response 1 ---")
    for idx, row in df1.iterrows():
        raw_name = row.get('Full Name')
        if is_empty_value(raw_name):
            continue
        name = str(raw_name).strip()
        norm_name = normalize_name(name)
            
        wing_input = str(row.get('Wing name', '')).strip().lower()
        wing_key = wing_mapping.get(wing_input, None)
        
        # If it's Club Co-ordinator, warn and skip
        if not wing_key:
            print(f"Warning: Member '{name}' has unrecognized wing name '{row.get('Wing name')}' - skipping.")
            continue
            
        raw_designation = str(row.get('Designation (Wing Lead or \nWing Coordinator)', '')).strip().lower()
        designation = "Wing Lead" if "lead" in raw_designation else "Wing coordinator"
        
        gdrive_ids = extract_gdrive_ids(row.get(' Your photos (upload 2 photos only)  '))
        instagram = format_instagram(row.get('Instagram account LINK (not ID)'))
        
        consolidated_members[norm_name] = {
            'name': name,
            'wing': wing_key,
            'designation': designation,
            'gdrive_ids': gdrive_ids,
            'instagram': instagram,
            'linkedin': None
        }

    # 2. Process Wing Member Response 2 (All placed under cybernix)
    # Columns: ['C', 'Email address', 'Full Name', 'Designation ', 'Department', 'Contact number', ' Your photos (upload 2 photos only)  ', 'Instagram ID', 'LinkedIn Account', 'Designation', 'Wing name']
    print("\n--- Processing Wing Member Response 2 (Forcing Cybernix) ---")
    for idx, row in df2.iterrows():
        raw_name = row.get('Full Name')
        if is_empty_value(raw_name):
            continue
        name = str(raw_name).strip()
        norm_name = normalize_name(name)
            
        # Get designation (try both 'Designation ' and 'Designation')
        raw_desig = str(row.get('Designation ') or row.get('Designation') or '').strip().lower()
        designation = "Wing Lead" if "lead" in raw_desig else "Wing coordinator"
        
        gdrive_ids = extract_gdrive_ids(row.get(' Your photos (upload 2 photos only)  '))
        instagram = format_instagram(row.get('Instagram ID'))
        linkedin = format_linkedin(row.get('LinkedIn Account'))
        
        # If already processed in df1, merge (df2 has more fields like linkedin)
        if norm_name in consolidated_members:
            print(f"Merging duplicate member '{name}' found in both sheets.")
            # Merge fields, prioritizing df2's linkedin and any extra gdrive ids
            existing = consolidated_members[norm_name]
            existing['linkedin'] = linkedin or existing['linkedin']
            existing['instagram'] = instagram or existing['instagram']
            # Prepend df2 drive IDs so they are tried first
            for gid in gdrive_ids:
                if gid not in existing['gdrive_ids']:
                    existing['gdrive_ids'].insert(0, gid)
        else:
            consolidated_members[norm_name] = {
                'name': name,
                'wing': 'cybernix', # Always Cybernix for sheet 2
                'designation': designation,
                'gdrive_ids': gdrive_ids,
                'instagram': instagram,
                'linkedin': linkedin
            }

    # 3. Download from Drive and Upload to Cloudinary
    print("\n--- Downloading photos and uploading to Cloudinary ---")
    # Group members by wing
    wings_members = {w: [] for w in ['cybernix', 'eloquense', 'virtuix', 'robonix', 'illustro', 'flagship']}
    
    for norm_name, data in consolidated_members.items():
        name = data['name']
        wing = data['wing']
        designation = data['designation']
        gdrive_ids = data['gdrive_ids']
        
        print(f"Processing member: {name} ({wing})")
        profile_img_url = upload_gdrive_image_to_cloudinary(gdrive_ids, name)
        
        if not profile_img_url:
            print(f"  [WARNING] No photo uploaded for {name}. Setting to empty.")
            profile_img_url = ""
            
        socials = {}
        if data['instagram']:
            socials['insta'] = data['instagram']
        if data['linkedin']:
            socials['linkedin'] = data['linkedin']
            
        member_obj = {
            'name': name,
            'designation': designation,
            'profileImgUrl': profile_img_url,
            'socials': socials
        }
        
        wings_members[wing].append(member_obj)

    # Sort members for each wing: Wing Lead first, then Wing coordinator
    for w in wings_members:
        wings_members[w].sort(key=lambda m: 0 if "lead" in m['designation'].lower() else 1)

    # 4. Cleanup temporary images folder
    print("\nCleaning up temporary local images...")
    if TEMP_DIR.exists():
        shutil.rmtree(TEMP_DIR)
        print("Temp folder deleted.")

    # 5. Local wingData.js update is deprecated in favor of Firestore
    print("\n[INFO] Skipping local wingData.js update (members are dynamically fetched from Firestore).")

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

    print("\n" + "=" * 60)
    print("[SUCCESS] Successfully completed wing members upload automation (Cloudinary, Local and Firestore)!")
    print("=" * 60)
    for wing_key, members in wings_members.items():
        print(f" - {wing_key}: {len(members)} members updated")

if __name__ == "__main__":
    main()

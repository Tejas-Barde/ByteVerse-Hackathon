import json
import re

file_path = "C:/Users/works/Documents/TrustLink/trustified_data.txt"

with open(file_path, "r", encoding="utf-8") as file:
    data = file.read()

entries = data.split("----------------------------------------")

def parse_entry(entry):
    entry_dict = {}
    lines = entry.strip().split("\n")
    
    for i in range(len(lines)):
        line = lines[i].strip()
        
        if line.startswith("Brand Name:"):
            entry_dict["Brand Name"] = line.replace("Brand Name:", "").strip()
        
        elif line.startswith("- Product Name") or line.startswith("Product Name–"):
            entry_dict["Product Name"] = line.split("–")[-1].strip()
        
        elif line.startswith("- Batch No. Tested") or line.startswith("Batch No. Tested-"):
            entry_dict["Batch No. Tested"] = line.split("-")[-1].strip()
        
        elif line.startswith("- Published Date") or line.startswith("Published Date-"):
            entry_dict["Published Date"] = line.split("-")[-1].strip()
        
        elif line.startswith("- Tested By") or line.startswith("Tested By-"):
            entry_dict["Tested By"] = line.split("-")[-1].strip()
        
        elif line.startswith("- Testing Status") or line.startswith("Testing Status-"):
            entry_dict["Testing Status"] = line.split("-")[-1].strip()
        
        elif line.startswith("Image URL:"):
            entry_dict["Image URL"] = line.replace("Image URL:", "").strip()
        
        elif line.startswith("Link to Test Report:"):
            entry_dict["Link to Test Report"] = line.replace("Link to Test Report:", "").strip()
    
    return entry_dict

structured_data = [parse_entry(entry) for entry in entries if entry.strip()]

json_output_path = "C:/Users/works/Documents/TrustLink/trustified_data.json"
with open(json_output_path, "w", encoding="utf-8") as json_file:
    json.dump(structured_data, json_file, indent=4)

print(f"JSON file saved at {json_output_path}")




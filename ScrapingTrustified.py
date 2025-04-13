import requests
import html
from bs4 import BeautifulSoup

def scrapeTrustified():
    url = "https://www.trustified.in/passandfail"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    def clean_text(text):
        return html.unescape(text)

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            brand_names = [
                clean_text(h2.get_text(strip=True))
                for h2 in soup.find_all('h2', class_="font_2 wixui-rich-text__text")
            ]
            if "email us at" in brand_names[-1].lower():
                brand_names.pop()

            product_sections = soup.find_all('ul', class_="font_8 wixui-rich-text__text")
            product_details = [
                [
                    clean_text(detail.get_text(strip=True))
                    for detail in section.find_all('li', class_="wixui-rich-text__text")
                ]
                for section in product_sections
            ]

            product_images = []
            for product_section in product_sections:
                image_tag = product_section.find_previous('img', alt=True)
                product_images.append(image_tag['src'] if image_tag and 'src' in image_tag.attrs else None)

            test_report_links = []
            for product_section in product_sections:
                report_link_tag = product_section.find_next('a', class_="StylableButton2545352419__root", href=True)
                test_report_links.append(report_link_tag['href'] if report_link_tag else "No Report Link Available")

            if len(brand_names) == len(product_details) == len(product_images) == len(test_report_links):
                with open("trustified_data.txt", "w", encoding="utf-8") as file:
                    for i in range(len(brand_names)):
                        file.write(f"Brand Name: {brand_names[i]}\n")
                        file.write("Product Details:\n")
                        file.writelines(f"- {detail}\n" for detail in product_details[i])
                        file.write(f"Image URL: {product_images[i] if product_images[i] else 'No Image Available'}\n")
                        file.write(f"Link to Test Report: {test_report_links[i]}\n")
                        file.write("-" * 40 + "\n")
                print("Data scraped and saved successfully!")
            else:
                print("Mismatch between extracted data elements.")
        else:
            print(f"Failed to fetch the page. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == '__main__':
    scrapeTrustified()

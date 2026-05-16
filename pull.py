import os
import time
import requests
from urllib.parse import urlparse

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from webdriver_manager.chrome import ChromeDriverManager

URL = "https://manwah.com.vn/mon-le"
SAVE_DIR = "images"

os.makedirs(SAVE_DIR, exist_ok=True)

# =========================
# Setup Chrome
# =========================
chrome_options = Options()
chrome_options.add_argument("--start-maximized")

# nếu muốn chạy ẩn browser:
# chrome_options.add_argument("--headless")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=chrome_options
)

try:
    # Open page
    driver.get(URL)

    time.sleep(5)

    # =========================
    # Scroll load all products
    # =========================
    last_height = driver.execute_script(
        "return document.body.scrollHeight"
    )

    while True:
        driver.execute_script(
            "window.scrollTo(0, document.body.scrollHeight);"
        )

        time.sleep(3)

        new_height = driver.execute_script(
            "return document.body.scrollHeight"
        )

        if new_height == last_height:
            break

        last_height = new_height

    # =========================
    # Get image tags
    # =========================
    image_elements = driver.find_elements(
        By.CSS_SELECTOR,
        "div.css-product img"
    )

    image_urls = []

    for img in image_elements:
        src = img.get_attribute("src")

        if src and src.startswith("http"):
            image_urls.append(src)

    # remove duplicate
    image_urls = list(set(image_urls))

    print(f"Found {len(image_urls)} images")

    # =========================
    # Download images
    # =========================
    for idx, img_url in enumerate(image_urls, start=1):
        try:
            response = requests.get(img_url, timeout=20)

            if response.status_code == 200:
                parsed = urlparse(img_url)

                filename = os.path.basename(parsed.path)

                if not filename:
                    filename = f"image_{idx}.jpg"

                save_path = os.path.join(SAVE_DIR, filename)

                with open(save_path, "wb") as f:
                    f.write(response.content)

                print(f"[{idx}] Downloaded: {filename}")

        except Exception as e:
            print(f"Failed {img_url}")
            print(e)

finally:
    driver.quit()

print("Done.")
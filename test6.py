import requests
import os

# إعدادات
base_url = 'https://vidsrc.xyz/movies/latest/page-'
total_pages = 1543
output_folder = os.path.expanduser('~/Desktop/vidsrc_pages')  # المجلد الذي سيتم حفظ الملفات فيه

# إنشاء المجلد إذا لم يكن موجودًا
os.makedirs(output_folder, exist_ok=True)

# تنزيل الصفحات
for page in range(1, total_pages + 1):
    url = f'{base_url}{page}.json'
    response = requests.get(url)
    if response.status_code == 200:
        file_path = os.path.join(output_folder, f'page-{page}.json')
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f'Successfully downloaded page {page}')
    else:
        print(f'Failed to download page {page}')
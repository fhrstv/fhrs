import os
import requests

# تحميل محتوى الملف من الرابط
url = "https://vidsrc.me/ids/mov_tmdb.txt"
response = requests.get(url)

# التأكد من نجاح التحميل
if response.status_code == 200:
    # تقسيم المحتوى إلى أسطر
    lines = response.text.splitlines()
    
    # تحويل كل سطر إلى عدد صحيح وإضافته إلى قائمة
    tmdb_ids = [int(line.strip()) for line in lines]
    
    # تحديد المسار لسطح المكتب
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop", "tmdb.js")
    
    # فتح ملف tmdb.js على سطح المكتب وكتابة النتيجة فيه
    with open(desktop_path, 'w') as js_file:
        js_file.write(f"const tmdbids = {tmdb_ids};")

    print(f"تم حفظ القائمة في ملف {desktop_path}")
else:
    print("فشل في تحميل الملف.")
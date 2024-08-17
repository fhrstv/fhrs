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
    
    # فتح ملف tmdb.js وكتابة النتيجة فيه
    with open('tmdb.js', 'w') as js_file:
        js_file.write(f"const tmdbids = {tmdb_ids};")

    print("تم حفظ القائمة في ملف tmdb.js")
else:
    print("فشل في تحميل الملف.")
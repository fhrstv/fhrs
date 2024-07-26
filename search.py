from bs4 import BeautifulSoup

# قم بفتح ملف HTML
with open('Series.html', 'r', encoding='utf-8') as html_file:
    soup = BeautifulSoup(html_file, 'html.parser')

# الكلمة التي تبحث عنها
search_term = 'الكلمة_التي_تريد_البحث_عنها'

# ابحث عن الكلمة في المحتوى النصي للصفحة
if search_term in soup.get_text():
    print(f'تم العثور على "{search_term}" في الصفحة.')
else:
    print(f'لم يتم العثور على "{search_term}" في الصفحة.')












async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            // جلب الملفات من GitHub API
            const response = await fetch(`https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`);
            const data = await response.json();

            console.log(`Data from ${folder}:`, data); // تسجيل البيانات للتأكد من استلامها بشكل صحيح

            if (Array.isArray(data)) {
                data.forEach(file => {
                    if (file.type === 'file' && file.name.endsWith('.html')) {
                        // بناء الرابط لعرض الصفحة عبر GitHub Pages
                        const pageUrl = `https://fhrstv.github.io/fhrs/${folder}/${file.name}`;
                        console.log('Page URL:', pageUrl); // تسجيل الرابط للتحقق من صحته
                        allFiles.push(pageUrl);
                    }
                });
            } else {
                console.error('Unexpected data format from GitHub API:', data);
            }
        } catch (error) {
            console.error(`Error fetching files from ${folder}:`, error);
        }
    }

    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        console.log('Selected Random File:', randomFile); // تسجيل الملف العشوائي المختار
        loadContent(randomFile);
    } else {
        console.error('No HTML files found.');
    }
}

function loadContent(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            // إنشاء عنصر iframe لعرض المحتوى
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '100vh';
            iframe.style.border = 'none';
            iframe.srcdoc = html;
            document.body.innerHTML = ''; // إزالة المحتوى الحالي
            document.body.appendChild(iframe); // إضافة iframe
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
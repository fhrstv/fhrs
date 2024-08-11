async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            const response = await fetch(`https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                data.forEach(file => {
                    if (file.type === 'file' && file.name.endsWith('.html')) {
                        // بناء الرابط لعرض الصفحة عبر GitHub Pages
                        const pageUrl = `https://fhrstv.github.io/fhrs/${folder}/${file.name}`;
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
        // تحميل المحتوى بشكل AJAX وبدون تغيير عنوان URL
        loadContent(randomFile);
    } else {
        console.error('No HTML files found.');
    }
}

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
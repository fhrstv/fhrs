async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            const response = await fetch(`https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`);
            const data = await response.json();

            // تأكد من أن البيانات التي تم الحصول عليها هي مصفوفة من الملفات
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
        console.log('Redirecting to:', randomFile); // تسجيل الرابط في وحدة التحكم للتأكد
        window.location.href = randomFile;
    } else {
        console.error('No HTML files found.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
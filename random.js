let allFiles = [];

async function loadAllHtmlFiles() {
    const folders = ['watch/movies', 'watch/series'];

    for (const folder of folders) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`, false); // جلب متزامن
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    data.forEach(file => {
                        if (file.type === 'file' && file.name.endsWith('.html')) {
                            const pageUrl = `/${folder}/${file.name.replace('.html', '')}`;
                            allFiles.push(pageUrl);
                        }
                    });
                } else {
                    console.error(`Error fetching files from ${folder}:`, xhr.statusText);
                }
            };
            xhr.send();
        } catch (error) {
            console.error(`Error fetching files from ${folder}:`, error);
        }
    }
}

function getRandomHtmlFile() {
    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        const finalUrl = `https://fhrs.site${randomFile}`;
        window.location.href = finalUrl;
    } else {
        console.error('No HTML files found.');
    }
}

// جلب جميع الروابط عند تحميل الصفحة
loadAllHtmlFiles();

// ربط زر "الاختيار العشوائي" بالدالة
document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
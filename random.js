async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            const response = await fetch(`https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`);
            const data = await response.json();

            data.forEach(file => {
                if (file.name.endsWith('.html')) {
                    // إنشاء الرابط لعرض الصفحة
                    const pageUrl = `https://fhrstv.github.io/fhrs/${folder}/${file.name}`;
                    allFiles.push(pageUrl);
                }
            });
        } catch (error) {
            console.error(`Error fetching files from ${folder}:`, error);
        }
    }

    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        window.location.href = randomFile;
    } else {
        console.error('No HTML files found.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
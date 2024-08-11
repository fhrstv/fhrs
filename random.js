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
                        const pageUrl = `https://fhrstv.github.io/fhrs/${folder}/${file.name}`;
                        const cleanUrl = pageUrl.replace('.html', ''); // إخفاء .html من الرابط
                        allFiles.push(cleanUrl);
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
        const redirectUrl = `https://fhrstv.github.io/fhrs/redirect.html?url=${encodeURIComponent(randomFile)}`;
        console.log('Redirecting to:', redirectUrl); // تسجيل الرابط في وحدة التحكم للتأكد
        window.location.href = redirectUrl;
    } else {
        console.error('No HTML files found.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    data.forEach(file => {
                        if (file.type === 'file' && file.name.endsWith('.html')) {
                            const pageUrl = `/${folder}/${file.name.replace('.html', '')}`;
                            allFiles.push(pageUrl);
                        }
                    });
                    if (allFiles.length > 0) {
                        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
                        window.location.href = randomFile;
                    } else {
                        console.error('No HTML files found.');
                    }
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

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);
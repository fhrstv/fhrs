async function getRandomFile() {
    const repoOwner = 'fhrstv';  // ضع هنا اسم المستخدم الخاص بك على GitHub
    const repoName = 'fhrs';  // ضع هنا اسم المستودع الخاص بك
    const folders = ['watch/movies', 'watch/series'];

    let allFiles = [];

    for (const folder of folders) {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data)) {
                const files = data
                    .filter(item => item.type === 'file')
                    .map(file => file.download_url);

                allFiles = allFiles.concat(files);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }

    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        window.location.href = randomFile;
    } else {
        console.error('No files found.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomFile);
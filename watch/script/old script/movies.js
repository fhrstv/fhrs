const repoOwner = 'fhrstv';
  const repoName = 'fhrs';
  const folderPath = 'watch/movies';
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/main?recursive=1`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const files = data.tree.filter(file => file.path.startsWith(folderPath) && file.path.endsWith('.html'));
      const seriesList = document.getElementById('movie-list');
      const loadingMessage = document.getElementById('loading-message');
      
      // إزالة رسالة التحميل
      seriesList.removeChild(loadingMessage);

      const links = files.slice(0, 50000).map(file => {
        const fileName = file.path.split('/').pop();
        const fileNameWithoutExtension = fileName.replace('.html', '');
        const displayName = fileNameWithoutExtension
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const fileUrl = `${folderPath}/${fileNameWithoutExtension}`;

        const listItem = document.createElement('li');
        listItem.classList.add('movie-item');
        listItem.innerHTML = `<a href="${fileUrl}" rel="noopener noreferrer">${displayName}</a>`;
        seriesList.appendChild(listItem);
        return listItem.querySelector('a');
      });

      links.sort((a, b) => a.textContent.localeCompare(b.textContent));
      links.forEach(link => seriesList.appendChild(link.parentElement));

      const searchInput = document.getElementById('search-input');

      searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        links.forEach(link => {
          const movieTitle = link.textContent.trim().toLowerCase();
          if (movieTitle.includes(searchTerm)) {
            link.parentElement.style.display = 'block';
          } else {
            link.parentElement.style.display = 'none';
          }
        });
      });

      searchInput.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          searchInput.blur();
        }
      });

    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('movie-list').innerHTML = '<li>فشل في تحميل الافلام قم بتحديث الصفحة</li>';
    });
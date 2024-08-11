// Get the button element
const randomButton = document.getElementById('randomButton');

// Check if the button element is found
if (!randomButton) {
  console.error('Button element not found!');
} else {
  console.log('Button element found!');

  // Get the list of movie links
  const movieList = document.getElementById('movie-list');
  const movieLinks = movieList.querySelectorAll('a');

  // Check if the movie list is populated
  if (movieLinks.length === 0) {
    console.error('Movie list is empty!');
  } else {
    console.log('Movie list populated!');

    // Add an event listener to the button
    randomButton.addEventListener('click', function() {
      console.log('Button clicked!');

      // Select a random movie from the list
      const randomIndex = Math.floor(Math.random() * movieLinks.length);
      const randomMovieLink = movieLinks[randomIndex];

      // Redirect the user to the random movie page
      window.location.href = randomMovieLink.href;
    });
  }
}
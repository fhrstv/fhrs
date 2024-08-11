// Get the button element
const randomButton = document.getElementById('randomButton');

// Get the list of movie links
const movieList = document.getElementById('movie-list');
const movieLinks = movieList.querySelectorAll('a');

// Add an event listener to the button
randomButton.addEventListener('click', function() {
  // Select a random movie from the list
  const randomIndex = Math.floor(Math.random() * movieLinks.length);
  const randomMovieLink = movieLinks[randomIndex];
  
  // Redirect the user to the random movie page
  window.location.href = randomMovieLink.href;
});
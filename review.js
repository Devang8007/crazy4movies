document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');
    if (movieTitle) {
        fetchMovieDetails(movieTitle);
    } else {
        document.getElementById("reviewDetails").innerText = "No movie title found in URL";
    }
});

function fetchMovieDetails(title) {
    const apiKey = "fc1fef96"; // Replace with your OMDB API key
    const omdbUrl = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}&plot=full`;
    
    fetch(omdbUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                document.getElementById("reviewDetails").innerText = "Movie not found";
            } else {
                const trailerUrl = `https://www.googleapis.com/youtube/v3/search?q=${title} trailer&key=AIzaSyBBiLrC6Njj1YaEiotOR92rvsTnx9Opcho&maxResults=1`;
                fetch(trailerUrl)
                    .then(response => response.json())
                    .then(trailerData => {
                        if (trailerData.items.length > 0) {
                            const videoId = trailerData.items[0].id.videoId;
                            data.Trailer = `https://www.youtube.com/embed/${videoId}`;
                        } else {
                            data.Trailer = ""; // No trailer found
                        }
                        displayMovieDetails(data);
                    })
                    .catch(error => {
                        console.error("Error fetching trailer:", error);
                        data.Trailer = ""; // No trailer found
                        displayMovieDetails(data);
                    });
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayMovieDetails(movie) {
    const reviewDetails = document.getElementById("reviewDetails");
    reviewDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="Movie Poster">
        <p><strong>Plot:</strong> ${movie.Plot}</p><br>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p><br>
        <p class = "genre"><b>Genre:</b> ${movie.Genre}</p><br>
        <p class = "writer"><b>Writer:</b> ${movie.Writer}</p><br>
        <p class = "language"><b>Language:</b> ${movie.Language}</p><br>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${movie.Awards}</p><br>
    <ul class = "movie-misc-info">
        <li class = "year">Year: ${movie.Year}</li>
        <li class = "released">Released: ${movie.Released}</li>
   </ul><br>
   <p><strong>Review:</strong> ${movie.Plot}</p><br>
        <h3>Cast</h3>
        <ul>
        ${movie.Actors.split(',').map(actor => `<li>${actor.trim()}</li>`).join('')}
        </ul><br>
        <h3>Trailer</h3>
        <div class="trailer-container">
            ${movie.Trailer ? `<iframe width="560" height="315" src="${movie.Trailer}" title="Movie Trailer" frameborder="0" allowfullscreen></iframe>` : "Trailer not available"}
        </div>
    `;
}

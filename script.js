// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
// Function to toggle visibility of links
document.getElementById('toggleBtn').addEventListener('click', function() {
  var links = document.querySelector('.logo .container .links');
  if (links.classList.contains('links-visible')) {
      links.classList.remove('links-visible');
  } else {
      links.classList.add('links-visible');
  }
});

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
var slider = tns({
    container: ".my-slider",
    items: 3,
    gutter: 20,
    slideBy: 1,
    controlsPosition: "bottom",
    navPosition: "bottom",
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: "#custom-control",
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      768: {
        items: 2,
        nav: true
      },
      1440: {
        items: 3
      }
    }
    
  });
  
  var slider1 = tns({
    container: ".my-slider1",
    items: 3,
    gutter: 20,
    slideBy: 1,
    controls: false,
    navPosition: "bottom",
    mouseDrag: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayButton: false,
   
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      768: {
        items: 2,
        nav: true
      },
      1440: {
        items: 3
      }
    }
   
  });
  /* linked pages */
  // script.js

// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Dummy data for cast and IMDb rating
    const cast = ['Actor 1', 'Actor 2', 'Actor 3'];
    const imdbRating = 8.0;
  
    // Populate cast list
    const castList = document.getElementById('cast-list');
    cast.forEach(actor => {
      const li = document.createElement('li');
      li.textContent = actor;
      castList.appendChild(li);
    });
  
    // Populate IMDb rating
    const imdbRatingElement = document.getElementById('imdb-rating');
    imdbRatingElement.textContent = imdbRating;
  
    // Load YouTube video player
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    let player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'https://youtu.be/qexxrmahCDg?si=7Ua4kYN9BU6Okftn', // Replace with your YouTube video ID
        playerVars: {
          'playsinline': 1 // Enable inline playback on mobile devices
        }
      });
    };
  });
  
  document.getElementById("toggleLinks").addEventListener("click", function() {
    var links = document.querySelector(".logo .container .links");
    links.style.display = (links.style.display === "none") ? "block" : "none";
});
function redirectToReview(movieTitle) {
  window.location.href = `review.html?title=${encodeURIComponent(movieTitle)}`;
}

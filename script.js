//constants for HTML elements:
    //const is for the movies search bar
    const moviesForm = document.querySelector("#searchBar");
    const inputElement = document.querySelector("#movieSearch");
    const cancel = document.querySelector("#cancel");
    //const is for area where the movies will appear
    const movieArea = document.querySelector("#movieResults");
    //const for the "Load more movies button"
    const loadMoviesButton = document.querySelector("#more-movies-btn");

//other constants/variables:
    const apiKey = "#"
    var currentApiPage = 1;
    var currentGridItem = 2;
    let avgRating = 0;
    var apiUrl;


getMovies();
moviesForm.addEventListener("submit", handleSubmit);

async function getMovies(){
    apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US&page=" + currentApiPage;
    const response = await fetch(apiUrl);
    const responseData = await response.json();

    console.log(responseData);
    displayResults(responseData);
}

function displayResults(movieData){
    let posterPath = "";
    movieData.results.forEach(element => {
       if(element.poster_path == null){
            posterPath = "./ComingSoonImage.jpg";
       } else{
            posterPath = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
       }
        avgRating = element.vote_average;
        movieArea.innerHTML += `
            <div class="grid-item">
                <img class="movie-poster" src="${posterPath}" alt="${element.title}" />
                <p class="averageRating" >⭐️${getVotes()}</p>
                <h3 class="movieTitle">${element.title}</h3>
            </div>
        `;
        currentGridItem++;
    });
}

async function cancelSearch(event){
    movieArea.innerHTML = "";
    event.preventDefault();
    cancel.addEventListener("sumbit", cancelSearch);
    getMovies();
}

function getVotes(){
    if(avgRating == 0){
        return "Rating not available";
    }
    else {
        return avgRating;
    }
}

async function handleLoadMore(){
    currentApiPage++;
    const results = await getMovies();
}

loadMoviesButton.addEventListener('click',handleLoadMore);
moviesForm.addEventListener("submit", searchMovies);
loadMoviesButton.addEventListener('click', deleteButton);

async function searchMovies(){
    const userSearch = inputElement.value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userSearch}`;
    //Using the fetch method from the fetch API, a response is returned
    const response = await fetch(apiUrl);
    //the response is converted in to a JSON object (a human-readable object)
    const responseData = await response.json();
    console.log(responseData);

    displayResults(responseData);
}

function handleSubmit(event){
    event.preventDefault();
    movieArea.innerHTML = "";
    searchMovies();
    inputElement.value = "";
}

deleteButton

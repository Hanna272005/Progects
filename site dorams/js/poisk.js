function searchMovies() {
    const query = document.getElementById('search').value.toLowerCase();
    const movies = document.querySelectorAll('.movie');

    movies.forEach(movie => {
        const title = movie.querySelector('h3').textContent.toLowerCase();
        const display = title.includes(query);
        movie.style.display = display ? '' : 'none';
    });
}

function addToFavorites(button) {
    const movie = button.closest('.movie');
    const movieTitle = movie.querySelector('h3').textContent;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(movieTitle)) {
        favorites.push(movieTitle);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movieTitle} добавлен в избранное!`);
    } else {
        alert(`${movieTitle} уже в избранном!`);
    }
}
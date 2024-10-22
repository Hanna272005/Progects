// Количество фильмов, отображаемых на одной странице
const moviesPerPage = 10;
// Текущая страница, начиная с первой
let currentPage = 1;

// Функция сортировки фильмов по заданным критериям
const sortMovies = (criteria) => {
    // Получаем выбранные жанр и год из выпадающих списков
    const genreSelect = document.getElementById('genreSelect').value;
    const yearSelect = document.getElementById('yearSelect').value;
    // Получаем контейнер с фильмами и все фильмы в виде массива
    const moviesContainer = document.querySelector('.movies');
    const movies = Array.from(moviesContainer.children);

    // Изначально все фильмы считаем отфильтрованными
    let filteredMovies = movies;

    // Фильтрация по жанру, если критерий - жанр и жанр выбран
    if (criteria === 'genre' && genreSelect) {
        filteredMovies = movies.filter(movie => {
            const genres = movie.dataset.genre.split(', '); // Получаем жанры фильма
            return genres.includes(genreSelect); // Проверяем, содержится ли выбранный жанр в жанрах фильма
        });
    // Фильтрация по году, если критерий - год и год выбран
    } else if (criteria === 'year' && yearSelect) {
        filteredMovies = movies.filter(movie => movie.dataset.year === yearSelect); // Сравниваем выбранный год с годом фильма
    }

    // Скрываем все фильмы
    movies.forEach(movie => movie.style.display = 'none');
    // Отображаем только отфильтрованные фильмы, но не больше moviesPerPage на одной странице
    filteredMovies.forEach((movie, index) => {
        if (index < moviesPerPage) {
            movie.style.display = 'block';
        }
    });

    // Обновляем количество страниц после фильтрации
    updatePagination(filteredMovies.length);
    // Сбрасываем текущую страницу на первую после сортировки
    currentPage = 1;
    // Обновляем отображение страницы
    updatePageDisplay();
};

// Функция изменения страницы (вперед или назад)
const changePage = (direction) => {
    // Получаем контейнер с фильмами и видимые фильмы в виде массива
    const moviesContainer = document.querySelector('.movies');
    const visibleMovies = Array.from(moviesContainer.children).filter(movie => movie.style.display !== 'none');
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(visibleMovies.length / moviesPerPage);

    // Обновляем текущую страницу, ограничивая ее допустимыми значениями
    currentPage = Math.max(1, Math.min(currentPage + direction, totalPages));

    // Обновляем текстовое отображение текущей страницы
    document.getElementById('pageDisplay').textContent = `Страница ${currentPage}`;

    // Отображаем только фильмы, соответствующие текущей странице
    visibleMovies.forEach((movie, index) => {
        movie.style.display = (index >= (currentPage - 1) * moviesPerPage && index < currentPage * moviesPerPage) ? 'block' : 'none';
    });
};

// Функция обновления информации о пагинации
const updatePagination = (totalMovies) => {
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    // Обновляем текущую страницу, ограничивая ее допустимыми значениями
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    // Обновляем текстовое отображение текущей страницы
    document.getElementById('pageDisplay').textContent = `Страница ${currentPage}`;
};

// Функция обновления отображения страницы
const updatePageDisplay = () => {
    // Получаем контейнер с фильмами и все фильмы в виде массива
    const moviesContainer = document.querySelector('.movies');
    const allMovies = Array.from(moviesContainer.children);
    // Отфильтровываем только видимые фильмы
    const visibleMovies = allMovies.filter(movie => movie.style.display !== 'none');
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(visibleMovies.length / moviesPerPage);

    // Обновляем текстовое отображение текущей страницы
    document.getElementById('pageDisplay').textContent = `Страница ${currentPage} из ${totalPages}`;
};

// Обработчик события загрузки контента страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все фильмы и делаем их видимыми
    const allMovies = Array.from(document.querySelector('.movies').children);
    allMovies.forEach(movie => movie.style.display = 'block');
    // Обновляем информацию о пагинации
    updatePagination(allMovies.length);
    // Обновляем отображение после загрузки страницы, чтобы применить пагинацию
    changePage(0);
});

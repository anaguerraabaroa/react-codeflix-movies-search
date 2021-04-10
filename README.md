![Mobile version](./src/images/codeflix_movies_mobile.png) ![Tablet version](./src/images/codeflix_movies_tablet.png) ![Desktop version](./src/images/codeflix_movies_desktop.png)

# **Codeflix Movies Search**

This is a responsive movies search web app developed with [<img src = "https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">](https://html.spec.whatwg.org/) [<img src="https://img.shields.io/badge/-SASS-cc6699?style=for-the-badge&logo=sass&logoColor=ffffff">](https://sass-lang.com/)
[<img src = "https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">](https://www.w3.org/Style/CSS/) [<img src = "https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">](https://www.ecma-international.org/ecma-262/) and [<img src = "https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black">](https://es.reactjs.org/)

Project inspired by the final exercise of the [**Aprender React JS**](https://github.com/AprendiendoFrontend/Aprendiendo-React/tree/master/search-movies) course.

## **Quick start guide**

Instructions to start this project:

## Installation

- Clone repository:

```
git clone [repository]
```

- Install NPM packages and dependencies:

```
npm install
```

- Run project on local server:

```
npm start
```

- **[Project URL](https://anaguerraabaroa.github.io/react-codeflix-movies-search/#/)** is also available on GitHub Pages.

## **Features**

- React app
- Get movies from **[OMDb API](https://www.omdbapi.com)**
- Components structure
- Render a movie list with movie poster, movie title and release year
- Form with filter by movie name
- Detailed movie card window using React Router with movie poster, release year, actors, plot and metascore
- Prevent event default of form
- Render error messages when searched movie doesn't exist or when the URL of detailed movie card doesn't exist
- Save search when user enter on detailed movie card and go back to form
- Save data on LocalStorage
- Responsive app design for mobile, tablet and desktop devices

## **Usage**

### **1. App component**

- Handle app, lifecycle, localStorage and events, and render default message, movies list or error message and create movie details component

```javascript
function App() {
  const [filterMovie, setFilterMovie] = useState(dataLocalStorage.filterMovie);
  const [moviesList, setMoviesList] = useState(dataLocalStorage.moviesList);
  const [usedSearch, setUsedSearch] = useState(dataLocalStorage.usedSearch);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (movie) => {
    setFilterMovie(movie);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    api.getDataFromApi(filterMovie).then((data) => {
      setMoviesList(data);
      setUsedSearch(true);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setInLocalStorage(filterMovie, moviesList, usedSearch);
  });

  const renderResults = () => {
    return moviesList.length === 0 ? (
      <p>
        <i className="far fa-grin-beam-sweat icon" aria-hidden="true"></i>Sorry!
        There are not results for your search. Please, try again
      </p>
    ) : (
      <MoviesList moviesList={moviesList} isLoading={isLoading} />
    );
  };

  const results =
    usedSearch === true ? (
      renderResults()
    ) : (
      <small>
        <i className="far fa-hand-pointer icon" aria-hidden="true"></i>Please, use
        the form to search a movie
      </small>
    );

  const renderMovieDetails = (props) => {
    const movieId = props.match.params.id;
    const foundMovie = moviesList.find((movie) => movie.imdbID === movieId);
    if (foundMovie) {
      return <MovieDetails foundMovie={foundMovie} />;
    } else {
      return (
        <div className="details__error">
          <p className="details__error--text">
            <i
              className="far fa-grin-beam-sweat details__error--icon"
              aria-hidden="true"
            ></i>
            Sorry! There are not results for your search. Please, try again
          </p>
          <Link
            to="/"
            className="details__error--btn"
            title="Go back to movies list"
          >
            Return
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="app">
      <Header />
      <Hero />
      <Switch>
        <Route exact path="/">
          <main className="main" role="main">
            <section className="search" role="search">
              <SearchForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                filterMovie={filterMovie}
              />
              <section className="search__msg">{results}</section>
            </section>
          </main>
        </Route>
        <Route path="/movie-detail/:id" render={renderMovieDetails} />
      </Switch>
      <Footer />
    </div>
  );
}
```

### **2. SearchForm component**

- Handle filter by movie name

```javascript
const SearchForm = (props) => {
  const handleChange = (ev) => {
    const movie = ev.target.value;
    props.handleChange(movie);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="form" className="form__label">
        <i className="form__label--icon fas fa-film" aria-hidden="true"></i>
        Search movies
      </label>
      <div className="form__wrapper">
        <input
          className="form__input"
          type="text"
          placeholder="Movies, tv shows..."
          value={props.filterMovie}
          id="form"
          onChange={handleChange}
        />
        <button className="form__btn" type="submit" aria-label="search">
          Search
        </button>
      </div>
    </form>
  );
};
```

### **3. Movies List API request component**

- Handle fetch to get movies list

```javascript
const getDataFromApi = (filterMovie) => {
  return fetch(`https://www.omdbapi.com/?apikey=16495f99&s=${filterMovie}`)
    .then((response) => response.json())
    .then((data) => {
      const { Search = [] } = data;
      return Search;
    })
    .catch((error) => console.log(`There has been an error: ${error}`));
};
```

### **4. MoviesList component**

- Create individual movie card and render movies list

```javascript
const MoviesList = (props) => {
  const movies = props.moviesList.map((movie) => {
    return (
      <li className="card" key={movie.imdbID}>
        <Movie movie={movie} />
      </li>
    );
  });

  return (
    <>
      {props.isLoading === true ? (
        <Loading />
      ) : (
        <section className="movies__results">
          <ul className="movies__results--list">{movies}</ul>
        </section>
      )}
    </>
  );
};
```

### **5. Movie component**

- Handle default image and render individual movie card

```javascript
const Movie = (props) => {
  const Image = () => {
    if (props.movie.Poster === "N/A") {
      return defaultImage;
    } else {
      return props.movie.Poster;
    }
  };

  return (
    <>
      <article className="card">
        <img
          className="card__image"
          src={Image()}
          title={props.movie.Title}
          alt={props.movie.Title}
        />
        <h2 className="card__title">{props.movie.Title}</h2>
        <p className="card__date">{props.movie.Year}</p>
        <Link
          className="card__btn"
          to={`/movie-detail/${props.movie.imdbID}`}
          title="Go to movie details"
          aria-label="Go to movie details"
        >
          + More info
        </Link>
      </article>
    </>
  );
};
```

### **6. Details API request component**

- - Handle fetch to get movie details

```javascript
const getDetailsFromApi = (props) => {
  return fetch(
    `https://www.omdbapi.com/?apikey=16495f99&i=${props.foundMovie.imdbID}`
  )
    .then((response) => response.json())
    .then((movie) => {
      return movie;
    })
    .catch((error) => console.log(`There has been an error: ${error}`));
};
```

### **7. MovieDetails component**

- Handle movie details API request, default image and render movie details card

```javascript
const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiDetail.getDetailsFromApi(props).then((movie) => {
      setMovieDetails(movie);
      setIsLoading(false);
    });
  }, [props]);

  const Image = () => {
    if (movieDetails.Poster === "N/A") {
      return defaultImage;
    } else {
      return movieDetails.Poster;
    }
  };

  return (
    <>
      {isLoading === true ? (
        <Loading />
      ) : (
        <section className="card__details">
          <article className="details">
            <img
              className="details__image"
              src={Image()}
              alt={movieDetails.Title}
              title={movieDetails.Title}
            />
            <div className="details__wrapper">
              <h2 className="details__title">{movieDetails.Title}</h2>
              <p className="details__data">
                <i
                  className="details__icon far fa-calendar-alt"
                  aria-hidden="true"
                ></i>
                <span className="details__highlight">Year: </span>
                {movieDetails.Year}
              </p>
              <p className="details__data">
                <i
                  className="details__icon fas fa-users"
                  aria-hidden="true"
                ></i>
                <span className="details__highlight">Actors: </span>
                {movieDetails.Actors}
              </p>
              <p className="details__data">
                <i
                  className="details__icon fas fa-video"
                  aria-hidden="true"
                ></i>
                <span className="details__highlight">Plot: </span>
                {movieDetails.Plot}
              </p>
              <p className="details__metascore">
                <i className="details__icon fas fa-star" aria-hidden="true"></i>
                <span className="details__highlight">Metascore: </span>
                {movieDetails.Metascore}
              </p>
              <Link
                className="details__btn"
                to="/"
                title="Go back to movies list"
                aria-label="Go back to movies list"
              >
                Return
              </Link>
            </div>
          </article>
        </section>
      )}
    </>
  );
};
```

### **8. LocalStorage component**

- Set data in localStorage

```javascript
const setInLocalStorage = (filterMovie, moviesList, usedSearch) => {
  const variables = {
    filterMovie: filterMovie,
    moviesList: moviesList,
    usedSearch: usedSearch,
  };
  localStorage.setItem("variables", JSON.stringify(variables));
};
```

- Get data from localStorage

```javascript
const getFromLocalStorage = () => {
  const dataLocalStorage = JSON.parse(localStorage.getItem("variables"));
  return dataLocalStorage !== null
    ? dataLocalStorage
    : {
        filterMovie: "",
        moviesList: [],
        usedSearch: false,
      };
};
```

## **Folder Structure**

```
Codeflix Movies Search
├── docs
├── node_modules
├── public
├── src
│   ├── components
│   │   ├── App.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Movie.js
│   │   ├── MovieDetails.js
│   │   ├── MovieList.js
│   │   └── SearchForm.js
│   ├── images
│   │    ├── codeflix_movies_desktop.png
│   │    ├── codeflix_movies_mobile.png
│   │    ├── codeflix_movies_tablet.png
│   │    ├── default_image.jpg
│   │    └── hero.png
│   ├── services
│   │    ├── api-details.js
│   │    ├── api.js
│   │    └── localStorage.js
│   ├── stylesheets
│   │   ├── components
│   │   │   ├── _hero.scss
│   │   │   ├── _movie.scss
│   │   │   └── _search-form.scss
│   │   ├── core
│   │   │   ├── _reset.scss
│   │   │   └── _variables.scss
│   │   ├── layout
│   │   │   ├── _footer.scss
│   │   │   ├── _header.scss
│   │   │   ├── _movie-details.scss
│   │   │   └── _movie-list.scss
│   │   └── App.scss
│   └── index.js
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## **License**

This project is licensed under ![GitHub](https://img.shields.io/github/license/anaguerraabaroa/random-number?label=License&logo=MIT&style=for-the-badge)

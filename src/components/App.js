import { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
  setInLocalStorage,
  getFromLocalStorage,
} from "../services/localStorage";
import Header from "./Header";
import Hero from "./Hero";
import SearchForm from "./SearchForm";
import MoviesList from "./MoviesList";
import MovieDetails from "./MovieDetails";
import Footer from "./Footer";
import api from "../services/api";
import "../stylesheets/App.scss";

// get data from localStorage when app initializes
const dataLocalStorage = getFromLocalStorage();

function App() {
  // state
  const [filterMovie, setFilterMovie] = useState(dataLocalStorage.filterMovie);
  const [moviesList, setMoviesList] = useState(dataLocalStorage.moviesList);
  const [usedSearch, setUsedSearch] = useState(dataLocalStorage.usedSearch);

  // events
  const handleChange = (movie) => {
    setFilterMovie(movie);
  };

  const handleSubmit = () => {
    api.getDataFromApi(filterMovie).then((data) => {
      setMoviesList(data);
      setUsedSearch(true);
    });
  };

  // lifecycle: set data in localStorage
  useEffect(() => {
    setInLocalStorage(filterMovie, moviesList, usedSearch);
  });

  // render search results or error message
  const renderResults = () => {
    return moviesList.length === 0 ? (
      <p>
        <i className="far fa-grin-beam-sweat icon" aria-hidden="true"></i>Sorry!
        There are not results for your search. Please, try again
      </p>
    ) : (
      <MoviesList moviesList={moviesList} />
    );
  };

  // render default message or search results
  const results =
    usedSearch === true ? (
      renderResults()
    ) : (
      <small>
        <i className="far fa-hand-pointer icon" aria-hidden="true"></i>Please,
        use the form to search a movie
      </small>
    );

  // render movie details component
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

export default App;

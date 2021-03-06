import React from "react";
import Movie from "./Movie";
import Loading from "./Loading";
import PropTypes from "prop-types";
import "../stylesheets/layout/_movies-list.scss";

const MoviesList = (props) => {
  // get each movie data
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

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesList;

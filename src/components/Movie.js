import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../images/default_image.jpg";
import PropTypes from "prop-types";
import "../stylesheets/components/_movie.scss";

const Movie = (props) => {
  // default image
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

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Movie;

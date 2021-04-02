import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiDetail from "../services/api-details";
import defaultImage from "../images/default_image.jpg";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import "../stylesheets/layout/_movie-details.scss";

const MovieDetails = (props) => {
  // state
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // lifecycle: API request to get movie details when component mounts
  useEffect(() => {
    setIsLoading(true);
    apiDetail.getDetailsFromApi(props).then((movie) => {
      setMovieDetails(movie);
      setIsLoading(false);
    });
  }, [props]);

  // default image
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

MovieDetails.propTypes = {
  foundMovie: PropTypes.object.isRequired,
};

export default MovieDetails;

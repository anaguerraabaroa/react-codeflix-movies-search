import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/components/_search-form.scss";

const SearchForm = (props) => {
  // form movie input event handler
  const handleChange = (ev) => {
    const movie = ev.target.value;
    props.handleChange(movie);
  };

  // form event handler
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

SearchForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  filterMovie: PropTypes.string.isRequired,
};

export default SearchForm;

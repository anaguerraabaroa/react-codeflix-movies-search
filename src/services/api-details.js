// get movie details from OMDb API
const getDetailsFromApi = (props) => {
  return fetch(
    `https://www.omdbapi.com/?apikey=16495f99&i=${props.foundMovie.imdbID}`
  )
    .then((response) => response.json())
    .then((movie) => {
      return movie;
    });
};

export default { getDetailsFromApi };

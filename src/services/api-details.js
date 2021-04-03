// get movie details from OMDb API
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

export default { getDetailsFromApi };

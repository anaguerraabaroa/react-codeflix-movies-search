// get movies from OMDb API
const getDataFromApi = (filterMovie) => {
  return fetch(`http://www.omdbapi.com/?apikey=16495f99&s=${filterMovie}`)
    .then((response) => response.json())
    .then((data) => {
      // fetch is expected to return an array
      // but it returns undefined when search is made with a misspelling error or movie is not found on the server
      // however, it is possible to add a default value ([]) to the array with destructuring
      // in that case, if search returns undefined, the array gets the default value ([])
      // and with this we can control to set always an array in our state instead of an undefined value
      const { Search = [] } = data;
      return Search;
    })
    .catch((error) => console.log(`There has been an error: ${error}`));
};

export default { getDataFromApi };

// set and get data from localStorage
const setInLocalStorage = (filterMovie, moviesList, usedSearch) => {
  const variables = {
    filterMovie: filterMovie,
    moviesList: moviesList,
    usedSearch: usedSearch,
  };
  localStorage.setItem("variables", JSON.stringify(variables));
};

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

export { setInLocalStorage, getFromLocalStorage };

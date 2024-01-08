const form = document.querySelector("#search-form");
const searchField = document.querySelector("#search-keyword");
const responseContainer = document.querySelector("#response-container");

form.addEventListener("submit", e => {
  e.preventDefault();
  const searched = searchField.value;

  fetch(getUnsplashQueryUrl(searched))
    .then(res => res.json())
    .then(addImg(res))
    .catch(er => console.error(er));

  fetch(getNyTimesQueryUrl(searched))
    .then(res => res.json())
    .then(addArticles(res))
    .catch(er => console.error(er));
});

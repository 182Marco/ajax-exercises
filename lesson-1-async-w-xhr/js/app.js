const form = document.querySelector("#search-form");
const searchField = document.querySelector("#search-keyword");
const responseContainer = document.querySelector("#response-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searched = searchField.value;

  const unsplashRequest = new XMLHttpRequest();
  unsplashRequest.open("GET", getUnsplashQueryUrl(searched));
  unsplashRequest.onload = () => addImg(JSON.parse(req.responseText));
  unsplashRequest.send();

  // example with jquery
  $.ajax({
    url: getNyTimesQueryUrl(searched),
  }).done(() => addArticles(res));
});

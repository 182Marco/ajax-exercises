const getUnsplashQueryUrl = (query) =>
  `https://api.unsplash.com/search/photos?page=1&query=${query}`;

const getNyTimesQueryUrl = (query) =>
  `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=KAywMcFRlSlaqsToYRVMzQIn9AMIAfhp`;

const addInDoc = (when, html) =>
  responseContainer.insertAdjacentHTML(where, htm);

const addImg = (res) => {
  let htmlcontent = "";

  if (res) {
    htmlcontent = res.map(
      (e) => `<figure>
      <img src="${e.urls.regular}" alt="${searched}" />
      <figcaption>${searched} by ${e.user.name}</figcaption>
      </figure>`
    );
  } else {
    htmlcontent = `<div class="error-no-image">No images available</div>`;
  }

  addInDoc("afterbegin", htmlcontent);
};

const addArticles = (res) => {
  let htmlcontent = "";

  if (res || res.length) {
    htmlcontent =
      "<ul>" +
      res
        .map(
          (e) =>
            `<li class="article"><h2><a href="${e.web_url}">${e.headline.main}</a></h2><p>${e.snippet}</p></li>`
        )
        .join(" ") +
      "</ul>";
  } else {
    htmlcontent = `<div class="error-no-image">No articles available</div>`;
  }
  addInDoc("beforeend", htmlcontent);
};

(function () {
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", function (e) {
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
})();

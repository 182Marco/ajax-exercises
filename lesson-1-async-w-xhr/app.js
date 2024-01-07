const getUnsplashQueryUrl = (text) =>
  `https://api.unsplash.com/search/photos?page=1&query=${text}`;

const getNyTimesQueryUrl = (text) =>
  `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=KAywMcFRlSlaqsToYRVMzQIn9AMIAfhp`;

(function () {
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  let searched;
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searched = searchField.value;

    const unsplashRequest = new XMLHttpRequest();
    const articleRequest = new XMLHttpRequest();

    unsplashRequest.open("GET", getUnsplashQueryUrl(searched));

    articleRequest.open("GET", getNyTimesQueryUrl(searched));
    unsplashRequest.setRequestHeader(
      "Authorization",
      "Client-ID XgGCWwKPt1zo9_jVDoruVQnmLocqhHn3IzlaOHPTP50"
    );
    unsplashRequest.onload = () => addImg(unsplashRequest);
    articleRequest.onload = () => addArticles(articleRequest);

    unsplashRequest.send();
    articleRequest.send();

    const getRes = (req) => JSON.parse(req.responseText);

    function addImg(req) {
      const res = getRes(req)?.results;
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

      responseContainer.insertAdjacentHTML("afterbegin", htmlcontent);
    }

    function addArticles(req) {
      const res = getRes(req)?.response.docs;
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
      responseContainer.insertAdjacentHTML("beforeend", htmlcontent);
    }
  });
})();

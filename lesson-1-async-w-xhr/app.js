(function () {
  const form = document.querySelector("#search-form");
  const searchField = document.querySelector("#search-keyword");
  let searchedForText;
  const responseContainer = document.querySelector("#response-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value || "hippos";

    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open(
      "GET",
      `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
    );
    unsplashRequest.setRequestHeader(
      "Authorization",
      "Client-ID XgGCWwKPt1zo9_jVDoruVQnmLocqhHn3IzlaOHPTP50"
    );
    unsplashRequest.onload = () => addImg();

    unsplashRequest.send();

    function addImg() {
      const data = JSON.parse(unsplashRequest.responseText);
      console.log(`marcom ---> data: `, data);
      const firstImage = data.results[0];
      let htmlcontent = "";

      if (data?.results) {
        htmlcontent = `<figure>
      <img src="${firstImage.urls.regular}" alt="${searchedForText}" />
      <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
      } else {
        htmlcontent = `<div class="error-no-image">No images available</div>`;
      }

      responseContainer.insertAdjacentHTML("afterbegin", htmlcontent);
    }
  });
})();

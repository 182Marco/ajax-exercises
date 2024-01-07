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

  addInDoc();
  responseContainer.insertAdjacentHTML("afterbegin", htmlcontent);
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
  responseContainer.insertAdjacentHTML("beforeend", htmlcontent);
};

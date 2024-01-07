const getUnsplashQueryUrl = (query) =>
  `https://api.unsplash.com/search/photos?page=1&query=${query}`;

const getNyTimesQueryUrl = (query) =>
  `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=KAywMcFRlSlaqsToYRVMzQIn9AMIAfhp`;

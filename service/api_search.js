import nativeRequest from "./index";

export function getSearchHot() {
  return nativeRequest.get("/search/hot");
}

export function getSearchSuggest(keywords) {
  return nativeRequest.get("/search/suggest", {
    keywords,
    type: "mobile",
  });
}

export function getSearchResult(keywords) {
  return nativeRequest.get("/search", {
    keywords,
  });
}

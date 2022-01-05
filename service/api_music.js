import nativeRequest from "../service/index";

/**
 * 获取轮播图
 * @param {*} type 0:pc | 1:android | 2:iphone | 3:ipad
 */
export function getBannerData(type = "2") {
  return nativeRequest.get("/banner", {
    type,
  });
}

/**
 *
 * @param {*} idx 0: 新歌榜 | 1: 热门榜 | 2: 原创榜 | 3: 飙升榜
 */
export function getRankList(idx) {
  return nativeRequest.get("/top/list", {
    idx,
  });
}

/**
 *
 * @param {*} cat cat -> category 类别
 * @param {*} limit
 * @param {*} offset
 */
export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return nativeRequest.get("/top/playlist", {
    cat,
    limit,
    offset,
  });
}

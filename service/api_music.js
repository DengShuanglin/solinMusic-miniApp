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

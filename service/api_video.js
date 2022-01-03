import nativeRequest from "../service/index";

/**
 * 获取mv列表
 * @param {*} offset
 * @param {*} limit
 */
export function getTopMvList(offset, limit = 10) {
  return nativeRequest.get("/top/mv", {
    offset,
    limit,
  });
}

/**
 * 根据id获取mv播放地址
 * @param {*} id
 */
export function getMVUrl(id) {
  return nativeRequest.get("/mv/url", {
    id,
  });
}

/**
 * 根据id获取mv详情
 * @param {*} mvid
 */
export function getMVDetail(mvid) {
  return nativeRequest.get("/mv/detail", {
    mvid,
  });
}

/**
 * 根据id获取相关联的视频列表
 * @param {*} id
 */
export function getRelatedVideoList(id) {
  return nativeRequest.get("/related/allvideo", {
    id,
  });
}

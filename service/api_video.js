import nativeRequest from "../service/index";

export const getTopMvList = (offset, limit = 10) => {
  return nativeRequest.get("/top/mv", {
    offset,
    limit,
  });
};

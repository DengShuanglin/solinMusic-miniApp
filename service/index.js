const BASE_URL = "http://123.207.32.32:9001";

class NativeRequest {
  request(url = "", method = "GET", params = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method.toUpperCase(),
        data: params,
        // header: header,
        // dataType: dataType,
        // responseType: responseType,
        enableCache: true,
        enableHttp2: true,
        enableQuic: true,
        timeout: 5000,
        success: (result) => resolve(result.data),
        fail: reject,
        // complete: (res) => {},
      });
    });
  }

  get(url = "", params = {}) {
    return this.request(url, "GET", params);
  }

  post(url = "", data = {}) {
    return this.request(url, "POST", data);
  }
}

const nativeRequest = new NativeRequest();

export default nativeRequest;

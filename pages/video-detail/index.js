// pages/video-detail/index.js
import {
  getMVUrl,
  getMVDetail,
  getRelatedVideoList,
} from "../../service/api_video";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    urlInfo: {},
    detail: {},
    relatedList: [],

    danmuList: [
      {
        text: "第 1s 出现的弹幕",
        color: "#ff0000",
        time: 1,
      },
      {
        text: "第 3s 出现的弹幕",
        color: "#ff00ff",
        time: 3,
      },
    ],
  },

  getMvData(id) {
    getMVUrl(id).then((res) => {
      this.setData({ urlInfo: res.data });
    });
    getMVDetail(id).then((res) => {
      this.setData({ detail: res.data });
    });
    getRelatedVideoList(id).then((res) => {
      this.setData({ relatedList: res.data });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id = "" } = options;
    this.setData({ id });
    this.getMvData(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

// pages/detail-search/index.js
import {
  getSearchHot,
  getSearchSuggest,
  getSearchResult,
} from "../../service/api_search";
import debounce from "../../utils/debounce";
import stringToNodes from "../../utils/stringToNodes";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: [],
    searchValue: "",
  },

  // 网络请求
  getPageData: function () {
    getSearchHot().then((res) => {
      this.setData({ hotKeywords: res.result.hots });
    });
  },

  // 事件处理
  handleSearchChange: function (event) {
    // 1.获取输入的关键字
    const searchValue = event.detail;

    // 2.保存关键字
    this.setData({ searchValue });

    // 3.判断关键字为空字符的处理逻辑
    if (!searchValue.length) {
      this.setData({ suggestSongs: [], resultSongs: [] });
      debounceGetSearchSuggest.cancel();
      return;
    }

    // 4.根据关键字进行搜索
    debounceGetSearchSuggest(searchValue).then((res) => {
      // if (!this.data.searchValue.length) {
      //   return
      // }

      // 1.获取建议的关键字歌曲
      const suggestSongs = res.result.allMatch;
      this.setData({ suggestSongs });
      if (!suggestSongs) return;

      // 2.转成nodes节点
      const suggestKeywords = suggestSongs.map((item) => item.keyword);
      const suggestSongsNodes = [];
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue);
        suggestSongsNodes.push(nodes);
      }
      this.setData({ suggestSongsNodes });
    });
  },
  handleSearchAction: function () {
    // 保存一下searchValue

    const searchValue = this.data.searchValue;
    getSearchResult(searchValue).then((res) => {
      this.setData({ resultSongs: res.result.songs });
    });
  },
  handleKeywordItemClick: function (event) {
    // 1.获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword;

    // 2.将关键设置到searchValue中
    this.setData({ searchValue: keyword });

    // 3.发送网络请求
    this.handleSearchAction();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData();
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

// pages/home-music/index.js
import { rankingStore, rankingMap } from "../../store/index";
import { getBannerData, getSongMenu } from "../../service/api_music";
import queryRect from "../../utils/query-rect";
import throttle from "../../utils/throttle";

const throttleQueryRect = throttle(queryRect, 1000);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    banners: [],

    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    rankings: { 0: {}, 2: {}, 3: {} },
  },

  getMusicData() {
    getBannerData().then((res) => {
      this.setData({ banners: res.banners });
    });

    getSongMenu().then((res) => {
      this.setData({ hotSongMenu: res.playlists });
    });

    getSongMenu("华语").then((res) => {
      this.setData({ recommendSongMenu: res.playlists });
    });
  },

  handleSearchClick() {
    wx.navigateTo({
      url: "/pages/music-search/index",
    });
  },

  handleSwiperImageLoaded() {
    throttleQueryRect(".swiper-image").then((res) => {
      const rect = res[0];
      if (!rect.height) return;
      this.setData({ swiperHeight: rect.height });
    });
  },

  getRankingHandler: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return;
      const name = res.name;
      const coverImgUrl = res.coverImgUrl;
      const playCount = res.playCount;
      const songList = res.tracks.slice(0, 3);
      const rankingObj = { name, coverImgUrl, playCount, songList };
      const newRankings = { ...this.data.rankings, [idx]: rankingObj };
      this.setData({
        rankings: newRankings,
      });
    };
  },

  navigateToDetailSongsPage: function (rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    });
  },

  handleMoreClick: function () {
    this.navigateToDetailSongsPage("hotRanking");
  },

  handleRankingItemClick: function (event) {
    const idx = event.currentTarget.dataset.idx;
    const rankingName = rankingMap[idx];
    this.navigateToDetailSongsPage(rankingName);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicData();

    rankingStore.dispatch("getRankListDataAction");

    rankingStore.onState("hotRanking", (res) => {
      if (!res.tracks) return;
      const recommendSongs = res.tracks.slice(0, 6);
      this.setData({ recommendSongs });
    });

    rankingStore.onState("newRanking", this.getRankingHandler(0));
    rankingStore.onState("originRanking", this.getRankingHandler(2));
    rankingStore.onState("upRanking", this.getRankingHandler(3));
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

const app = getApp();
Page({
  data: {
    roomInfo: false,
    room_type_index: 0,
    room_addsong_index: 0,
    room_sendmsg_index: 0,
    room_type: [{
      id: 0,
      name: "普通聊天房"
    }, {
      id: 1,
      name: "点歌音乐房"
    }, {
      id: 4,
      name: "房主电台房"
    }],
    room_addsong: [{
      value: 0,
      title: "所有人可点歌"
    }, {
      value: 1,
      title: "仅房主可点歌"
    }],
    room_sendmsg: [{
      value: 0,
      title: "关闭全员禁言"
    }, {
      value: 1,
      title: "开启全员禁言"
    }],
    room_public: [{
      value: 0,
      title: "公开房间"
    }, {
      value: 1,
      title: "加密房间"
    }],
    room_robot: [{
      value: 0,
      title: "开启机器人点歌"
    }, {
      value: 1,
      title: "关闭机器人点歌"
    }],
    room_playone: [{
      value: 0,
      title: "随机播放"
    }, {
      value: 1,
      title: "单曲循环"
    }],
    room_votepass: [{
      value: 0,
      title: "关闭投票切歌"
    }, {
      value: 1,
      title: "打开投票切歌"
    }],
    room_votepercent: [{
      value: 20,
      title: "20%"
    }, {
      value: 30,
      title: "30%"
    }, {
      value: 40,
      title: "40%"
    }, {
      value: 50,
      title: "50%"
    }, {
      value: 60,
      title: "60%"
    }, ],
    room_addsong: [{
      value: 0,
      title: "所有人可点歌"
    }, {
      value: 1,
      title: "仅管理员点歌"
    }],
    room_sendmsg: [{
      value: 0,
      title: "所有人可发言"
    }, {
      value: 1,
      title: "仅管理可发言"
    }],
  },
  onLoad: function (options) {},
  onShow: function () {
    let room_type_index = 0;
    let that = this;
    switch (app.globalData.roomInfo.room_type) {
      case 1:
        room_type_index = 1;
        break;
      case 4:
        room_type_index = 2;
        break;
      default:
    }
    let room_addsong_index = 0;
    switch (app.globalData.roomInfo.room_addsong) {
      case 0:
        room_addsong_index = 0;
        break;
      case 1:
        room_addsong_index = 1;
        break;
      default:
    }
    let room_sendmsg_index = 0;
    switch (app.globalData.roomInfo.room_sendmsg) {
      case 0:
        room_sendmsg_index = 0;
        break;
      case 1:
        room_sendmsg_index = 1;
        break;
      default:
    }
    this.setData({
      roomInfo: app.globalData.roomInfo,
      room_type_index: room_type_index,
      room_addsong_index: room_addsong_index,
      room_sendmsg_index: room_sendmsg_index
    });
  },
  changeType() {
    let that = this;
    let menu = [];
    for (let i = 0; i < that.data.room_type.length; i++) {
      menu.push(that.data.room_type[i].name);
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        that.setData({
          room_type_index: res.tapIndex
        });
      }
    })
  },
  changeAddSong() {
    let that = this;
    let menu = [];
    for (let i = 0; i < that.data.room_addsong.length; i++) {
      menu.push(that.data.room_addsong[i].title);
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        that.setData({
          room_addsong_index: res.tapIndex
        });
      }
    })
  },
  changeSendmsg() {
    let that = this;
    let menu = [];
    for (let i = 0; i < that.data.room_sendmsg.length; i++) {
      menu.push(that.data.room_sendmsg[i].title);
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        that.setData({
          room_sendmsg_index: res.tapIndex
        });
      }
    })
  },
  doSubmit(e) {
    let that = this;
    let roomInfo = e.detail.value;
    roomInfo.room_type = 0;
    switch (that.data.room_type_index) {
      case 0:
        roomInfo.room_type = 0;
        break;
      case 1:
        roomInfo.room_type = 1;
        break;
      case 2:
        roomInfo.room_type = 4;
        break;
      default:
    }
    roomInfo.room_addsong = that.data.room_addsong_index;
    roomInfo.room_sendmsg = that.data.room_sendmsg_index;
    roomInfo.room_id = that.data.roomInfo.room_id;
    app.request({
      url: "room/saveMyRoom",
      data: roomInfo,
      success(res) {
        wx.showToast({
          title: '修改成功',
        });
        wx.navigateBack();
      }
    });
  },
})
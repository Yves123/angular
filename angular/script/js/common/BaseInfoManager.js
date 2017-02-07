define(['jquery'], function ($) {
  var self = {};
  //用户信息
  self.UserInfoManager = {
    Key: 'userinfo',
    GetUserInfo: function () {
      var userInfo = window.sessionStorage.getItem(this.Key);
      if (userInfo == null) {
        userInfo = window.localStorage.getItem(this.Key);
      }
      var userInfoModel = null;
      if (userInfo != null) {
        userInfoModel = JSON.parse(userInfo);
      }
      return userInfoModel;
    },
    SetUserInfo: function (isRemember, userInfoModel) {
      var userInfoString = JSON.stringify(userInfoModel);
      if (isRemember) {
        window.localStorage.setItem(this.Key, userInfoString);
      }
      else {
        window.sessionStorage.setItem(this.Key, userInfoString);
      }
    },
    IsRemember: function () {
      var userInfo = window.sessionStorage.getItem(this.Key);
      if (userInfo == null) {
        return true;
      }
      return false;
    },
    Clear: function () {
      window.sessionStorage.removeItem(this.Key);
      window.localStorage.removeItem(this.Key);
    }
  };
  
  return self;
});

define(['loginApp', 'jquery', 'common/BaseInfoManager'], 
function (app, $, BaseManager) {
  app.controller('loginCtrl', function ($scope, $http) {

    $scope.loginhante = function(){      // 点击登录事件
        var userName = $('#userName').val(),
            isRemember = true,
            userPassword = $('#userPassword').val(),
            userInfoViewModel = { 'userName': userName, 'userPassword': userPassword };
        BaseManager.UserInfoManager.SetUserInfo(isRemember, userInfoViewModel); // isRemember 为设置是否默认选中
        if(userName == 'admin' && userPassword == '123456'){
            window.location.href = '/index.html';
        }
    }

    document.onkeydown=function(event){  // 点击回车 调用登录事件
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ // enter 键
            $scope.loginhante();
        }
    }
  });
  return app;
});

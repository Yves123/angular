define(['angular', 'common/BaseInfoManager', 'router'],
  function (angular, BaseManager) {
    var app = angular.module('indexApp', ['ngRoute']);

    var userInfo = BaseManager.UserInfoManager.GetUserInfo();  // 获取缓存里的数据

    app.config(function ($routeProvider) {

      if (!userInfo) {                                         // 缓存为空 就返回到登录界面
        window.location.href = "/login.html";
        return;
      }

      $routeProvider.when('/server', {
        templateUrl: 'html/index/server.html',
        controller: 'serverCtrl'
      }).otherwise({
        redirectTo: '/server'
      });
    });

    return app;
  });
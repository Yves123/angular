define(['indexApp', 'model/serverModel'], function (app, serverModel) {
  app.controller('serverCtrl', function ($scope, $http) {
    $scope.vm = {
        server:function(){
            var model = new serverModel(),
                data = model.convertFromDepart();
            console.log(data)
        }
    }

     $scope.vm.server();
  });
  return app;
});

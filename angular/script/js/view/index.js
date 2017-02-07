require(['angular', 'bootStrap','controllers/index/serverCtrl'],
  function (angular) {
    angular.element(document).ready(function () {
      angular.bootstrap(document, ['indexApp']);
    });
});
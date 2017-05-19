/**
 * 登录控制器
 */
angular.module('myApp')
.controller('loginController', function($scope, $location, $http, TokenManager, API, $mdToast) {
  $scope.credentials = {
    username: 'thenbsp',
    password: '123456'
  };
  $scope.openToast = function(_tstring) {
    $mdToast.show($mdToast.simple().textContent(_tstring));
    // Could also do $mdToast.showSimple('Hello');
  };
  
  $scope.processForm = function(credentials) {
    $http({
        method: 'POST',
        url:API + '/auth/login',
        data: $scope.credentials,
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        },
        headers:{ "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
      }).then(function(res){
        if (res.status !== 200) {
          $scope.openToast(res.data);
          return false;
        }

        TokenManager.setToken(res.data);
        $location.path('/');
    });

  }
});
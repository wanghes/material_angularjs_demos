/**
 * 首页控制器
 */
angular.module('myApp')
.controller('homeController', function($scope, $http, $location, TokenManager,$mdDialog) {

  $http.get('https://api.github.com/users/wanghes')
    .then(function(res) {
      $scope.github = res;
    });
  $scope.birthday = "1987-10-15";  
  $scope.items = [11111,32423434,12313123]
  function showAlert() {
	  alert = $mdDialog.alert({
	    title: 'Attention',
	    textContent: 'This is an example of how easy dialogs can be!',
	    ok: 'Close'
	  });

	  $mdDialog
	    .show( alert )
	    .finally(function() {
	      alert = undefined;
	    });
	}
	$scope.showAlert = showAlert;
	$scope.showDialog = showDialog;

	function showDialog($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           '<md-dialog aria-label="List dialog">' +
           '  <md-dialog-content>'+
           '    <md-list>'+
           '      <md-list-item ng-repeat="item in items">'+
           '       <p>Number {{item}}</p>' +
           '      '+
           '    </md-list-item></md-list>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
         locals: {
           items: $scope.items
         },
         controller:DialogController
      });
      function DialogController($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
   }



  $scope.processLogout = function() {
    TokenManager.removeToken();
    $location.path('/login');
  }
});
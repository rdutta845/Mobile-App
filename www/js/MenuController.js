angular.module('starter.controllers')
.controller('MenuController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.tokenInfo = $auth.getPayload($window.sessionStorage.token); 
	$scope.logout = function(){
		// $location.path('/app/steuplogin');
		$window.location.reload();
	}

})
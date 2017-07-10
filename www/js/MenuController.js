angular.module('starter.controllers')
.controller('MenuController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.tokenInfo = $auth.getPayload($window.sessionStorage.token);
	console.log($scope.tokenInfo);

	if($scope.tokenInfo!=undefined && $scope.tokenInfo.picUrl == undefined){

		$scope.tokenInfo.picUrl = "img/user.png";
	}
	$scope.logout = function(){
		// $location.path('/app/steuplogin');
		$window.localStorage.removeItem('satellizer_token');
  ///logout///
		$window.location.reload();
	}
	$http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/allmysessionsinfo",
  }).then(function mySucces(response) {
		console.log("here");
		$scope.sessionsComp = response.data.totalCompletedNumber ? response.data.totalCompletedNumber : 0;
	})

})

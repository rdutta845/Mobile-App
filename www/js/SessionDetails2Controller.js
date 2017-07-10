angular.module('starter.controllers')
.controller('SessionDetails2Controller', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

		$scope.scheduleShow = true;
		$scope.contentShow = true;

		$scope.toggle = function(str){
			console.log(str);
			if(str == 'schedule'){
					$scope.scheduleShow = !$scope.scheduleShow;

			}else if(str == 'content'){
					$scope.contentShow = !$scope.contentShow;

			}
 		}
		$http({
	    method:"GET",
	    url:CONFIG.apiEndpoint+"/getsessioninfo/" + $stateParams.id,
	  }).then(function mySucces(response) {
	    console.log(response);
			$scope.session = response.data.result;
	  })


	})

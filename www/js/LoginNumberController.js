angular.module('starter.controllers')
.controller('LoginNumberController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.mobNumber = {
		value:''
	}
	http({
      method:"GET",
      url:CONFIG.apiEndpoint+"/checkisregister/"+$scope.mobNumber.value,
    }).then(function mySucces(response) {

    	console.log("RESPONSE Workshop", response.data.result);
        $scope.allClasses = response.data.result;
        $scope.allClasses.forEach(function(data, id){
        	$scope.classesShow.push(false);
        })

    })
    $scope.verify = function(){
    	console.log("verify");
    }
})
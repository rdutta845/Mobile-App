angular.module('starter.controllers')
.controller('LoginNumberController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.mobNumber = {
		value:''
	}

    $scope.verify = function(){
        CONFIG.contactNo = $scope.mobNumber.value;
        $http({
          method:"GET",
          url:CONFIG.apiEndpoint+"/checkisregister/"+CONFIG.contactNo,
        }).then(function mySucces(response) {

            console.log("RESPONSE Workshop", response.data);
            if(response.data.error == true && response.data.isRegistered == false){
                console.log("New User");
                $location.path('/app/volunteer_sign_up');
            }else if(response.data.error == false && response.data.isRegistered == false){
                console.log("Pre registered");
                $location.path('/app/volunteer_registration');

            }

        })
    	console.log("verify");
    }
})
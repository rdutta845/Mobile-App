angular.module('starter.controllers')
.controller('LoginNumberController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.mobNumber = {
		value:''
	}
<<<<<<< 3e877750547dda5538731fd19e33ba21477dced9

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
=======
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
>>>>>>> sign up page
})
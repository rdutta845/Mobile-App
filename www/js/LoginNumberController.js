angular.module('starter.controllers')
.controller('LoginNumberController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

	$scope.mobNumber = {
		value:''
	}

    $scope.verify = function(){
        if($scope.mobNumber == undefined || $scope.mobNumber.value == ''){
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: "Please Enter Your mobile number"
              });
              alertPopup.then(function(res) {
                console.log("Please Enter Your mobile number");
              });
            $location.path('/app/login_number_validation');  
        }
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

            }else if(response.data.error == true && response.data.isRegistered == true){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: response.data.message
                  });
                  alertPopup.then(function(res) {
                    console.log('Already Registered');
                  });
                $location.path('/app/stepuplogin');
             }

        })
    	console.log("verify");
    }
})
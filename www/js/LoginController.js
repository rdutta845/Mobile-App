angular.module('starter.controllers')
.controller('LoginController', function(CONFIG, $scope, $location, $window, $http, $rootScope, $auth, $ionicPopup) {
	//added to initiate select-dropdown
	 var token = '';
	 $scope.isAdmin = false;
	 $scope.userName = {
	 	value:''
	 }
	 $scope.password = {
	 	value:''
	 }
	//alert("In Login Controller");

  

	$scope.submit = function(){
		// alert("username is : "+$scope.userName);
		//  alert("password is : "+$scope.password);
		if($scope.userName.value === ''){
			var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'User email address is empty'
      });
      alertPopup.then(function(res) {
        console.log('no email id');
      });
			return;
		}
		if($scope.password.value === ""){
			var alertPopup = $ionicPopup.alert({
	      title: 'Error',
	      template: 'User password is empty'
	    });
	    alertPopup.then(function(res) {
	      console.log('no password');
	    });
			return;
		}

		$auth.login({'loginEmailOrMobile': $scope.userName.value, 'loginPassword': $scope.password.value})
		.then(function(response) {
			//console.log(response);
			console.log("inside login route", response)
			if (response.data.error==false){
				$scope.myToken = $auth.getPayload(response.data.token);
				console.log($scope.myToken)
				// alert($scope.myToken);
			}
			if($scope.myToken!=undefined && $scope.myToken.isActive == false){
				// swal("error","employee is not active");
				return;
			}
			if (response.data.error==true){
				// console.log(response.data.result);
				var alertPopup = $ionicPopup.alert({
          title: 'Error!!',
          template: response.data.message
        });
        alertPopup.then(function(res) {
          console.log('Login Error');
        });
				$location.path('/app/steuplogin');
				// alert(response.data.result);
			}else{
				//console.log(response);
				$rootScope.loginClassCSS = false;
				//console.log(response.data.token);
				$scope.myToken = $auth.getPayload(response.data.token);
				token = $scope.myToken;
				// console.log($scope.myToken.id);
				console.log('You have successfully signed in!');
				$window.sessionStorage.token = response.data.token;
				$location.path('/app/workshop');
				$window.location.reload();
			}
		})
		.catch(function(error) {
			//console.log(error.data, error.status);
			console.log("Error in Login");

		});
	}

	$scope.forgotPage = function(){
		 // alert("Hellooo");
		 console.log("forgot password");
 		 $location.path('app/forgot_password');
	}
	$scope.signUp = function(){
		var alertPopup = $ionicPopup.alert({
      title: 'Sign Up',
      template: "Welcome to Step Up !!  Registration Page"
    });
    alertPopup.then(function(res) {
      console.log('Registration');
    });
		$location.path('/app/login_number_validation');
	}

});

ngApp.controller('LoginController',['CONFIG', '$scope', '$auth', '$location', '$window', '$http','$rootScope', function(CONFIG, $scope, $auth, $location, $window, $http, $rootScope) {
	//added to initiate select-dropdown
	 $rootScope.loginClassCSS = true;
	 var token = '';
	 $scope.isAdmin = false;

	angular.element(document).ready(function () {
		$(".user-name .input-field input").focus(function(){
			$(".user-name").addClass("on-focus");
		});

		$(".user-name .input-field input").focusout(function(){
			$(".user-name").removeClass("on-focus");
		});

		$(".password .input-field input").focus(function(){
			$(".password").addClass("on-focus");
		});

		$(".password .input-field input").focusout(function(){
			$(".password").removeClass("on-focus");
		});
	});

	//alert("In Login Controller");
	$scope.submit = function(){
		// alert("username is : "+$scope.userName);
		//  alert("password is : "+$scope.password);
		if($scope.userName === undefined){
			swal('User Name is Empty.')
			return;
		}
		if($scope.password === undefined){
			swal('Password is Empty.')
			return;
		}
		
		$auth.login({'email': $scope.userName, 'password': $scope.password})
		.then(function(response) {
			//console.log(response);
			if (response.data.error==false){
				$scope.myToken = $auth.getPayload(response.data.token);
				console.log($scope.myToken)
				// alert($scope.myToken);
			}
			if($scope.myToken!=undefined && $scope.myToken.isActive == false){
				swal("error","employee is not active");
				return;
			}
			if (response.data.error==true){
				// console.log(response.data.result);
				swal(response.data.result)
				$location.path('/login');
				// alert(response.data.result);
			}else if($scope.myToken.isAdmin == true && $scope.myToken.firstLogin == false){
				$rootScope.loginClassCSS = false;
				//console.log(response.data.token);
				$scope.myToken = $auth.getPayload(response.data.token);
				token = $scope.myToken;
				// console.log($scope.myToken.id);
				swal('Admin Login')
				console.log('You have successfully signed in!');
				$window.sessionStorage.token = response.data.token;
				$location.path('/adminSettingsEdit/');
			}else if($scope.myToken.isAdmin == true && $scope.myToken.firstLogin == true){
				$rootScope.loginClassCSS = false;
				//console.log(response.data.token);
				$scope.myToken = $auth.getPayload(response.data.token);
				token = $scope.myToken;
				// console.log($scope.myToken.id);
				swal('Admin First Login')
				console.log('You have successfully signed in!');
				$window.sessionStorage.token = response.data.token;
				$location.path('/adminSettings/');
			}
			else{
				//console.log(response);
				$rootScope.loginClassCSS = false;
				//console.log(response.data.token);
				$scope.myToken = $auth.getPayload(response.data.token);
				token = $scope.myToken;
				// console.log($scope.myToken.id);
				console.log('You have successfully signed in!');
				$window.sessionStorage.token = response.data.token;
				$location.path('/dashboard/');
			}
		})
		.catch(function(error) {
			//console.log(error.data, error.status);
			console.log("Error in Login");

		});
	}

	$scope.forgotPage = function(){
		 // alert("Hellooo");
		 $rootScope.loginClassCSS = false;
		 $location.path('/forgot');
		// $http({
		// 	method : "GET",
		// 	url : CONFIG.apiEndpoint+'/changepass/'
		// }).then(function mySucces(response) {
		// 	console.log(response);
		// }, function myError(response) {
		// 	console.warn(response);
		// });
	}

	$scope.registerPage = function(){
		$location.path('/companyDetails');
	}

}]);

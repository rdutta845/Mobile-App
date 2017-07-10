angular.module('starter.controllers')
	.controller('ForgotPasswordController', function (CONFIG, $scope, $ionicSideMenuDelegate, $location, $window, $http, $rootScope, $auth, $ionicPopup) {
		$ionicSideMenuDelegate.canDragContent(false);
		$scope.$on('$ionicView.leave', function () {
			// Enable swipe to open menu while leaving this page
			$ionicSideMenuDelegate.canDragContent(true)
		});
		$scope.email = {
			value: ''
		}
		$scope.goBack = function(){
			$location.path('/app/stepuplogin');
		}
		$scope.chngPass = function () {
			if ($scope.email.value == null || $scope.email.value == '') {
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'please enter your mail id'
				});
				alertPopup.then(function (res) {
					console.log("please enter your mail id")
				});
			} else {
				$http({
					method: "POST",
					url: CONFIG.apiEndpoint + '/sendchangepassmail/',
					data: { handle: $scope.email.value }
				}).then(function mySucces(response) {
					if (response.data.error) {
						var alertPopup = $ionicPopup.alert({
							title: 'Error',
							template: response.data.message
						});
						alertPopup.then(function (res) {
							console.log(response.data.message)
						});
					} else {
						var alertPopup = $ionicPopup.alert({
							title: 'Success',
							template: "change password link successfully sent to you mail id"
						});
						alertPopup.then(function (res) {
							console.log("change password link successfully sent to your mail id")
						});
					}
					// console.log(response);
				}, function myError(response) {
					console.warn(response);
				});
			}
		}


	})

angular.module('starter.controllers')
.controller('TeacherScheduleController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $ionicModal) {

	$scope.showSession = [];


	$scope.tokenInfo = $auth.getPayload($window.sessionStorage.token); 
	$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallprogramsinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.programs = response.data.result;
 		})
 		$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallstudentclasssinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.classes = response.data.result;
 		})
 		$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallsessionsinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.allSession = response.data.result;
 			$scope.allSession.forEach(function(data, id){
 				$scope.showSession.push(false);
 			})
 		})
 		$scope.toggleGroup = function($index){
 			console.log("inside the accordion", $index, $scope.showSession[$index]);
 			$scope.showSession[$index] =  !$scope.showSession[$index];
 		}
 		$scope.editSession = function(){
			$scope.modal1.show();	    

 		}
 		$ionicModal.fromTemplateUrl('templates/popup1.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal1 = modal;
    });
 		$scope.closePopup = function(mymod){
    if(mymod==1) $scope.modal1.hide();
    else if(mymod==2) $scope.modal2.hide();
    else if(mymod==3) $scope.modal3.hide();
    else if(mymod==4) $scope.modal4.hide();
    else if(mymod==5) $scope.modal5.hide();
  }
})
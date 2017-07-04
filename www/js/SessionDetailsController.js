angular.module('starter.controllers')
.controller('SessionDetailsController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $ionicModal) {

		$scope.sessionShow = true;
		$scope.contentShow = false;
		$scope.attendanceShow = false;

		$scope.toggle = function(str){
			if(str == 'session'){
					$scope.sessionShow = !$scope.sessionShow;

			}else if(str == 'content'){
					$scope.contentShow = !$scope.contentShow;

			}else if(str == 'attendance'){
					$scope.attendanceShow = !$scope.attendanceShow;	

			}
 		}

 		$ionicModal.fromTemplateUrl('templates/popup4.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal4 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/popup5.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal5 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/popup3.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal3 = modal;
    });
 
  $scope.closePopup = function(mymod){
    if(mymod==1) $scope.modal1.hide();
    else if(mymod==2) $scope.modal2.hide();
    else if(mymod==3) $scope.modal3.hide();
    else if(mymod==4) $scope.modal4.hide();
    else if(mymod==5) $scope.modal5.hide();
  }
 		$scope.checkOut = function(){
 			$scope.modal4.show();
 		}

 		$scope.redo = function(){
			$scope.modal5.show();	    
 		}
 		$scope.confirmCheckOut= function(){
 			console.log("confirm checkOut");
 			$scope.modal4.hide();
 		}
 		$scope.confirmRedo = function(){
 			console.log("confirm redo");
 			$scope.modal5.hide();		
 		}
    $scope.addStudent = function(){
      console.log("ADD Student");
      $scope.modal3.show();
    }
    $scope.saveStudent = function(){
      console.log("save student");
      $scope.modal3.hide();   

    }
	})
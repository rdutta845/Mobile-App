angular.module('starter.controllers')
.controller('SessionDetailsController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

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

 		$scope.checkOut = function(){
 			var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'checkOut'
      });
      alertPopup.then(function(res) {
        console.log('Check Out');
      });
 		}

 		$scope.redo = function(){
 			var alertPopup = $ionicPopup.show({
        title: 'Are you want to mark the session as redo ?',
        template: "<ion-view><ion-header-bar align-title='center' class='custom_header'></div><h1 class='title'>Mark Redo</h1></ion-header-bar><ion-content class='contnet_bg'><center>Are you want to mark the session as redo ?<br><label class='item item-input'><textarea placeholder='Enter Remark'></textarea></label></center></ion-content>",
        buttons:[{
	        text: '<b>Save</b>',
	        type: 'button-positive',
	        onTap: function(e) {
          
        	}
        }]
      });
      alertPopup.then(function(res) {
        console.log('Redo');
      })

	    // var customTemplate =
	    //   "<ion-header-bar align-title='center' class='custom_header'><h1 class='title'>Mark Redo</h1></ion-header-bar><ion-content class='contnet_bg'><center><br><center>Are you want to mark the session as redo ?<br><label class='item item-input'><textarea placeholder='Enter Remark'></textarea></label></center>";

	    // $ionicPopup.show({
	    //   title: 'Are you want to mark the session as redo ?',
	    //   template: customTemplate,
	      // buttons: [{
	      //   text: '<b>Save</b>',
	      //   type: 'button-positive',
	      //   onTap: function(e) {
	          
	      //   }
	      // }]
	    // });
 		}

	})
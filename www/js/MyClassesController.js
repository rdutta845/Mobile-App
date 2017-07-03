angular.module('starter.controllers')
.controller('MyClassesController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

		$scope.classesShow = [];
		$scope.allClasses = [];
		// $scope.leftVol = [];
		// $scope.rightVol = [];
		$http({
      method:"GET",
      url:CONFIG.apiEndpoint+"/getallstudentclasssinfo",
    }).then(function mySucces(response) {

    	console.log("RESPONSE Workshop", response.data.result);
        $scope.allClasses = response.data.result;
        $scope.allClasses.forEach(function(data, id){
        	$scope.classesShow.push(false);
        })

    })
		$scope.toggle = function($index){
			console.log("$index", $index);
			$scope.classesShow[$index] = !$scope.classesShow[$index];

 		}
 		$scope.getFirstSubArray = function ($index) {
 			var start = 0;
 			var end = Math.ceil($scope.allClasses[$index]._volunteers.length/2) ;
 			// console.log("start end",start,end);
  	 return $scope.allClasses[$index]._volunteers.slice(start, end);
		}
		$scope.getSecondSubArray = function ($index) {
  	 var start = Math.ceil($scope.allClasses[$index]._volunteers.length/2);
 		 var end = ($scope.allClasses[$index]._volunteers.length);
 			// console.log("start end",start,end);

  	 return $scope.allClasses[$index]._volunteers.slice(start, end);
		}
		$scope.session = function (id) {

			// The data was not populated so doing this, remove this line once
			// the data is populated. No other change is required.
			// id = '594ba85aeffe8048280b5c4e';

			$location.path('/app/session_history/' + id);

		}
		$scope.student = function (id) {
			$location.path('/app/student_report/' + id)
		}
	})

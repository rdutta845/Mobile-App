angular.module('starter.controllers')
 .controller('WorkshopRegisterController', function (CONFIG, $scope, $stateParams, $location, $http) {

 	$scope.selectProgram = {
 		value:''
 	}

 	$scope.selectTerm = {
 		value:''
 	}

 	$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallprogramsinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.programs = response.data.result;
 		})
 		$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallprogramsinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.programs = response.data.result;
 		})
 		
    $scope.register = function () {
      $location.path('/app/workshop');

    }

    $scope.chngProg = function(){
    	console.log("$scope.selectProgram.value", $scope.selectProgram.value);
    }
    $scope.chngTerm = function(){
    	console.log("$scope.selectTerm.value", $scope.selectTerm.value);
    }
  })
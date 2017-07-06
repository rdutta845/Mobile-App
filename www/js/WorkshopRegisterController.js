angular.module('starter.controllers')
 .controller('WorkshopRegisterController', function (CONFIG, $scope, $stateParams, $location, $http, $window, $auth) {

 	$scope.selectProgram = {
 		value:''
 	}

 	$scope.selectTerm = {
 		value:''
 	}
    $scope.workshops = [];
    $scope.selectedWorkshops = [];
    $scope.selectedWorkshopId;
    $scope.newRecord;
    $scope.tokenInfo = $auth.getPayload($window.sessionStorage.token); 
    console.log("$scope.tokenInfo", $scope.tokenInfo)
 	$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallprogramsinfo'
 		}).then(function mySuccess(response){
 			console.log("RESULT", response.data.result);
 			$scope.programs = response.data.result;
 		})
 	// $http({
 	// 		method:'GET',
 	// 		url:CONFIG.apiEndpoint+'/getallworkshopsinfo'
 	// 	}).then(function mySuccess(response){
 	// 		$scope.workshops = response.data.result;
  //           console.log("workshops", $scope.workshops);
 	// 	})
 		
    $scope.register = function () {
        $scope.newRecord._enrolled.push($scope.tokenInfo.id);
      $http({
            method:'PUT',
            url:CONFIG.apiEndpoint+'/editworkshop/'+$scope.selectedWorkshopId,
            data: $scope.newRecord
        }).then(function mySuccess(response){
            $scope.workshops = response.data.result;
            console.log("workshops", $scope.workshops);
            $location.path('/app/workshop');
        })
      
    }

    $scope.chngProg = function(){
        $scope.selectedWorkshops = [];
    	console.log("$scope.selectProgram.value", $scope.selectProgram.value);
        if($scope.selectProgram.value !=undefined && $scope.selectTerm.value!=undefined){
            // $scope.workshops.forEach(function(data, id){
            //     if(data._program!=null && data._program._id == $scope.selectProgram.value && data.forTerm == $scope.selectTerm.value){
            //         console.log("data  print", data);
            //         $scope.selectedWorkshops.push(data);
            //     }
            // })
            $http({
                method:'POST',
                url:CONFIG.apiEndpoint+'/getAllMyCityWorkshope',
                data : {term : $scope.selectTerm.value, program : $scope.selectProgram.value}
            }).then(function mySuccess(response){
                $scope.workshops = response.data.result;
                console.log("workshops", $scope.workshops);
            })
        }
    }

    $scope.chngTerm = function(){
        $scope.selectedWorkshops = [];
    	console.log("$scope.selectTerm.value", $scope.selectTerm.value);
        if($scope.selectProgram.value !=undefined && $scope.selectTerm.value!=undefined){
            // $scope.workshops.forEach(function(data, id){
            //     if(data._program!= null && data._program._id == $scope.selectProgram.value && data.forTerm == $scope.selectTerm.value){
            //         $scope.selectedWorkshops.push(data);
            //     }
            // })
            $http({
                method:'GET',
                url:CONFIG.apiEndpoint+'/getAllMyCityWorkshope',
                data : {term : $scope.selectTerm.value, program : $scope.selectProgram.value}
            }).then(function mySuccess(response){
                $scope.workshops = response.data.result;
                console.log("workshops", $scope.workshops);
            })
        }
    }

    $scope.clickedFun = function($index){
        console.log("$index", $index);
        $scope.selectedWorkshopId = $scope.selectedWorkshops[$index]._id;
        $scope.newRecord = $scope.selectedWorkshops[$index];
        console.log("$scope.selectedWorkshopId", $scope.selectedWorkshopId)

    }

  })
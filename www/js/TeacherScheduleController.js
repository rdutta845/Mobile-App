angular.module('starter.controllers')
.controller('TeacherScheduleController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $ionicModal) {

	$scope.showSession = [];
  $scope.filterParams = {
    filterProg:null,
    filterTerm:null,
    filterClass:null
  }
  $scope.swapVolId={
   value:""
  };
  $scope.newVolId;
  $scope.editSes = [];
  $scope.users = [];
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
      url:CONFIG.apiEndpoint+'/getalluserinfo'
    }).then(function mySuccess(response){
      console.log("RESULT", response.data.result);
      $scope.users = response.data.result;
    })
 		$http({
 			method:'GET',
 			url:CONFIG.apiEndpoint+'/getallstudentclasss'
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
      $scope.myBackup = angular.copy($scope.allSession);
 			$scope.allSession.forEach(function(data, id){
 				$scope.showSession.push(false);
        $scope.editSes.push(false);
        $scope.editSes[id] = $scope.editable(id);
 			})
 		})
 		$scope.toggleGroup = function($index){
 			console.log("inside the accordion", $index, $scope.showSession[$index]);
 			$scope.showSession[$index] =  !$scope.showSession[$index];
 		}
 		$scope.editSession = function($index){
      var modalNo = 2;
      $scope.session = $scope.allSession[$index];
      $scope.allSession[$index]._volunteers.forEach(function(data, id){
        if($scope.tokenInfo.id == data._id){
          modalNo = 1;
        }
      })
      if(modalNo == 1){
			   $scope.modal1.show();
       }else if(modalNo == 2){
        $scope.modal2.show();
       }	    

 		}
 		$ionicModal.fromTemplateUrl('templates/popup1.html', {
      scope: $scope,
      animation: 'scale',
    }).then(function(modal) {
      $scope.modal1 = modal;
    });
    $ionicModal.fromTemplateUrl('templates/popup2.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal2 = modal;
    });
 		$scope.closePopup = function(mymod){
    if(mymod==1) $scope.modal1.hide();
    else if(mymod==2) $scope.modal2.hide();
    else if(mymod==3) $scope.modal3.hide();
    else if(mymod==4) $scope.modal4.hide();
    else if(mymod==5) $scope.modal5.hide();
  }
  $scope.editable = function($index){
   if($scope.allSession[$index]._volunteers.length >= 3){
      $scope.allSession[$index]._volunteers.forEach(function(data, id){
        if(data._id == $scope.tokenInfo.id){
          console.log("volunteer fon")
          return true;
        }
      })
      return false;
   } else if($scope.allSession[$index]._volunteers.length >= 2){
      var noOfCoach = 0;
      $scope.allSession[$index]._volunteers.forEach(function(data, id){
        if(data._id == $scope.tokenInfo.id){
          return true;
        }
        if(data.volunteerType == "Coach"){
          noOfCoach += 1;
        }
      })
      if(noOfCoach >= 2){
        return false;
      }else{
        return true;
      }
   }else{
    return true;
   }
  }

  $scope.applyFilters =  function () {
     
      $scope.allSession = angular.copy($scope.myBackup); // reset to unfiltered list first
     
      if ($scope.filterParams.filterProg) {
        var filteredData = [];
        console.log("filtering prog",$scope.filterParams.filterProg);
        for(var i = 0; i < $scope.allSession.length; i++){
          if($scope.allSession[i]._studentClass !=undefined && $scope.allSession[i]._studentClass._program !=undefined && $scope.allSession[i]._studentClass._program === $scope.filterParams.filterProg){
            filteredData[i] = $scope.allSession[i];
            
          }
        } 
        console.log(filteredData);
        $scope.allSession = filteredData.filter (function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        
      }
      if ($scope.filterParams.filterTerm) {
        var filteredData = [];
        console.log("filtering term",$scope.filterParams.filterTerm);
        for(var i = 0; i < $scope.allSession.length; i++){
          if($scope.allSession[i]._studentClass !=undefined && $scope.allSession[i]._studentClass.currentTerm !=undefined && $scope.allSession[i]._studentClass.currentTerm === $scope.filterParams.filterTerm){
            filteredData[i] = $scope.allSession[i];
            
          }
        }
        $scope.allSession = filteredData.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
      }
      if ($scope.filterParams.filterClass) {
        var filteredData = [];
        console.log("filtering Class",$scope.filterParams.filterClass);
        for(var i = 0; i < $scope.allSession.length; i++){
          if($scope.allSession[i]._studentClass !=undefined && $scope.allSession[i]._studentClass.classID !=undefined && $scope.allSession[i]._studentClass.classID === $scope.filterParams.filterClass){
            filteredData[i] = $scope.allSession[i];
            
          }
        }
        $scope.allSession = filteredData.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
      }
    }
  $scope.popup1 = function(session){
    console.log("popup1 $scope.swapVolId.value", $scope.swapVolId.value)
    if($scope.swapVolId.value){
      $http({
        method:'PUT',
        url:CONFIG.apiEndpoint+'/swapsessionvolunteer/'+session._id,
        data: {volId: $scope.swapVolId.value}
        }).then(function mySuccess(response){
        console.log("RESULT", response.data.result);
        $http({
          method:'GET',
          url:CONFIG.apiEndpoint+'/getallsessionsinfo'
        }).then(function mySuccess(response){
          console.log("RESULT", response.data.result);
          $scope.allSession = response.data.result;
          $scope.myBackup = angular.copy($scope.allSession);
          $scope.allSession.forEach(function(data, id){
            $scope.showSession.push(false);
            $scope.editSes.push(false);
            $scope.editSes[id] = $scope.editable(id);
          })
        })
        $scope.modal1.hide()
      })
    }
  }
  $scope.popup2 = function(session){
    $scope.newVolId = $scope.tokenInfo.id;

    if($scope.newVolId){
      $http({
        method:'PUT',
        url:CONFIG.apiEndpoint+'/addsessionvolunteer/'+session._id,
        data: {volId: $scope.newVolId}
        }).then(function mySuccess(response){
        console.log("RESULT", response.data);
        $http({
          method:'GET',
          url:CONFIG.apiEndpoint+'/getallsessionsinfo'
        }).then(function mySuccess(response){
          console.log("RESULT", response.data.result);
          $scope.allSession = response.data.result;
          $scope.myBackup = angular.copy($scope.allSession);
          $scope.allSession.forEach(function(data, id){
            $scope.showSession.push(false);
            $scope.editSes.push(false);
            $scope.editSes[id] = $scope.editable(id);
          })
        })
        $scope.modal2.hide()
      })
    }
  }
})
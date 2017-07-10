angular.module('starter.controllers')
.controller('SessionDetails2Controller', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

		$scope.scheduleShow = true;
		$scope.contentShow = true;

		$scope.toggle = function(str){
			console.log(str);
			if(str == 'schedule'){
					$scope.scheduleShow = !$scope.scheduleShow;

			}else if(str == 'content'){
					$scope.contentShow = !$scope.contentShow;

			}
 		}
		$http({
	    method:"GET",
	    url:CONFIG.apiEndpoint+"/getsessioninfo/" + $stateParams.id,
	  }).then(function mySucces(response) {
			$scope.session = response.data.result;
			$scope.session._volunteers.forEach(function(volunteer){
        // To get the number of sessions completed by the volunteer.
        $http({
          method:"GET",
          url:CONFIG.apiEndpoint+"/numberofsessioncomplete/"+volunteer.id + "/"
            + $scope.session._studentClass.id + "/" + $scope.session._studentClass.currentTerm,
        }).then(function success(response) {
          volunteer.sessionsComp = response.data.numberofsessioncompleted;
        })
        // To see if the volunteer knows the local language of the school.
        volunteer.languages.forEach(function(lang){
          volunteer.knowslocal = false;
          if(lang.toLowerCase() == $scope.session._school.languageOfInstruction.toLowerCase()){
            volunteer.knowslocal = true;
          }
        })
      })
			console.log(response);

	  })


	})

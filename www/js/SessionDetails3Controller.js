angular.module('starter.controllers')
.controller('SessionDetails3Controller', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $ionicModal) {

		$scope.sessionShow = false;
		$scope.contentShow = false;
		$scope.attendanceShow = true;
		$scope.homeworkShow = false;

		$scope.last5sessions = [];
		$http({
	    method:"GET",
	    url:CONFIG.apiEndpoint+"/getsessioninfo/" + $stateParams.id,
	  }).then(function mySucces(response) {
			$scope.session = response.data.result;
			$scope.schoolLocation = response.data.location;
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

			// To populate student name and marks
			$http({
		    method:"GET",
		    url:CONFIG.apiEndpoint+"/getstudentclassinfo/"+$scope.session._studentClass.id,
		  }).then(function mySucces(response) {
		    $scope.students = response.data.result._students;
		    console.log(response.data);
		  })
			// To get session and its color
			$http({
				method:"GET",
				url:CONFIG.apiEndpoint+"/getclasssessionsinfo/"+$scope.session._studentClass.id + "/" + $scope.session._studentClass.currentTerm,
			}).then(function mySucces(response) {
				console.log(response.data.result);
				response.data.result.forEach(function (value,id) {
					if(value.sessionNo < $scope.session.sessionNo) {
						$scope.last5sessions.push(value);
					}
				})
				console.log($scope.last5sessions);
			})


			console.log(response);

	  })


		$scope.toggle = function(str){
			if(str == 'session'){
					$scope.sessionShow = !$scope.sessionShow;

			} else if(str == 'content'){
					$scope.contentShow = !$scope.contentShow;

			} else if(str == 'attendance'){
					$scope.attendanceShow = !$scope.attendanceShow;

			} else if(str == 'homework'){
					$scope.homeworkShow = !$scope.homeworkShow;

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

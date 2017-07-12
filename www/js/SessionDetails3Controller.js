angular.module('starter.controllers')
.controller('SessionDetails3Controller', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $ionicModal) {

		$scope.sessionShow = false;
		$scope.contentShow = false;
		$scope.attendanceShow = true;
		$scope.homeworkShow = false;
		$scope.homework = {};

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

			// Variables for Add new student
			$scope.FullName = {value : ""};
			$scope.NewStudent = {
				name : {},
				motherTongue : "",
				ASERScores : [""],
				_studentClass : $scope.session._studentClass.id
			};

			populateStudents();
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

		// To populate student name and marks
		function populateStudents() {
			$http({
				method:"GET",
				url:CONFIG.apiEndpoint+"/getstudentclassinfo/"+$scope.session._studentClass.id,
			}).then(function mySucces(response) {
				$scope.students = response.data.result._students;
				$scope.score = [];
				$scope.students.forEach(function (value, id) {
					$scope.score.push({ _id : value._id , ASERScores : value.ASERScores});
				})
				console.log(response.data);
			})
		}


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



		$scope.saveColor = function(){
			console.log($scope.homework);
			// Hit a endpoint to save this
 		}

		$scope.saveAttendance = function(){
			$scope.studentsAttended = [];
			$scope.students.forEach(function (value, id) {
				if(value.attendance || value.badBehavoiur || (value.marks >= 0)) {
					$scope.studentsAttended.push(value);
				}
			})
			console.log($scope.studentsAttended);

			// Hit a endpoint to save this
 		}

		$ionicModal.fromTemplateUrl('templates/popup3.html', {
      scope: $scope,
      animation: 'scale'
    }).then(function(modal) {
      $scope.modal3 = modal;
    });

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

	  $scope.closePopup = function(mymod){
	    if(mymod==1) $scope.modal1.hide();
	    else if(mymod==2) $scope.modal2.hide();
	    else if(mymod==3) $scope.modal3.hide();
	    else if(mymod==4) $scope.modal4.hide();
	    else if(mymod==5) $scope.modal5.hide();
	  }

		$scope.addStudent = function(){
      console.log("ADD Student");
      $scope.modal3.show();
    }
    $scope.saveStudent = function(){
			$scope.NewStudent.name = {
				firstName : $scope.FullName.value.substr(0,$scope.FullName.value.indexOf(' ')),
				lastName : $scope.FullName.value.substr($scope.FullName.value.indexOf(' ') + 1)
			}
			console.log($scope.NewStudent);
			$http({
				method:"POST",
				data: $scope.NewStudent,
				url:CONFIG.apiEndpoint+"/addstudent",
			}).then(function mySucces(response) {
				console.log(response);
				populateStudents();

			})
      console.log("save student");
      $scope.modal3.hide();

    }

		$scope.checkOut = function(){
			console.log($scope.score);
 			$scope.modal4.show();
 		}

		$scope.redo = function(){
			$scope.modal5.show();
 		}

		$scope.comment = {value : ""};
 		$scope.confirmCheckOut= function(){
			$scope.checkOUTcontent = { _students : $scope.score, comments : $scope.comment.value}
			console.log($scope.checkOUTcontent);
			// $http({
			// 	method:"POST",
			// 	data: $scope.NewStudent,
			// 	url:CONFIG.apiEndpoint+"/addstudent",
			// }).then(function mySucces(response) {
			// 	console.log(response);
			// 	populateStudents();
			//
			// })
 			console.log("confirm checkOut");
 			$scope.modal4.hide();
 		}
 		$scope.confirmRedo = function(){
 			console.log("confirm redo");
			$scope.redoContent = { comments : $scope.comment.value};
			console.log($scope.redoContent);
 			$scope.modal5.hide();
 		}
})

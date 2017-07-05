angular.module('starter.controllers')
.controller('SessionHistory', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {
  console.log($stateParams.id);

  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/getclasssessionsinfo/"+$stateParams.id,
  }).then(function mySucces(response) {
    console.log(response);
    $scope.sessions = response.data.result;
    // To see if the volunteer knows the local language of the school.
    $scope.sessions.forEach(function(session, id){
      session._volunteers.forEach(function(volunteer){
        $http({
          method:"GET",
          url:CONFIG.apiEndpoint+"/numberofsessioncomplete/"+volunteer.id,
        }).then(function success(response) {
          volunteer.sessionsComp = response.data.numberofsessioncompleted;
        })
        volunteer.languages.forEach(function(lang){
          volunteer.knowslocal = false;
          if(lang.toLowerCase() == $scope.sessions[id]._school.languageOfInstruction.toLowerCase()){
            volunteer.knowslocal = true;
          }
        })
      })
    })
    console.log($scope.sessions);
  })
	})

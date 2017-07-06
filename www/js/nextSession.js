angular.module('starter.controllers')
.controller('nextSession', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

  $scope.Show = [];

  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/getmynextsessionsinfo",
  }).then(function mySucces(response) {
    console.log(response);
    $scope.sessions = response.data.result;
    $scope.sessions.forEach(function(data, id){
      $scope.Show.push(false);
    })
    $scope.sessions.forEach(function(session, id){
      session._volunteers.forEach(function(volunteer){
        // To get the number of sessions completed by the volunteer.
        $http({
          method:"GET",
          url:CONFIG.apiEndpoint+"/numberofsessioncomplete/"+volunteer.id + "/" + session._studentClass.id + "/" + session.currentTerm
        }).then(function success(response) {
          volunteer.sessionsComp = response.data.numberofsessioncompleted;
        })
        // To see if the volunteer knows the local language of the school.
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
  $scope.toggle = function($index){
    $scope.Show[$index] = !$scope.Show[$index];
  }
  })

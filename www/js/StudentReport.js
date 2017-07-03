angular.module('starter.controllers')
.controller('StudentReport', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {
  console.log($stateParams.id);

  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/getstudentclassinfo/"+$stateParams.id,
  }).then(function mySucces(response) {
    $scope.students = response.data.result._students;
    console.log($scope.students);
  })
	})

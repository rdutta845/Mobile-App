angular.module('starter.controllers')
.controller('SessionHistory', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {
  console.log($stateParams.id);

  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/getstudentclassinfo/"+$stateParams.id,
  }).then(function mySucces(response) {
    console.log(response);
    $scope.session = response.data.result;
    console.log($scope.session);
  })
	})

angular.module('starter.controllers')
.controller('honararium', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $filter) {
  $scope.hist = [];
  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/allmysessionsinfo",
  }).then(function mySucces(response) {
    $scope.sessions = response.data.result;
    $scope.amount = response.data.amount;
    $scope.sessions.forEach(function (data, id){
      var year =  $filter('date')(data.date, "yyyy");
      var month = $filter('date')(data.date, "MMM");
      var monthvalue = $filter('date')(data.date, "MM");
      var newTemp = $filter("filter")($scope.hist, { year : year, month : month});
      if(newTemp.length == 0) {
        $scope.hist.push({ year : year , month : month , monthvalue : monthvalue , value : 1})
      } else {
        $filter("filter")($scope.hist, { year : year, month : month})[0].value += 1;
      }

    })
    console.log(response);
  })
  })

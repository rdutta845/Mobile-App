angular.module('starter.controllers')
.controller('StudentReport', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $filter) {
  console.log($stateParams.id);

  $http({
    method:"GET",
    url:CONFIG.apiEndpoint+"/getstudentclassinfo/"+$stateParams.id,
  }).then(function mySucces(response) {
    $scope.students = response.data.result._students;
    console.log(response.data);
    var sessionsComp = $filter("filter")(response.data.result._sessions, { status : "Completed"});
    $scope.totalAttendance = ( sessionsComp ? sessionsComp.length : 0);
    $http({
      method:"GET",
      url:CONFIG.apiEndpoint+"/attendance/"+$stateParams.id + "/" + $stateParams.term,
    }).then(function mySucces(response) {
      console.log(response);
      $scope.students.forEach( function (data, id) {
        data.attendance = ($filter("filter")(response.data.result, { id : data._id}))[0].days;
      })

    })
  })

	})

angular.module('starter.controllers')
.controller('WorkshopController', function(CONFIG, $scope, $stateParams, $location, $http) {

    $http({
      method:"GET",
      url:CONFIG.apiEndpoint+"/getallworkshopsinfo",
    }).then(function mySucces(response) {
        console.log("success");
        if(response.data.result != null){
            console.log("RESPONSE Workshop", response.data.result);
            $scope.userWorkshop = response.data.result;
          
          }
        })
    $scope.register = function () {
      console.log("move on");
      $location.path('/app/register_workshop');
    }
  })
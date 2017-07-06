angular.module('starter.controllers')
.controller('WorkshopController', function(CONFIG, $scope, $stateParams, $location, $http) {

    $scope.userWorkshop=[];
    $scope.scheduleWorkshop = [];
    $scope.pastWorkshop = [];
    var curDate = new Date();
    $http({
      method:"GET",
      url:CONFIG.apiEndpoint+"/getallworkshopsinfo",
    }).then(function mySucces(response) {
        console.log("success");
        console.log("response", response);
        if(response.data.result != null){
            console.log("RESPONSE Workshop", response.data.result);
            $scope.userWorkshop = response.data.result;
          }
          console.log("current Date", curDate);
          $scope.userWorkshop.forEach(function(data, id){
            var comDate = new Date(data.date);
            console.log("comDate", comDate);
            if(curDate > comDate){
              $scope.pastWorkshop.push(data);
            }else if(curDate <= comDate){
              $scope.scheduleWorkshop.push(data);
            }

          })

        })
    $scope.register = function () {
      console.log("move on");
      $location.path('/app/register_workshop');
    }
  })
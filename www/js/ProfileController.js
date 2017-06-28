angular.module('starter.controllers')
.controller('ProfileController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

  console.log("running successfully")
    $scope.newRecord = {
        "name" : {
          "firstName":"",
          "lastName":""
        },
        "email":"",
        "password":"",
        "organization":"",
        "languageSpoken" : [],
        "volunteerType" : ""

       };
       $scope.lan1 = [];
       $scope.lan2 = [];
       $scope.lanEven = [];
       $scope.lanOdd = [];
     $http({
        method : "GET",
        url : CONFIG.apiEndpoint+"/getsettingsinfo/",
    }).then(function mySucces(response) {
        console.log("success", $scope.tokenInfo);
        console.log("RESPONSE", response.data.settings);
        $scope.settings = response.data.settings;
        $scope.languages = $scope.settings.languages;
        $scope.languages.forEach(function(data, index){
          if(index%2==0){
            $scope.lan1.push(data);
            $scope.lanEven.push(false);
          }else{
            $scope.lan2.push(data);
            $scope.lanOdd.push(false);

          }
          $http({
              method : "GET",
              url : CONFIG.apiEndpoint+"/getuserinfo/"
          }).then(function mySucces(response) {
              console.log("success", $scope.tokenInfo);
              console.log("RESPONSE", response.data.result);
              $scope.dataRecord = response.data.result;
              $scope.newRecord = $scope.dataRecord;
              $scope.newRecord.languageSpoken.forEach(function(data, id){
                  for(var i=0 ; i<$scope.lan1.length; i++){
                    if($scope.lan1[i] == data){
                      $scope.lanEven[i] = true;
                    }
                  }
                  for(var i=0 ; i<$scope.lan2.length; i++){
                    if($scope.lan2[i] == data){
                      $scope.lanOdd[i] = true;
                    }
                  }
                  
              })
          });
        })
    });


  
})
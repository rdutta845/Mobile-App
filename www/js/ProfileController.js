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
        "corporate":"Step Up For India",
        "languages" : [],
        "volunteerType" : "",
        "picUrl":"img/user.png"
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
              if($scope.newRecord.picUrl == undefined){
                $scope.newRecord.picUrl = "img/user.png";
              }
              if($scope.newRecord.corporate == undefined){
                $scope.newRecord.corporate = "Step Up For India";
              }
              $scope.workshop = $scope.dataRecord.workshopsAttended;
              $scope.newRecord.languages.forEach(function(data, id){
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

    $scope.save = function(){
       $http({
          method : "PUT",
          url : CONFIG.apiEndpoint+"/edituser",
          data:$scope.newRecord
          })
          .then(function (response) {
            console.log("response object",response.data);
            if(response.data.error){
              console.log("error")
              var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Please insert proper data'
              });
              alertPopup.then(function(res) {
                console.log('Please insert proper data');
              });
            }else{
              console.log("success")
              var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: '<b>Your data successfully saved<b>'
              });
              alertPopup.then(function(res) {
                console.log('Your data successfully saved');
              });
            }
            
          });
      }
      $scope.language = function(str, $index){
        console.log("str", str, "$index", $index);
        var isPresent = false;
        $scope.newRecord.languages.forEach(function(data, index){
          if(data == str){
            $scope.newRecord.languages.splice(index, 1);
            isPresent = true;
          }
        })
        if(isPresent == false){
          $scope.newRecord.languages.push(str);
        }
      }
      $scope.uploadPic = function(){
        if ($scope.newRecord.picUrl) {
        // First, upload the attachment files:
        console.log("inside if $scope.newRecord.picUrl",$scope.newRecord.picUrl);
        UploadService.uploadFiles([$scope.newRecord.picUrl], function(err, files) {

          if (!err) {
            console.log("PIC Uploading files okay!!",files)
            // save the task
            $scope.newRecord.picUrl = files[0].URL
            console.log("file[0]", files[0].URL)
            console.log('pic',  $scope.newRecord.picUrl)

          } else {
            console.log(err)
          }
        })
      } else {
        $scope.newRecord.picUrl = "img/user.png"
      }
    }
  
})
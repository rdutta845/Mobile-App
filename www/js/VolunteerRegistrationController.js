angular.module('starter.controllers')
.controller('VolunteerRegistrationController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window) {

  console.log("running successfully")
    $scope.newRecord = {
        "name" : {
          "firstName":"",
          "lastName":""
        },
        "email":"",
        "password":"",
        "organization":"",
        "languageSpoken" : []

       };
      $scope.lan1 = [];
      $scope.lan2 = [];
      $scope.first = {
        value:""
      }
      $scope.last = {
        value:""
      }
      $scope.email = {
        value:""
      }
      $scope.pass = {
        value:""
      }
      $scope.org = {
        value:""
      }
      $scope.vType = {
        value : ''
      }

     $scope.tokenInfo = $auth.getPayload($window.sessionStorage.token); 

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
          }else{
            $scope.lan2.push(data);
          }
        })
    });
    // /checkisregister/:mobile
    $http({
        method : "GET",
        url : CONFIG.apiEndpoint+"/checkisregister/"+$scope.tokenInfo.mobile,
        //////contact no. hard coded fetched from otp
    }).then(function mySucces(response) {
        console.log("success");
        if(response.data.result != null){
            console.log("RESPONSE", response.data.settings);
            $scope.userData = response.data.result;
            console.log("$scope.userData", $scope.userData);
            $scope.first.value = $scope.userData.name.firstName;
            $scope.last.value = $scope.userData.name.lastName;
            $scope.vType.value = $scope.userData.volunteerType;
            $scope.org.value = $scope.userData.organization;
            $scope.email.value = $scope.userData.email;
          }
        })
    

    $scope.namePrint = function(){
      console.log("firstName", $scope.first.value)
    }
    $scope.language = function(str, $index){
      console.log("str", str, "$index", $index);
      var isPresent = false;
      $scope.newRecord.languageSpoken.forEach(function(data, index){
        if(data == str){
          $scope.newRecord.languageSpoken.splice(index, 1);
          isPresent = true;
        }
      })
      if(isPresent == false){
        $scope.newRecord.languageSpoken.push(str);
      }
    }
    $scope.save = function(){
      $scope.newRecord.name.firstName = $scope.first.value;
      $scope.newRecord.name.lastName = $scope.last.value;
      $scope.newRecord.email = $scope.email.value;
      $scope.newRecord.password = $scope.pass.value;
      $scope.organization = $scope.org.value;
      $scope.newRecord.organization = $scope.org.value;
      
      console.log("save route $scope.newRecord", $scope.newRecord)

       $http({
          method : "PUT",
          url : CONFIG.apiEndpoint+"/edituser",
          // url : CONFIG.apiEndpoint+"/adduser",
          data:$scope.newRecord
          })
          .then(function (response) {
            console.log("response object",response.data);
            if(response.data.error){
              console.log("please insert proper data");
              var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: 'Please Insert proper data'
              });
              alertPopup.then(function(res) {
                console.log('sorry you are not registered');
              });
            }else{
              // console.log(response.data.result);
              var alertPopup = $ionicPopup.alert({
                title: 'Successfull',
                template: 'Volunteer Successfully registered'
              });
              alertPopup.then(function(res) {
                console.log('Thank you for registration');
              });
              $location.path('/app/workshop');
            }
          });
        

      }

 });
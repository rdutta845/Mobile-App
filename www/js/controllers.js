// angular.module('starter', ['ionic', 'starter.controllers'])
// .constant("CONFIG", {
//   "apiEndpoint": 'http://localhost:3000/api/v1'  // Note: No trailing slashes!
// })

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  
})
.controller('VolunteerRegistrationController', function($scope, $stateParams, $ionicPopup, $http, $location) {

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


    $http({
        method : "GET",
        url : 'http://localhost:3000/api/v1'+"/getsettingsinfo/",
    }).then(function mySucces(response) {
        console.log("success");
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
        url : 'http://localhost:3000/api/v1'+"/checkisregister/8293113033",
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
      console.log("gurrrrrrrrrrrrrrrrrgulllllllllllllaaaaaaaa")
      $scope.newRecord.name.firstName = $scope.first.value;
      $scope.newRecord.name.lastName = $scope.last.value;
      $scope.newRecord.email = $scope.email.value;
      $scope.newRecord.password = $scope.pass.value;
      $scope.organization = $scope.org.value;
      $scope.newRecord.organization = $scope.org.value;
      
      console.log("$scope.newRecord", $scope.newRecord)

       $http({
          method : "PUT",
          url : 'http://localhost:3000/api/v1'+"/edituser",
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
            }
          });
        $location.path('/app/workshop');

      }

 })
.controller('WorkshopController', function($scope, $stateParams, $location) {

    $scope.register = function(){
      console.log("move on");
      $location.path('/app/register_workshop');
    }
 })
.controller('WorkshopRegisterController', function($scope, $stateParams, $location) {

    $scope.register = function(){
      $location.path('/app/workshop');
      
    }      
})



angular.module('starter.controllers')
.controller('VolunteerRegistrationController', function(CONFIG, $scope, $ionicSideMenuDelegate, $stateParams, $ionicPopup, $http, $location, $auth, $window, $rootScope) {

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
        "volunteerType":"Coach",
        // "picUrl" : "img/user.png"
        "mediafile":""
       };
      $scope.picUrl = "img/user.png";
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
      $scope.workshop = [];
      $scope.term = [];
     $scope.tokenInfo = $auth.getPayload($window.sessionStorage.token);
     $ionicSideMenuDelegate.canDragContent(false);
      $scope.$on('$ionicView.leave', function () {
      // Enable swipe to open menu while leaving this page
      $ionicSideMenuDelegate.canDragContent(true)
    });
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
        url : CONFIG.apiEndpoint+"/checkisregister/"+CONFIG.contactNo,
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
            $scope.org.value = $scope.userData.corporate;
            $scope.email.value = $scope.userData.email;
            $scope.workshop = $scope.userData.workshopsAttended;

            if($scope.userData.picUrl != undefined || $scope.userData.picUrl !=''){
              $scope.newRecord.picUrl = $scope.userData.picUrl;
              $rootScope.picUrl = $scope.userData.picUrl;
            }
          }
        })


    $scope.namePrint = function(){
      console.log("firstName", $scope.first.value)
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
    $scope.save = function(){
      const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegExp.test($scope.email.value)) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Invalid Email Id'
        });
        alertPopup.then(function(res) {
          console.log('Invalid Email Id');
        });
      return
      }
      $scope.newRecord.name.firstName = $scope.first.value;
      $scope.newRecord.name.lastName = $scope.last.value;
      $scope.newRecord.email = $scope.email.value;
      $scope.newRecord.password = $scope.pass.value;
      $scope.organization = $scope.org.value;
      $scope.newRecord.organization = $scope.org.value;

      console.log("save route $scope.newRecord", $scope.newRecord)
      var userData = JSON.stringify($scope.newRecord);
      var formData = new FormData();
      // for(fid in $scope.newRecord){
      //   formData.append(fid, $scope.newRecord[fid])
      // }
      formData.append("userData", userData);
      formData.append("mediafile", $scope.newRecord.mediafile);

       $http({
          method : "PUT",
          url : CONFIG.apiEndpoint+"/edituser",
          // url : CONFIG.apiEndpoint+"/adduser",
          data:formData
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
              $location.path('/app/stepuplogin');
            }
          });


      }
      // $scope.selcetedTerm = function($index){
      //   console.log("ami ekhane",$index)
      //   $scope.term = [];
      //   $scope.workshop.forEach(function(data, id){
      //     if(data.program == $scope.workshop[$index].program){
      //       $scope.term.push(data.term);
      //     }
      //   })
      // }
      $scope.uploadPic = function(){
        if ($scope.newRecord.mediafile) {
        // First, upload the attachment files:
        console.log("inside if $scope.newRecord.picUrl",$scope.newRecord.picUrl);
      } else {
        $scope.newRecord.picUrl = "img/user.png"
      }
    }

 });

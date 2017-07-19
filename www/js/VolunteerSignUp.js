angular.module('starter.controllers')
  .controller('VolunteerSignUp', function (CONFIG, $scope, $stateParams, ImageUploadFactory, $cordovaCamera, $ionicActionSheet, $ionicPopup, $http, $location, $auth, $window, $ionicSideMenuDelegate) {

    console.log("running successfully")
    $scope.newRecord = {
      "name": {
        "firstName": "",
        "lastName": ""
      },
      "email": "",
      "password": "",
      "corporate": "Step Up For India",
      "volunteerType": "Coach",
      "languages": [],
      "picUrl" : "img/user.png",
      // "mediafile": ""

    };
    $scope.picUrl = "img/user.png",
      $scope.lan1 = [];
    $scope.lan2 = [];
    $scope.first = {
      value: ""
    }
    $scope.last = {
      value: ""
    }
    $scope.email = {
      value: ""
    }
    $scope.pass = {
      value: ""
    }
    $scope.org = {
      value: ""
    }
    $scope.vType = {
      value: ''
    }
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.$on('$ionicView.leave', function () {
      // Enable swipe to open menu while leaving this page
      $ionicSideMenuDelegate.canDragContent(true)
    });
    $scope.org.value = "Step Up For India";
    $scope.vType.value = "Coach";
    $http({
      method: "GET",
      url: CONFIG.apiEndpoint + "/getsettingsinfo/",
    }).then(function mySucces(response) {
      console.log("RESPONSE", response.data.settings);
      $scope.settings = response.data.settings;
      $scope.languages = $scope.settings.languages;
      $scope.languages.forEach(function (data, index) {
        if (index % 2 == 0) {
          $scope.lan1.push(data);
        } else {
          $scope.lan2.push(data);
        }
      })
    });

    $scope.namePrint = function () {
      console.log("firstName", $scope.first.value)
    }
    $scope.language = function (str, $index) {
      console.log("str", str, "$index", $index);
      var isPresent = false;
      $scope.newRecord.languages.forEach(function (data, index) {
        if (data == str) {
          $scope.newRecord.languages.splice(index, 1);
          isPresent = true;
        }
      })
      if (isPresent == false) {
        $scope.newRecord.languages.push(str);
      }
    }
    $scope.save = function () {
      const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegExp.test($scope.email.value)) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Invalid Email Id'
        });
        alertPopup.then(function (res) {
          console.log('Invalid Email Id');
        });
        return
      }
      $scope.newRecord.name.firstName = $scope.first.value;
      $scope.newRecord.name.lastName = $scope.last.value;
      $scope.newRecord.email = $scope.email.value;
      $scope.newRecord.password = $scope.pass.value;
      $scope.newRecord.phone = CONFIG.contactNo;
      $scope.newRecord.corporate = $scope.org.value;
      $scope.newRecord.volunteerType = $scope.vType.value;
      console.log("save route $scope.newRecord", $scope.newRecord);
      console.log(", CONFIG.contactNo", CONFIG.contactNo)
      $scope.newRecord.contactNo = CONFIG.contactNo;
      console.log("save route $scope.newRecord", $scope.newRecord);
      var userData = $scope.newRecord;
      // var formData = new FormData();
      // for(fid in $scope.newRecord){
      //   formData.append(fid, $scope.newRecord[fid])
      // }
      // formData.append("userData", userData);
      // formData.append("mediafile", $scope.newRecord.mediafile);
      $http({
        method: "POST",
        url: CONFIG.apiEndpoint + "/adduser",
        // url : CONFIG.apiEndpoint+"/adduser",
        // transformRequest: angular.identity,//reference https://stackoverflow.com/a/35722271
        // headers: { 'Content-Type': undefined },//reference https://stackoverflow.com/a/35722271
        data: userData
      })
        .then(function (response) {
          console.log("response object", response.data);
          if (response.data.error) {
            console.log("please insert proper data");
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: 'Please Insert proper data'
            });
            alertPopup.then(function (res) {
              console.log('sorry you are not registered');
            });
          } else {
            console.log(response.data.result);
            var alertPopup = $ionicPopup.alert({
              title: 'Successfull',
              template: 'Successfully Signed Up verification will be done by the admin'
            });
            alertPopup.then(function (res) {
              console.log('Thank you for registration');
            });
            $location.path('/app/stepuplogin');
          }
        });


    }
    $scope.showPictureOptions = function () {

      // Show the action sheet
      var showActionSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-camera"></i> Camera' },
          { text: '<i class="icon ion-ios-albums"></i> Gallery' }
        ],

        //  destructiveText: 'Delete',
        titleText: 'Choose your option',
        cancelText: 'Cancel',

        cancel: function () {
          // add cancel code...
        },

        buttonClicked: function (index) {
          if (index === 0) {
            // Camera
            $scope.openCamera(Camera.PictureSourceType.CAMERA);
          }

          if (index === 1) {
            // Gallery
            $scope.openCamera(Camera.PictureSourceType.PHOTOLIBRARY);
          }
          return true;
        },

        destructiveButtonClicked: function () {
          // add delete code..
        }
      });
    }
    $scope.openCamera = function (camOption) {
      // Method to open camera to take a pic
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: camOption,
        allowEdit: true
      };

      $cordovaCamera.getPicture(options).then(function (imageURI) {
        $scope.uploadToCloudinary(imageURI);

      }, function (err) {
        // error
      });
    }
    $scope.uploadToCloudinary = function (imageURI) {
      // $ionicLoading.show();
      ImageUploadFactory.uploadImage(imageURI).then(
        function (result) {

          var url = result.secure_url || '';
          var urlSmall;
          console.log('url:' + url);
          if (result) {
            urlSmall = result.secure_url || '';
            $scope.picUrl = urlSmall;
            $scope.newRecord.picUrl = urlSmall;
            $rootScope.picUrl = urlSmall;

            // $ionicLoading.hide();
          }

          // Do something with the results here.
          // $ionicLoading.hide();
          $cordovaCamera.cleanup();

        },
        function (err) {
          // Do something with the error here
          // $ionicLoading.hide();
          $cordovaCamera.cleanup();

        });
    }
    // $scope.previewPhoto = function(event) {
    //   var files = event.target.files;
    //   var file = files[files.length-1]
    //   var reader = new FileReader();
    //   reader.onload = function(e){
    //     $scope.$apply(function(){
    //       $scope.newRecord.picUrl = e.target.result;
    //     })
    //   }
    //      reader.readAsDataURL(file)
    //  }
    $scope.uploadPic = function () {
      if ($scope.newRecord.mediafile) {
        console.dir($scope.newRecord.mediafile)
      } else {
        $scope.picUrl = "img/user.png"
      }
    }
  });

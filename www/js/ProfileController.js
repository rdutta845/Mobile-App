angular.module('starter.controllers')
.controller('ProfileController', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, $rootScope, ImageUploadFactory, $cordovaCamera, $ionicActionSheet) {

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
        "picUrl":"img/user.png",
        // "mediafile":"",
        "workshopsAttended":[]
       };

       $scope.picUrl = "img/user.png";
       $scope.lan1 = [];
       $scope.lan2 = [];
       $scope.lanEven = [];
       $scope.lanOdd = [];
       $scope.tokenInfo = $auth.getPayload($window.sessionStorage.token);

     $http({
        method : "GET",
        url : CONFIG.apiEndpoint+"/getsettingsinfo/",
    }).then(function mySucces(response) {
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
              $scope.dataRecord = response.data.result;
              $scope.newRecord = $scope.dataRecord;
              console.log("$scope.newRecord", $scope.newRecord);
              if($scope.newRecord.picUrl == undefined){
                $scope.picUrl = "img/user.png";
                $rootScope.picUrl = "img/user.png";
              }else{
                $scope.picUrl = $scope.newRecord.picUrl;
                $rootScope.picUrl = $scope.newRecord.picUrl;
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
      console.log("jaor por", $scope.newRecord);
      var userData = $scope.newRecord;
      var formData = new FormData();
      // for(fid in $scope.newRecord){
      //   formData.append(fid, $scope.newRecord[fid])
      // }
      formData.append("userData", userData);
      formData.append("mediafile", $scope.newRecord.mediafile);
       $http({
          method : "PUT",
          url : CONFIG.apiEndpoint+"/edituser",
          // transformRequest: angular.identity,//reference https://stackoverflow.com/a/35722271
          // headers: {'Content-Type': undefined},//reference https://stackoverflow.com/a/35722271
          // headers: {
          //       'Content-Type': 'multipart/form-data'
          //   },
          data:userData
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
              $scope.picUrl = response.data.result.picUrl;
              $rootScope.picUrl = response.data.result.picUrl;
            }

          });
      }

      // $scope.previewPhoto = function(event) {
      //   console.log(event)
      //   var files = event.target.files;
      //   var file = files[files.length-1]
      //   var reader = new FileReader();
      //   reader.onload = function(e){
      //     $scope.$apply(function(){
      //       $scope.picUrl = e.target.result;
      //     })
      //   }
      //      reader.readAsDataURL(file)
      //  }

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
      $scope.uploadPic = function(){
        if ($scope.newRecord.mediafile) {
          console.dir($scope.newRecord.mediafile)
          $scope.save()
        } else {
          $scope.picUrl = "img/user.png"
        }
      }

})

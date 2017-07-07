angular.module('starter.controllers')
.controller('VolunteerSignUp', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window, UploadService) {

  console.log("running successfully")
    $scope.newRecord = {
        "name" : {
          "firstName":"",
          "lastName":""
        },
        "email":"",
        "password":"",
        "corporate":"Step Up For India",
        "volunteerType":"Coach",
        "languages" : [],
        "picUrl" : "img/user.png"

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
    $scope.org.value =  "Step Up For India";
    $scope.vType.value = "Coach";
    $http({
        method : "GET",
        url : CONFIG.apiEndpoint+"/getsettingsinfo/",
    }).then(function mySucces(response) {
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
      console.log("save route $scope.newRecord", $scope.newRecord)

       $http({
          method : "POST",
          url : CONFIG.apiEndpoint+"/adduser",
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
              console.log(response.data.result);
              var alertPopup = $ionicPopup.alert({
                title: 'Successfull',
                template: 'Successfully Signed Up verification will be done by the admin'
              });
              alertPopup.then(function(res) {
                console.log('Thank you for registration');
              });
              $location.path('/app/stepuplogin');
            }
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
 });

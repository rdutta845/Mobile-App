angular.module('starter.controllers')
.controller('SessionDetails2Controller', function(CONFIG, $scope, $stateParams, $ionicPopup, $http, $location, $auth, $window , $cordovaGeolocation) {

		$scope.scheduleShow = true;
		$scope.contentShow = true;
		$scope.currentPosition = {};
		$scope.UserIsVolunteer = false;

		function distance(lat1, lon1, lat2, lon2, unit) {
			var radlat1 = Math.PI * lat1/180
			var radlat2 = Math.PI * lat2/180
			var theta = lon1-lon2
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			console.log(dist);
			return dist
		}
		$scope.toggle = function(str){
			console.log(str);
			if(str == 'schedule'){
					$scope.scheduleShow = !$scope.scheduleShow;

			}else if(str == 'content'){
					$scope.contentShow = !$scope.contentShow;

			}
 		}
		$http({
	    method:"GET",
	    url:CONFIG.apiEndpoint+"/getsessioninfo/" + $stateParams.id,
	  }).then(function mySucces(response) {
			$scope.session = response.data.result;
			$scope.schoolLocation = response.data.location;
			$scope.session._volunteers.forEach(function(volunteer){
				if(volunteer.id == $auth.getPayload().id) {
					$scope.UserIsVolunteer = true;
				}
        // To get the number of sessions completed by the volunteer.
        $http({
          method:"GET",
          url:CONFIG.apiEndpoint+"/numberofsessioncomplete/"+volunteer.id + "/"
            + $scope.session._studentClass.id + "/" + $scope.session._studentClass.currentTerm,
        }).then(function success(response) {
          volunteer.sessionsComp = response.data.numberofsessioncompleted;
        })
        // To see if the volunteer knows the local language of the school.
        volunteer.languages.forEach(function(lang){
          volunteer.knowslocal = false;
          if(lang.toLowerCase() == $scope.session._school.languageOfInstruction.toLowerCase()){
            volunteer.knowslocal = true;
          }
        })
      })
			$scope.checkInURL = (response.data.result.sessionType == "Regular" || response.data.result.sessionType == "Test") ? "app/session_details3/" : "app/session_details/";
			console.log(response);

	  })
		$scope.checkin = function (id) { //session._id
			console.log("id print",id);
			$scope.date = new Date();

			console.log((new Date($scope.session.date) - $scope.date)/ (1000 * 3600 * 24));
			// Check date interval
			if((new Date($scope.session.date) - $scope.date)/(1000 * 3600 * 24) < 1 && (new Date($scope.session.date) - $scope.date)/(1000 * 3600 * 24) > -1) {
				// NOTE: for testing purposes only. remove the next line when in production.
				// $location.path($scope.checkInURL + id);
				console.log($scope.checkInURL + id);
				$cordovaGeolocation.getCurrentPosition().then(function (position) {
					console.log(position);
					$scope.currentPosition.lat = position.coords.latitude;
					$scope.currentPosition.long = position.coords.longitude;
					if(distance($scope.currentPosition.lat, $scope.currentPosition.long, $scope.schoolLocation.lat, $scope.schoolLocation.lng, 'K') < 0.2) {
						$http({
							method:"GET",
							url:CONFIG.apiEndpoint+"/checkinsession/" + $stateParams.id + "/"
		            + $scope.session._studentClass.id,
						}).then(function mySucces(response) {
							console.log(response);
							// FINALLY CHECK IN
							$location.path($scope.checkInURL + id);
						})
					} else {
						$ionicPopup.alert({
				      title: 'Restricted',
				      template: 'You have not arrived in school!'
				    });
					}
				}, function (response) {
					$ionicPopup.alert({
			      title: 'Location Error',
			      template: 'Turn on your GPS and then try again.'
			    });
				}, { enableHighAccuracy: true });
			} else {
				$ionicPopup.alert({
		      title: 'Restricted',
		      template: 'You can Check IN only on sessions day'
		    });
			}
		}


	})

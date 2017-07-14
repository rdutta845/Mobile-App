// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var ngApp = angular.module('starter', ['ionic', 'satellizer', 'ngFileUpload', 'starter.controllers', 'ngCordova']);
// var ngApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngCookies',
// 'satellizer', 'ui.materialize', 'ngFileUpload', 'angularMoment',
// "angucomplete-alt", 'masonry', 'ui.calendar']);


ngApp.constant("CONFIG", {
  "apiEndpoint": 'http://localhost:3000/api/v1',//'http://139.59.77.254:3000/api/v1',  // Note: No trailing slashes!
  "contactNo" : ""
})

ngApp.config(function(CONFIG, $authProvider){
  $authProvider.baseUrl = CONFIG.apiEndpoint;
  $authProvider.loginUrl = '/login';
});

ngApp
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// An injectable service useful for Uploading Files to AWS, proxied through our backend
// ngApp.service("UploadService", function(CONFIG, $http) {
//     this.uploadFiles = function(filesToUpload, cb) {
//         var fd = new FormData()
//         filesToUpload.forEach(function(file, idx) {
//           fd.append('file-'+idx, file)
//         })
//         $http({
//           method : "POST",
//           headers: { 'Content-Type': undefined },
//           transformRequest: angular.identity,
//           url : CONFIG.apiEndpoint+'/uploadFile/addFiles',
//           data: fd
//         })
//         .success(function (data, status, headers, config) {
//           if (!data.error) {
//             return cb(null, data.files)
//           } else {
//             return cb("Error Uploading Files!!", null)
//           }
//         })
//         .error(function (data, status, headers, config) {
//           return cb("Network Error!!", null);
//         })
//     }
// });

ngApp
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuController'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.volunteer_registration', {
    url: '/volunteer_registration',
    views: {
      'menuContent': {
        templateUrl: 'templates/volunteer_registration.html',
        controller:'VolunteerRegistrationController'

      }
    },
  })
  .state('app.volunteer_sign_up', {
    url: '/volunteer_sign_up',
    views: {
      'menuContent': {
        templateUrl: 'templates/volunteer_sign_up.html',
        controller:'VolunteerSignUp'

      }
    },
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller:'ProfileController'

      }
    },
  })
  .state('app.workshop', {
    url: '/workshop',
    views: {
      'menuContent': {
        templateUrl: 'templates/workshop.html',
        controller:'WorkshopController'

      }
    }
  })
  .state('app.teacher_schedule', {
    url: '/teacher_schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/teacher_schedule.html',
        controller:'TeacherScheduleController'
      }
    }
  })
  .state('app.session_details', {
    url: '/session_details/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details.html',
        controller:'SessionDetailsController'
      }
    }
  })
  .state('app.session_details2', {
    url: '/session_details2/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details2.html',
        controller:'SessionDetails2Controller'

      }
    }
  })
  .state('app.session_details3', {
    url: '/session_details3/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details3.html'
      }
    }
  })
  .state('app.steuplogin', {
    url: '/stepuplogin',
    views: {
      'menuContent': {
        templateUrl: 'templates/steuplogin.html',
        controller:'LoginController'
      }
    }
  })
  .state('app.register_workshop', {
    url: '/register_workshop',
    views: {
      'menuContent': {
        templateUrl: 'templates/register_workshop.html',
        controller:'WorkshopRegisterController'

      }
    }
  })
  .state('app.login_number_validation', {
    url: '/login_number_validation',
    views: {
      'menuContent': {
        templateUrl: 'templates/login_number_validation.html',
        controller:'LoginNumberController'

      }
    }
  })
  .state('app.enter_otp', {
    url: '/enter_otp',
    views: {
      'menuContent': {
        templateUrl: 'templates/enter_otp.html'
      }
    }
  })
  .state('app.forgot_password', {
    url: '/forgot_password',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgot_password.html',
        controller:'ForgotPasswordController'
      }
    }
  })
  .state('app.my_classes', {
    url: '/my_classes',
    views: {
      'menuContent': {
        templateUrl: 'templates/my_classes.html',
        controller:'MyClassesController'

      }
    }
  })
  .state('app.session_history', {
    url: '/session_history/:id/:term',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_history.html',
        controller:'SessionHistory'
      }
    }
  })
  .state('app.student_report', {
    url: '/student_report/:id/:term',
    views: {
      'menuContent': {
        templateUrl: 'templates/student_report.html',
        controller:'StudentReport'
      }
    }
  })
  .state('app.honorarium', {
    url: '/honorarium',
    views: {
      'menuContent': {
        templateUrl: 'templates/honorarium.html',
        controller:'honararium'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.faq', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'templates/faq.html'
      }
    }
  })
  .state('app.my_nxtsession', {
      url: '/my_nxtsession',
      views: {
        'menuContent': {
          templateUrl: 'templates/my_nxtsession.html',
          controller: 'nextSession'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.popup5', {
      url: '/popup5',
      views: {
        'menuContent': {
          templateUrl: 'templates/popup5.html',
          controller:'SessionDetailsController'

        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stepuplogin');
});

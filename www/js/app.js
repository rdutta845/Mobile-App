// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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
        templateUrl: 'templates/volunteer_registration.html'
      }
    }
  })
  .state('app.workshop', {
    url: '/workshop',
    views: {
      'menuContent': {
        templateUrl: 'templates/workshop.html'
      }
    }
  })
  .state('app.teacher_schedule', {
    url: '/teacher_schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/teacher_schedule.html'
      }
    }
  })
  .state('app.session_details', {
    url: '/session_details',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details.html'
      }
    }
  })
  .state('app.session_details2', {
    url: '/session_details2',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details2.html'
      }
    }
  })
  .state('app.session_details3', {
    url: '/session_details3',
    views: {
      'menuContent': {
        templateUrl: 'templates/session_details3.html'
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
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
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
  $urlRouterProvider.otherwise('/app/volunteer_registration');
});

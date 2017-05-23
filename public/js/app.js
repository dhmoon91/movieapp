var app = angular.module('movieApp', ['angularUUID2','ngCookies','ngAnimate','ui.router','homeController','navigationController','createController','searchController', 'loginController','signupController'] );

app.config(function($stateProvider, $urlRouterProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url:'/home',
    // templateUrl: 'views/home.html',
    views: {
      'navigation': {
        templateUrl: 'views/navigation.html',
        controller: 'NavigationController'
      },
      '@': {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }
    }



  })
  .state ('home.search', {
    url:'search',
    views: {
      '@': {
        templateUrl: 'views/search.html',
        controller:'SearchController'
      }
    }
  })

  .state('home.create', {
    url:'create',
    views: {
      '@': {
        templateUrl: 'views/create.html',
        controller:'CreateController'
      }
    }

  })

  .state('home.login', {
    url:'login',
    views: {
      '@': {
        templateUrl: 'views/login.html',
        controller:'LoginController'
      }
    }

  })
  .state('home.signup', {
    url:'signup',
    views: {
      '@': {
        templateUrl: 'views/signup.html',
        controller:'SignupController'
      }
    }

  })


});

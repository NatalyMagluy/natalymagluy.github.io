'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/r/:param', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/r/:param?mode=:mode', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/r/:param?mode=:mode&after=:after&count=:count', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/r/:param?mode=:mode&before=:before&count=:count', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/r/:name/comments/:article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(reg) {
        console.log('ServiceWorker registered:', reg);
      }).catch(function(err) {
        console.log('Error registering ServiceWorker: ', err);
      });
  });

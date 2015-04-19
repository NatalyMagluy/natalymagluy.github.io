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
      .when('/list/:param', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/list/:param?after=:after&count=:count', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/list/:param?before=:before&count=:count', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/list/:name/comments/:article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

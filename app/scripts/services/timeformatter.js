'use strict';

/**
 * @ngdoc function
 * @name app.service:TimeFormatterService
 * @description
 * # TimeFormatterService
 * Service of the app
 */
angular.module('app')
  .factory('TimeFormatterService', function () {
    return {
      timeSince: function timeSince(date) {
        var seconds = Math.floor(((new Date().getTime()/1000) - date));

        var interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
          if(interval == 1) return interval + " year ago";
          else
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          if(interval == 1) return interval + " month ago";
          else
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          if(interval == 1) return interval + " day ago";
          else
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          if(interval == 1) return interval + " hour ago";
          else
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
          if(interval == 1) return interval + " minute ago";
          else
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
      }
    };
  });

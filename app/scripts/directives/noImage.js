'use strict';

angular.module('app').directive("noImage", function() {
  return {
    link: function(scope, element) {
      var noImage="images/No_Image.jpg";

      element[0].onerror = function() {
        element[0].src = noImage;
      };
    }
  };
});

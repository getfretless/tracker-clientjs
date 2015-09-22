import angular from 'angular';
import app from '../app';

angular.module('app')
.directive('trackerBody', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: `
      <div>
        Hello, world!
      </div>`
  };
});

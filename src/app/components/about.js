import app from '../app';

export default app.directive('about', function($router) {
  return {
    restrict: 'EA',
    replace: true,
    controller: function() {
      this.goHome = function() {
        $router.navigate('/')
      }
    },
    controllerAs: 'ctrl',
    scope: {},
    template: `
      <div>
        About Us
        <a ng-link="['/Home']">Home</a>
        <a ng-link="['/About']">About</a>
        <a href="#" ng-click="ctrl.goHome()">goHome</a>
        <a ng-link="['/Home', { param: 'Dave'}]">Go Home Dave</a>
      </div>`
  };
});

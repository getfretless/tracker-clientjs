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
      </div>`
  };
});

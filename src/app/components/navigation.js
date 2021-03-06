import app from '../app'

export default app.directive('navigation', function($router) {
  return {
    controller: function() {},
    controllerAs: 'ctrl',
    scope: {},
    template: `
      <nav>
        <a href="/">Home</a>
        <a ng-link="['/About']">About</a>
        <a ng-link="['/Home', { name: 'Dave' }]">Go Home Dave</a>
        <a ng-link="['/Login']">Log In</a>
      </nav>`
  }
})

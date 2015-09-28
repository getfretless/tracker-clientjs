import app from '../app'

class HelloWorldController {
  constructor($router) {
    var params = $router._currentInstruction && $router._currentInstruction.component.params;
    this.name = params.name || 'world'
  }
}
HelloWorldController.$inject = ['$router']

export default app.directive('helloWorld', () => {
  return {
    scope: {},
    controller: HelloWorldController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `Hello, {{ ctrl.name }}!`
  }
})

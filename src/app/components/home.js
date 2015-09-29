import app from '../app'

class HomeController {
  constructor($router) {
    let params = $router._currentInstruction && $router._currentInstruction.component.params;
    this.name = params.name || 'Boooooy!'
  }
}

export default app.directive('home', function($router) {
  return {
    scope: {},
    controller: HomeController,
    controllerAs: 'ctrl',
    template: `
      <div>
        HOME, {{ctrl.name}}
      </div>`
  };
});

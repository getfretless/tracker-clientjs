import app from '../app';

export default app.directive('home', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    template: `
      <div>
        HOME, BOOOOOOY!
      </div>`
  };
});

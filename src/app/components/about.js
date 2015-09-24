import app from '../app';

export default app.directive('about', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    template: `
      <div>
        About Us
      </div>`
  };
});

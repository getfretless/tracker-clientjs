import app from '../app'

class LoginController {
  authenticate() {
    console.log('AUTHENTICAAAAATE!')
  }
}

export default app.directive('login', () => {
  return {
    scope: {},
    controller: LoginController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <form ng-submit="ctrl.authenticate()">
        <fieldset>
          <label for="email">Email:</label>
          <input name="email">
        </fieldset>
        <fieldset>
          <label for="password">Password:</label>
          <input type="password" name="password">
        </fieldset>
        <button type="submit">Log In</button>
      </form>
    `
  }
})

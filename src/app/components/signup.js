import app from '../app'

class SignupController {
  signup() {
    console.log('SIGNUP NOW!')
  }
}

export default app.directive('signup', () => {
  return {
    scope: {},
    controller: SignupController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <form ng-submit="ctrl.signup()">
        <fieldset>
          <label for="name">Name:</label>
          <input name="name">
        </fieldset>
        <fieldset>
          <label for="email">Email:</label>
          <input name="email">
        </fieldset>
        <fieldset>
          <label for="password">Password:</label>
          <input type="password" name="password">
        </fieldset>
        <button type="submit">Sign up</button>
      </form>
    `
  }
})

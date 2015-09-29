import app from '../app'
import '../services/user-service'

class SignupController {
  constructor(UserService) {
    this.service = UserService
    this.formData = {}
  }
  signup() {
    this.service.create(this.formData)
  }
}
SignupController.$inject = ['UserService']

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
          <input name="name" ng-model="ctrl.formData.name">
        </fieldset>
        <fieldset>
          <label for="email">Email:</label>
          <input name="email" ng-model="ctrl.formData.email">
        </fieldset>
        <fieldset>
          <label for="password">Password:</label>
          <input type="password" name="password" ng-model="ctrl.formData.password">
        </fieldset>
        <button type="submit">Sign up</button>
      </form>
    `
  }
})

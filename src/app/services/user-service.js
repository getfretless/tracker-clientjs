import angular from 'angular'

class UserService {
  constructor() {}
  create() {
    console.log('CREATING!')
  }
  authenticate() {}
}

export default angular.module('app')
  .service('UserService', UserService)

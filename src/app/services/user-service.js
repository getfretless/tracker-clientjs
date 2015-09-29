import angular from 'angular'

class UserService {
  constructor($resource) {
    this.resource = $resource('http://localhost:3000/users/:id')
  }
  create(userData) {
    this.resource.save((response) => {
      console.log('CREATING!', response)
    })
  }
  authenticate() {}
}
UserService.$inject = ['$resource'];

export default angular.module('app')
  .service('UserService', UserService)

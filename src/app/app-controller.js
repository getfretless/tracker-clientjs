import app from './app'
import home from './components/home'
import about from './components/about'

app.controller('AppController', function($router) {
  $router.config([
    { path: '/', component: 'home' },
    { path: '/about', component: 'about' }
  ])
})

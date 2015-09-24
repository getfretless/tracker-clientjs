import app from './app'
import home from './components/home'
import about from './components/about'

app.controller('AppController', function($router) {
  $router.config([
    { path: '/', component: 'home', as: 'Home' },
    { path: '/about', component: 'about', as: 'About' }
  ])
})

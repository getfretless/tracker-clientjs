import app from './app'
import './components/navigation'
import './components/home'
import './components/about'

app.controller('AppController', function($router) {
  $router.config([
    { path: '/:name', component: 'home', as: 'Home' },
    { path: '/about', component: 'about', as: 'About' }
  ])
})

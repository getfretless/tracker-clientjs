import app from './app'
import routes from './routes'
import './components/navigation'
import './components/home'
import './components/about'

app.controller('AppController', function($router) {
  $router.config(routes)
})

import app from './app'
import routes from './routes'
import './components/navigation'
import './components/home'
import './components/about'
import './components/hello-world'
import './components/login'

app.controller('AppController', function($router) {
  $router.config(routes)
})

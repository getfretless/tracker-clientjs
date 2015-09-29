export default [
  { path: '/:name', component: 'home', as: 'Home' },
  { path: '/about', component: 'about', as: 'About' },
  { path: '/hello/:name', component: 'helloWorld' },
  { path: '/login', component: 'login', as: 'Login' }
]

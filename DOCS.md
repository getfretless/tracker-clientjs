### Why should I write a new app or keep my app on Angular 1.x?

* Angular 1.x has a huge base of knowledge, library code, documentation and knowledgable practitioners today.
  - Angular 2.x is still very much in a state of change. If you write an Angular 2 app today, it may work, but if you encounter a bug that has been fixed in a new commit, you may have to tweak or rewrite whole parts of your app (for instance the routing API is still changing, and that could have far-reaching effects in a large app).
* 1.x isn't going away the instant 2.x is released. There are far too many people using it today and the upgrade will be a long, hard road for those with particularly large apps or ones with dependent on angular-specific plugins and modules.
  - The dramatic shift for 2.0 will simply be too much for many teams. Angular 2.x isn't so much a new version, as it is a whole new framework born as a reimagining of what Angular 1 is that is inspired by what is happening in React and other WebComponent-based frameworks.
* Angular 1.5.0-beta.0 framework size minified: 147kb vs Angular 2 minified: 564kb
  - Maybe not so much of a problem for web/mobile apps or browser plugins, where a first-time hit is acceptable, but could be a dealbreaker on sites that must load quickly to new visitors
* You don't necessarily need to upgrade to get the benefits of a component-based architecture (or one-way data flow).
  - In fact, going with a component-based architecture in Angular 1 vastly reduces the things you need to learn/use/debug. Learn to to use directives, binding, routing, and services and you should know enough to be productive.
* It has been stated that there will be a reliable upgrade path (allowing for you too load both Angular 1 and 2 in the same app, and port things over little by little). This should land in 1.5 final, which could be any day now, or may be delayed to the same time as Angular 2.

### Why should I write a new app or port my existing app to Angular 2 today instead of sticking with Angular 1.x?

* Angular 1.x in general is a pretty confusing framework, at least in comparison to 2.x.
  - As someone that tries to pick up and learn new technologies frequently, there is an awful lot to learn in Angular 1 to be fully productive with it. It's Google parentage and enterprise popularity, means that all kinds of Java-isms (not JavaScript) are in the framework, which kind of feel out of place (IMO).
* TypeScript (or ES6/ES2015/ESNext). This isn't a requirement to write Angular 2 applications (and you can write 1.x apps in them, too), but why do things the hard way and go against the grain of the framework? It'll be harder to find help and support if you are writing your Angular 2 apps in ES5, and you'll have a lot of extra boilerplate code to do things like annotations. Take advantage of the fact that the compiler can output ES5 (or ES3) compatible JavaScript and use all the cool new stuff today like classes, multiline strings, interpolation, type checking, native promises, etc...
* Angular 2.x is very close to release (estimated late 2015...maybe Christmas??), it seems at this point that things are settling and that it will be much less effort to upgrade to the final when it is released, than to start and Angular 1.x app and attempt to upgrade, especially if you don't depend on a lot of 3rd-party modules that haven't yet been ported or replaced with A2 equivalents.
* Because you can build and vendor JavaScript with your app, if you can get everything working, it'll work forever as is.

## Misc resources on deciding between Angular 1 and 2 today:
[Codelord.net: Angular 2 Migration Path: What We Know](http://www.codelord.net/2015/09/10/angular-2-migration-path-what-we-know/)
[Angular blog: Angular 1 and Angular 2 integration: the path to seamless upgrade](http://angularjs.blogspot.com/2015/08/angular-1-and-angular-2-coexistence.html)
[Angular blog: Angular 2 Survey Results](http://angularjs.blogspot.com/2015/09/angular-2-survey-results.html)

## Misc resources on component-based architecture in Angular 1 apps:
[Rangle.io: Creating Angular 2 Style Components Using Angular 1 (Part I)](http://blog.rangle.io/angular2-components/) - Sep 2, 2015
[Airpair.com: Component-Based AngularJS Directives](https://www.airpair.com/angularjs/posts/component-based-angularjs-directives) - Dec 12, 2014
[WeCodeTheWeb: Why you should ditch Angular controllers for directives](http://wecodetheweb.com/2015/07/18/why-you-should-ditch-angular-controllers-for-directives/) - July 18, 2015
[Adrianperez.com: Componentized ES6 app development highlights for Angular 1 and Redux](https://adrianperez.org/a-componentized-es6-directory-structure-for-angular-1-and-redux-projects/) - Sep 24, 2015


# Tracker - A kanban-style project tracker

First, let's setup a minimal structure for our app, and a simple component directive to make sure it works:
```sh
mkdir -p tracker/src/app/components
cd tracker
touch src/index.html src/app/app.js
npm init
npm install --save-dev angular@1.5.0-beta.0
```

__app/index.html__
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tracker</title>
    <script src="/node_modules/angular/angular.js"></script>
    <script src="/app/app.js"></script>
  </head>
  <body ng-app="app">
    <hello-world></hello-world>
  </body>
</html>
```

__app/app.js__
```js
angular.module('app', [])
.directive('helloWorld', function() {
  return {
    template: 'Hello, World!'
  }
})
```

    git init .
    git commit -m "Basic Angular 1.5.0-beta.0 app"

## Build setup

Now that we have things working, we know we want to use ES6 (or TypeScript) features in this app, source bundling, and explicit requires, and we probably will also want some grunt tasks.
Here's a decent setup we like (but of course are constantly tweaking).

Let's start out with [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.github.io/).
We could do everything with Gulp and plugins (like babeljs), but webpack has a few awesome features, like super-fast builds that can really add up in larger apps. It's dev-server by default builds in-memory, and has a strict dependency management system, and code splitting features, so you can asynchronously load lesser-used chunks of your javascript after the main ones load, for a better experience in low-bandwith environments. It also provides ES6 and node-style `import` and `require` (similar to Browserify, if you've used that), which browsers don't have natively. In short, it lets us write web apps like we would write a modern [NodeJS](https://nodejs.org/en/) app.

```sh
npm --save-dev gulp webpack webpack-dev-server babel-core babel-loader
touch webpack.config.js gulpfile.js
```

We'll setup Webpack to first require our `all.js`, which will load all dependencies from there. This is our "entry point", and after it bundles everything together, it will spit out it's processed files as `dist/all.js` and `dist/all.js.map` (the sourcemap, since we are compiling, our browser can help us debug our ES6, instead of the compiled ES5 code). We'll use a module loader plugin to transform all JS files with Babel before bundling to all.js

__webpack.config.js__
```js
module.exports = {
  entry: "./src/app/app-controller.js",
  devtool: 'source-map',
  output: {
    path: __dirname + "/dist",
    filename: "all.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
```

With Gulp, we'll let it copy over `index.html` to the dist directory, too, and kickoff the webserver and compile tasks to Webpack:

__gulpfile.js__
```js
var gulp = require("gulp");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task('start-webserver', function() {
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: __dirname + '/dist'
  }).listen(8080, "localhost");
});

gulp.task("compile-app", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    callback();
  });
});

gulp.task("copy-files", function() {
  var files = [
    'src/index.html'
  ];
  gulp.src(files)
    .pipe(gulp.dest("dist"));
});

gulp.task('watch-static', function() {
  gulp.watch("src/*.html", ["copy-files"]);
});

gulp.task("default", ["copy-files", "compile-app", "start-webserver", "watch-static"]);
```

For the finishing touch, let's make it so "npm start" rns our default gulp task:

__package.json__
```js
"scripts": {
  "start": "gulp",
```

Now point the script tag in `index.html` to `app.js` (since it will be copied to, and served from `dist`), remove the one that loads angular, and set up our import for that in app.js

__app/index.html__
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tracker</title>
    <script src="/all.js"></script>
  </head>
  <body ng-app="app">
    <hello-world></hello-world>
  </body>
</html>
```

__app/app.js__
```js
import angular from 'angular'
export default angular.module('app', [])
.directive('helloWorld', function() {
  return {
    template: 'Hello, World!'
  }
})
```

Now, if things are working, `angular` is no longer a window global, and is loaded by it's npm name (if it is in your package.json), and there is an explicit dependency declared. Let's commit.

## Routing

Most apps need a bunch of pages (or screens), how will we route to components for different pages or parts of the app?

We could create new HTML files for the pages, and use actual server routing and directory traversal to achieve this, but in most Angular applications, we'll use a router and define some routes. You can use the router pretty much like normal if you want, by routing to a template that has the components you need, but a better approach is to create a parent component for each of your route endpoints. Using [ui-router](https://github.com/angular-ui/ui-router), we could setup our routes like this (if we have a `login` component):

```js
$stateProvider
  .state('login', {
    url: '/login',
    template: '<login></login>'
  })
```

But let's first talk a little about the state of routing as it relates to upgrading to Angular 2 first.

Routing is a hot topic right now. It was advised earlier this year at ngConf that [angular-new-router (ngNewRouter)](http://github.com/angular/router) would be a path forward to use in Angular 1 apps today that would be easily upgradable when switching to Angular 2, but Angular 2's development has moved too much since then, and the syntax has changed significantly, and the project has been abandoned and pulled into the Angular 2 codebase as the angular_1_router. Those that adopted this early are feeling a little bit burned right now.

This new project aims to keep parity with Angular 2's router and link-handling syntax, however, you can't (right now anyway) keep your routes along with your components in an Angular 1 application, like you can in Angular 2, so the routes must go under a top-level ApplicationController. I know we said we don't want any more controllers in our code, but this one is pretty much here for backwards-compatibility reasons. After we set it up, let's pretend it doesn't exist, and still keep our code in the components themselves or services/factories.

The only way to get a reasonbly current version of this is to build Angular 2 from source ([which is a pretty involved process itself](https://github.com/angular/angular/blob/master/DEVELOPER.md)), or you can download it from [here](https://gist.github.com/unixmonkey/2aca23eb45d80d10e580) (I built this on Thursday). You can see a very basic app I built using it [here](http://plnkr.co/edit/xwSREH?p=info)

Let's download and vendor `angular_1_router.js` in our app:

    mkdir vendor
    curl -O https://gist.githubusercontent.com/unixmonkey/2aca23eb45d80d10e580/raw/fb7cd13a8fb16fa5804d754a84e912a4cea3075d/angular_1_router.js angular_1_router.js

and set it up by importing and adding the dependency for `ngComponentRouter` and creating a controller to manage it:

__src/app/app.js__
```js
import angular from 'angular'
import '../../vendor/angular_1_router.js'

export default angular.module('app', ['ngComponentRouter'])
```

__src/app/app_controller.js__
```js
import app from './app'
import './components/home'

app.controller('AppController', function($router) {
  $router.config([
    { path: '/', component: 'hello-world' }
  ])
})
```

__app/index.html__
```html
<body ng-app="app" ng-controller="AppController"> <!-- added ng-controller here -->
  <ng-outlet></ng-outlet>
</body>
```

When Angular recognizes a route change, it on-the-fly generates a new component directive to replace the `<ng-outlet>` component directive with the one being routed to. There are some examples in the `angular_1_router` source, as well as in the tree [here on Github](https://github.com/angular/angular/tree/master/modules/angular1_router).

### Routing components

Let's add another component so we can check out how to route from one component to another. To complement our 'helloWorld' component, let's make a `goodbyeWorld` one:

__app/components/goodbye-world.js__
```js
import app from '../app'
app.directive('goodbyeWorld', function() {
  return {
    template: 'Goodbye, world!'
  }
})
```

__app/app.js__
```js
$router.config([
  { path: '/', component: 'hello-world', as: 'Hello' },
  { path: '/goodbye', component: 'goodbye-world', as: 'Goodbye' }
]);
```

And add some links so we can switch between them:

```html
<a ng-link="['/Hello']">Hello</a><br>
<a ng-link="['/Goodbye']">Goodbye</a><br>
Message: <ng-outlet></ng-outlet>
```

Note the `as:` key I added in the routes, and how that relates to the syntax of the `ng-link` attributes. At this time, that is required when using strings with the `component:` key (if you want to link to them by alias), and it must start with a capital letter (convention in Angular 2).

The `ng-link` syntax is pretty wierd, eh? We are here passing an array with a string for the alias, but we can also include params (sort of like ui-router) like this:

```html
<a ng-link="['/Hello', { name: 'Dave' }]">Hello Dave</a>
```

And use those as part of the route like so:

```js
{ path: '/hello/:name', component: 'hello-world', as: 'Hello' }
```

You should now see that the "Hello Dave" link links to the route `/hello/Dave`, which still loads the correct component.


### Getting params

What if we had links for different people:

```html
<a ng-link="['/Hello', { name: 'Dave' }]">Hello Dave</a>
<a ng-link="['/Hello', { name: 'Dave 2' }]">Hello Dave 2</a>
<a ng-link="['/Hello', { name: 'Gavin' }]">Hello Gavin</a>
```

And we wanted to display that parameter in our component?

First, we'll need to inject the `$router` dependency (that comes from `ngComponentRouter`) into our components, and give them a component-local controller:

__app/components/hello-world.js__
```js
import app from '../app'
app.directive('helloWorld', function($router) {
  return {
    scope: {},
    controller: function($router) {
      var params = $router._currentInstruction && $router._currentInstruction.component.params;
      this.name = params.name || 'world'
    },
    controllerAs: 'ctrl',
    template: 'Hello, {{ ctrl.name }}!'
  }
})
```

Now, when we click a name, we should see the component loaded with the name param.

You probably noticed that the syntax for getting the params from the router is pretty gross. That's due to the `angular_1_router` being brand new and not having all the kinks worked out. From the documentation in the source, it seems like you should be able to get at this by injecting `$routeParams` and calling `$routeParams.name` in the near future. I can live with it for now, but you could wrap this in a factory or utility function elsewhere in the app until then.

Hey! Since we are using ES6 syntax here, we can do a little to make the code a bit nicer, and a little more like Angular 2 by creating classes. This is a good idea anyway, because then we can take advantage of the class constructor for setting up properties, and having them immediately available when the template renders with the `bindToController` option on the directive. Here's what that might look like:

```js
import app from '../app'

class HelloWorldController {
  constructor($router) {
    let params = $router._currentInstruction && $router._currentInstruction.component.params;
    this.name = params.name || 'world'
  }
}
HelloWorldController.$inject = ['$router']

export default app.directive('helloWorld', () => {
  return {
    scope: {},
    controller: HelloWorldController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `Hello, {{ ctrl.name }}!`
  }
})
```

## I thought this was a task tracking app?

Ok. That was to show off the routing. Let's get back to the meat of the application.

Let's add a route and top-level directive for logging in. Create a basic component directive:

__app/components/login.js__
```js
import app from '../app'

export default app.directive('login', () => {
  return {
    template: `Log in please`
  }
})
```

Require it from our `AppController` entry point, so Webpack will add it to our bundle (all.js):

__app/app-controller.js__
```js
import './components/login'
```

And add a route for it. Well give the route object an `as` property, so we can link to this later.

__app/routes.js__
```js
{ path: '/login', component: 'login', as: 'Login' }
```

If you like, you can add a link to it to `navigation.js`:

__app/components/navigation.js__
```html
<a ng-link="['/Login']">Log In</a>
```

Let's make a form to login:
__app/components/login.js__
```html
<form ng-submit="ctrl.authenticate()">
  <fieldset>
    <label for="email">Email:</label>
    <input name="email">
  </fieldset>
  <fieldset>
    <label for="password">Password:</label>
    <input type="password" name="password">
  </fieldset>
  <button type="submit">Log In</button>
</form>
```

Now, our form looks reasonable (but ugly), but because we need to handle the submit...Anytime you need anything more than a plain template string...we know we need to add all the controller boilerplate to this directive.

__app/components/login.js__
```js
import app from '../app'

class LoginController {
  authenticate() {
    console.log('AUTHENTICAAAAATE!')
  }
}

export default app.directive('login', () => {
  return {
    scope: {},
    controller: LoginController,
    controllerAs: 'ctrl',
    bindToController: true,
    template: `
      <form ng-submit="ctrl.authenticate()">
        <fieldset>
          <label for="email">Email:</label>
          <input name="email">
        </fieldset>
        <fieldset>
          <label for="password">Password:</label>
          <input type="password" name="password">
        </fieldset>
        <button type="submit">Log In</button>
      </form>
    `
  }
})
```

And do the same thing for signing up (create and setup a `signup` component directive):

__app/components/signup.js__
```js
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
```

Ok, now when we submit the form to sign-up, we'd like to communicate with the API backend to create a user for us and give a key or token we can use as an authenticated user. To me, that sounds like it calls for a *service*!

Create a new directory named `app/services`, and let's make a new file named `user-service.js`.

It seems to me, that we'll want to be able to call `UserService.create()` and `UserService.authenticate()`, so let's add some placeholder functions to fill in as we work through this.

__app/services/user-service.js__
```js
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
```

Let's start with `create`, since we don't even have a user in the system yet. I've added a `console.log` to verify once we've got everything hooked up correctly.

Where do we need this service? In the `signup` directive. Let's add an import for that there, and dependency-inject it into `SignupController`:

__app/components/signup.js__
```js
import app from '../app'
import '../services/user-service'

class SignupController {
  constructor(UserService) {
    this.service = UserService
  }
  signup() {
    this.service.create()
  }
}
SignupController.$inject = ['UserService']
// ...
```

Now, when we submit the form, it calls `UserService.create()`, which emits our `console.log`. Whee!

Let's actually send the form data up.

Start by initializing the controller with an empty object to bind to the form elements with `ng-model`, and adding those ng-model attributes (directives) to the inputs:

__app/components/signup.js__
```js
//...
class SignupController {
  constructor(UserService) {
    this.service = UserService
    this.formData = {}
  }
  signup() {
    this.service.create(this.formData)
  }
}
//...
<input name="name" ng-model="ctrl.formData.name">
<input name="email" ng-model="ctrl.formData.email">
<input type="password" name="password" ng-model="ctrl.formData.password">
//...
```

Now, when the form submits, the current values of the form are wrapped up in a handy little object and passed to the service, so it can talk to our API.

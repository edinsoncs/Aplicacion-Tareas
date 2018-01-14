app.config(function($routeProvider) {
  
  $routeProvider.when('/',   {
		templateUrl: 'views/home.html',
		reloadOnSearch: false,
		controller: 'homeApp'
  });

  $routeProvider.when('/ingresar',  {
  		templateUrl: 'views/ingresar.html',
  		reloadOnSearch: false,
  		controller: 'ingresarController'
  		
  });

  $routeProvider.when('/profile',  {
  		templateUrl: 'views/profile.html',
  		reloadOnSearch: false,
  		controller 	: 'profilecontroller'
  });

  $routeProvider.when('/category',  {
  		templateUrl: 'views/category.html',
  		reloadOnSearch: false
  });

  $routeProvider.when('/preguntas',  {
  		templateUrl: 'views/preguntas.html',
  		reloadOnSearch: false,
  		controller: 'preguntasController'
  });

  $routeProvider.when('/preguntas/:id',  {
  		templateUrl: 'views/preguntascategory.html',
  		reloadOnSearch: false,
  		controller: 'pController'
  });

  $routeProvider.when('/publicar', {
  		templateUrl: 'views/publicar.html',
  		reloadOnSearch: false,
  		controller: 'publicarController'
  });

  $routeProvider.when('/registrar',  {
  		templateUrl: 'views/registrar.html',
  		reloadOnSearch: false,
  		controller: 'registerController'
  });

  $routeProvider.when('/view/:id',  {
  		templateUrl: 'views/view.html',
  		reloadOnSearch: false,
  		controller: 'viewController'
  });


  $routeProvider.otherwise({
			redirectTo: '/'	});
});
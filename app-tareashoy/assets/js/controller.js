app.controller('webapp', function($scope, $location, $http, $rootScope){
	
	$rootScope.salir = function () {

		  var con = confirm('Seguro que desea salir?');

			if(con) {
				localStorage.clear();
				$location.path('/');
			} else {

			}
			

    }

});

app.controller('homeApp', function($scope, $location, $http){

	var cnx = navigator.onLine;

	if(cnx) {
		$scope.data = "Necesitas ayuda en alguna tarea de la escuela o colegio, nosotros te ayudamos con nuestra comunidad activa de alumnos, profesores y moderadores";
		if(localStorage.getItem('id')) {
			$location.path('/preguntas');
		}
	} else {

		if(localStorage.getItem('id')) {
			$location.path('/publicar');
		}

		$scope.data = "Esta aplicación tiene dos funcionamientos, con conexión a internet te ayudamos en tus tareas y sin conexión guardamos tus tareas de tu escuela o colegio";
	}



});

app.controller("profilecontroller", function ($scope, $rootScope, $location, $http) {
	
	$scope.show = true;
	$scope.active = 'active';

	$scope.name = localStorage.getItem('nombre');

	var cnx = navigator.onLine;

	if(cnx) {
		$scope.online = true;
		$scope.offline = false;

		$http({
					method: 'POST',
					url: 'http://45.55.176.222/user/id/',
					data: JSON.stringify({
						id: localStorage.getItem('id')
					})
		}).then(function success(res){

				console.log(res.data);

				localStorage.setItem('respuestas', JSON.stringify(res.data.respuestas));
				localStorage.setItem('preguntas', JSON.stringify(res.data.preguntas));

				$scope.mypre = JSON.parse(localStorage.getItem('preguntas'));
				$scope.myres = JSON.parse(localStorage.getItem('respuestas'));


		}, function err(err){
					console.log(err);
		});


		$scope.tabs = function(data){

			if(data == 1)  {
				$scope.show2 = false;
				$scope.show = true;
				$scope.active = 'active';
				$scope.active2 = '';
			} else {
				$scope.show2 = true;
				$scope.show = false;
				$scope.active = '';
				$scope.active2 = 'active';
			}
		}

	} else {

		$scope.online = false;
		$scope.offline = true;


		//localStorage.setItem('preguntas', JSON.stringify(res.data.preguntas));

		$scope.mypre = JSON.parse(localStorage.getItem('tareas'));
		$scope.myres = JSON.parse(localStorage.getItem('tareas'));

		$scope.tabs = function(data){

			if(data == 1)  {
				$scope.show2 = false;
				$scope.show = true;
				$scope.active = 'active';
				$scope.active2 = '';
			} else {
				$scope.show2 = true;
				$scope.show = false;
				$scope.active = '';
				$scope.active2 = 'active';
			}
		}

		$scope.remove = function($event) {
			$event.preventDefault();
			localStorage.removeItem('tareas');
			return $location.path("/publicar");

		}


	}




});

app.controller("registerController", function($scope, $http, $location, $timeout){

	$scope.form1 = false;
	$scope.form1text = 'Verificando el registro...';
	$scope.form2 = true;

	var cnx = navigator.onLine;

	if(cnx) {

		$scope.form = function($event) {
			$event.preventDefault();

			var validate = {a: false, b: false};
			
			if(validateEmail($scope.dato.email)) {
				 validate.a = true;
			} else {
				alert('El email es invalido');
			}

			if($scope.dato.password == $scope.dato.password2) {
				 validate.b = true;
			} else {
				alert('Las contraseñas no coinciden');
			}

			if(validate.a && validate.b) {
				
				$http({
					method: 'POST',
					url: 'http://45.55.176.222/user/create',
					data: JSON.stringify({
						nombre: $scope.dato.nombre,
						email: $scope.dato.email,
						password: $scope.dato.password
					})
				}).then(function success(res){

						if(res.data.mystatus) {

							$scope.form1 = true;
							$scope.form2 = false;

							localStorage.setItem("id", res.data.obj.insertId);
							localStorage.setItem("email", $scope.dato.email);
							localStorage.setItem("nombre", $scope.dato.nombre);
							localStorage.setItem("password", $scope.dato.password);

							$timeout(function(){
								$scope.form1text = res.data.data;
								$timeout(function(){
									return $location.path("/publicar");
								}, 2000)
							}, 1000);
								


						} else {
							alert(res.data.data);
						}

				}, function err(err){
						console.log(err);
				});

			} 
			

		}

	} else {

		if(localStorage.getItem('id')) {
			$location.path('/publicar');
		}

		$scope.form = function($event) {

			$event.preventDefault();

			var validate = {a: false, b: false};
			
			if(validateEmail($scope.dato.email)) {
				 validate.a = true;
			} else {
				alert('El email es invalido');
			}

			if($scope.dato.password == $scope.dato.password2) {
				 validate.b = true;
			} else {
				alert('Las contraseñas no coinciden');
			}

			if(validate.a && validate.b) {

					$scope.form1 = true;
					$scope.form2 = false;

					localStorage.setItem("id", guid());
					localStorage.setItem("email", $scope.dato.email);
					localStorage.setItem("nombre", $scope.dato.nombre);
					localStorage.setItem("password", $scope.dato.password);

					$timeout(function(){
						$scope.form1text = 'Su cuenta offline fue creado correctamente';
						$timeout(function(){
							return $location.path("/publicar");
							}, 2000)
					}, 1000);

			} 

		}

	}

});



app.controller("publicarController", function($scope, $http, $location){

	var nombre = localStorage.getItem("nombre");
	var email = localStorage.getItem("email");
	var password = localStorage.getItem("password");

	var tareasArr = [];

	$scope.name = nombre;

	var cnx = navigator.onLine;

	if(cnx) {

		$scope.datacontinue = "pregunta tu tarea aqui";
	
		$scope.enviar = function($e){
			$e.preventDefault();

			var n = ($scope.details) ? $scope.details.length : false; 

			if(n) {

					if(n < 7) {
						alert('Escriba mayor información');
					} else {

							$http({
								method: 'POST',
								url: 'http://45.55.176.222/user/createtareas',
								data: JSON.stringify({
									description: $scope.details,
									userid: localStorage.getItem('id'),
									categoryid: $scope.category
								})
							}).then(function success(data) {

								return $location.path("/view/"+data.data.obj.insertId+"");

							}, function error(err){

							});

					}

			} else {
				alert('Escriba su tarea');
			}

			//

		}

	} else {

		$scope.datacontinue = "que tarea guardaras hoy?";

		$scope.enviar = function($e){
			$e.preventDefault();

			var n = ($scope.details) ? $scope.details.length : false; 

			if(n) {

					if(n < 7) {
						alert('Escriba mayor información');
					} else {
							
								// Loading
						    var tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
						    
						    console.log("# of tareas: " + tareas.length);
						    
						    tareas.forEach(function(user, index) {
						        console.log("[" + index + "]: " + user.id);
						    });

						    // Modifying
						    var id = uuidv4();

								var obj = {'id': id, 
															 'detalle': $scope.details, 
															 'userid': localStorage.getItem('id'), 
															 'categoryid': $scope.category};
						    tareas.push(obj);
						    console.log("Added user #" + obj.id);

						    // Saving
						    localStorage.setItem("tareas", JSON.stringify(tareas));

							  /*if(localStorage.getItem('tareas')) {

							  		users = JSON.parse(localStorage.getItem("tareas") || "[]");

							  		 var id = uuidv4();

									   var obj = {'id': id, 
															 'detalle': $scope.details, 
															 'userid': localStorage.getItem('id'), 
															 'categoryid': $scope.category}
															 ;

							  		 users.push(obj);				  		

							  } else {

									  var id = uuidv4();

									  var obj = {'id': id, 
															 'detalle': $scope.details, 
															 'userid': localStorage.getItem('id'), 
															 'categoryid': $scope.category}
															 ;

									  	setObj('tareas', obj)

									 	function setObj(key, obj) {
											return localStorage.setItem(key, JSON.stringify([obj]));
										}

								}*/

									
							

							return $location.path("/view/" + id);

					}

			} else {
				alert('Escriba su tarea');
			}

			//

		}

	}


});

app.controller("viewController", function($scope, $http, $location, $routeParams) {


	var cnx = navigator.onLine;

	if(cnx) {

		$scope.conexion = true;
		$scope.offline = false;

		$http({
			method: 'GET',
			url: 'http://45.55.176.222/user/findtarea/' + $routeParams.id,
		}).then(function sucess(data){

				$scope.user = data.data.user;
				$scope.tarea = data.data.tarea;
				$scope.res = data.data.res;

		}, function error(err){

		});


		$scope.respuesta = function($event) {
			$event.preventDefault();

			var v = ($scope.description) ? $scope.description.length : false;

			if(v) {

				if($scope.description.length < 5) {
					alert('Escribe mas en tu respuesta');
				} else {


						$http({
								method: 'POST',
								url: 'http://45.55.176.222/user/restarea/' + $routeParams.id ,
								data: JSON.stringify({
									description: $scope.description,
									tareaid: $routeParams.id,
									userid: localStorage.getItem('id')
								})
							}).then(function success(data) {

								window.location.reload();

								//return $location.path("/view/"+data.data.obj.insertId+"");

							}, function error(err){

							});

				}

			} else {
				alert('Escribe tu respuesta');
			}

		}

	} else {

			$scope.conexion = false;
			$scope.offline = true;

			var arr = JSON.parse(localStorage.getItem('tareas'));

			for(var i = 0; i < arr.length; i++) {

				if(arr[i].id == $routeParams.id) {

					$scope.user = localStorage.getItem('nombre');
					$scope.tarea = arr[i].detalle;
					

				}

			} 



	}


});

app.controller("preguntasController", function($scope, $http, $location){

	var cnx = navigator.onLine;

	if(cnx) {

			$scope.conexion = true;
			$scope.offline = false;

			$http({
					method: 'GET',
					url: 'http://45.55.176.222/user/alltareas/',
					}).then(function success(data) {

						localStorage.setItem('alltareas', JSON.stringify(data.data.tareas));

						$scope.tareasall = JSON.parse(localStorage.getItem('alltareas'));

						//window.location.reload();
						//return $location.path("/view/"+data.data.obj.insertId+"");

					}, function error(err){

					});

	} else {
		$scope.conexion = false;
		$scope.offline = true;
		$scope.name = localStorage.getItem('nombre');
		$scope.tareasall = JSON.parse(localStorage.getItem('tareas'));

	}

});


app.controller("pController", function($scope, $location, $http, $routeParams){

	var cnx = navigator.onLine;

	if(cnx) {

		$scope.online = true;
		$scope.offline = false;

		$http({
				method: 'GET',
				url: 'http://45.55.176.222/user/category/' + $routeParams.id,
				}).then(function success(data) {

					if(data.data.length > 0) {
							$scope.tareasall = data.data;
					} else {
						$scope.not = true;
					}

				}, function error(err){

				});

	} else {

		$scope.online = false;
		$scope.offline = true;

		var tareas = JSON.parse(localStorage.getItem('tareas'));

		for(var i = 0; i < tareas.length; i++) {

			var isid = tareas[i]["categoryid"];

			if(isid === $routeParams.id) {
					$scope.name = localStorage.getItem('nombre');
					$scope.tareasall = tareas;

			} else {
				$scope.not = true;
			}

		}

		

	}

});


app.controller("ingresarController", function($scope, $location, $http){


	var cnx = navigator.onLine;

	if(cnx) {

		$scope.login = function($event) {
			$event.preventDefault();

			if($scope.email && $scope.password) {

					$http({
						method: 'POST',
						url: 'http://45.55.176.222/user/login',
						data: JSON.stringify({
							email: $scope.email,
							password: $scope.password
						})
					}).then(function success(data){


							if(data.data.user) {

								localStorage.setItem("id", data.data.user[0].id);
								localStorage.setItem("email", data.data.user[0].email);
								localStorage.setItem("nombre", data.data.user[0].nombre);
								localStorage.setItem("password", data.data.user[0].password);

								$location.path('/publicar');

							} else {
									alert('Este usuario no existe');
							}


					});

				} else {
					alert('Complete ambos campos');
				}

		}

	} else {

		if(localStorage.getItem('id')) {
			$location.path('/publicar');
		}

		$scope.login = function($event) {

			$event.preventDefault();

			if($scope.email && $scope.password) {

				var email = localStorage.getItem('emailOffline');
				var pass = localStorage.getItem('passOffline');

				if(!email || !pass ) {
					var c = confirm('Acepta a para crear cuenta');

					if(c) {
						return $location.path('/registrar');
					} 
				} else {
					return $location.path('/publicar');
				}

			} else {
				alert('Complete ambos campos');
			}

		}
	}


	


	


});
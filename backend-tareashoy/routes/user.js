'use strict';

const express = require('express');
const r = express.Router();

let db = require('../config/database');

r.get('/', (req, res, next) => {
	res.write('Hola Api');
	res.end();
});

r.post('/create', (req, res, next) => {	

	db.query("SELECT * FROM users WHERE email='"+req.body.email+"' AND password='"+req.body.password+"' ", 

	(err, result) => {


		if(result.length > 0) {
			res.json({data: 'Ya existe un usuario', mystatus: 0});
			
		} else {

			var d = new Date();
			var sql = ("INSERT INTO users (nombre, email, password, create_At) VALUES ('"+req.body.nombre+"', '"+req.body.email+"', '"+req.body.password+"', '"+ d +"')");
			db.query(sql, (err, data) => {
				if(err) return err;

				res.json({data: 'Su cuenta fue creado exitosamente', mystatus: 1, obj: data});
				
				

			});

		}

		

	});

	


});

r.post('/login', (req, res, next) => {
	

	db.query("SELECT * FROM users WHERE email='"+req.body.email+"' AND password='"+req.body.password+"' ", 

	(err, result) => {
		if(result.length > 0) {
			res.json({data: 'Bienvenido nuevamente a tareashoy', user: result});
			
			
		} else {
			res.json({data: 'Su cuenta fue creado exitosamente'});
			
		}


	});

	


});


r.post('/createtareas', (req, res, next) => {
	var d = new Date();
	var sql = ("INSERT INTO tareas (description, userid, categoryid, create_At) VALUES ('"+req.body.description+"', '"+req.body.userid+"', '"+req.body.categoryid+"', '"+ d +"')");

	db.query(sql, (err, data) => {
		
		if(err) return err;
		res.json({data: 'Se publico una nueva tarea', obj: data});
		
		
	});


});


r.get('/findtarea/:id', (req, res, next) => {


	if(req.params.id){

		db.query("SELECT * FROM tareas WHERE id='"+req.params.id+"' ", 

		(err, result) => {
			
			if(result) {

				var id = (result[0]) ? result[0].userid : false;

				if(id) {

					db.query("SELECT * FROM users WHERE id='"+result[0].userid+"'", 

					(err, data) => {

						db.query("SELECT * FROM respuestas WHERE tareaid='"+req.params.id+"' ",
						(err, respuestas) => {

							res.json({tarea: result, user: data, res: respuestas});

						});

					});

				}

			}

			

		});

		
	}	



});


r.post('/id', (req, res, next) => {

	db.query("SELECT * FROM respuestas WHERE userid='"+req.body.id+"' ", 

	(err, result) => {

		db.query("SELECT * FROM tareas WHERE userid='"+req.body.id+"' ", 

		(xhr, data) => {

			res.json({respuestas: result, preguntas: data});

			
			

		});

		

	});


	

});

r.post('/restarea/:id', (req, res, next) => {



	var sql = ("INSERT INTO respuestas (description, tareaid, userid) VALUES ('"+req.body.description+"', '"+req.body.tareaid+"', '"+req.body.userid+"')");
	db.query(sql, (err, data) => {
		
		if(err) return err;

		res.json({data: 'Se creo su respuesta correctamente', mystatus: 1, obj: data});
		
		
	});

	


});

r.get('/category/:id', (req, res, next) => {


	db.query("SELECT * FROM tareas WHERE categoryid='"+req.params.id+"'", 

		(err, data) => {

			res.json(data);

			

	});



});

r.get('/alltareas', (req, res, next) => {


	db.query("SELECT * FROM tareas", 

		(xhr, data) => {

			res.json({tareas: data});

	});

	


});

module.exports = r;












'use strict';

const mysql = require('mysql');

let conexion = mysql.createConnection({

		host: 'single-2364.banahosting.com',
		port: '3306',
		user: 'yghuiows_appmob',
		password: '25edinson25',
		database: 'yghuiows_appmob',

});

conexion.connect(function(err) {
    if (err) throw err;
    console.log('conexion mysql success');
});

module.exports = conexion;

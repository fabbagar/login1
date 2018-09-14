var mysql = require('mysql');

/*var config = { 
   host : 'localhost',
   user : 'root',
   password : '',
   database : 'tutorialnodejs'
};*/

var mysql_service = services["compose-for-mysql"];

assert(!util.isUndefined(mysql_service), "Debe tener el servicio compose-for-mysql");

var credentials = mysql_services[0].credentials;

var connectionString = credentials.uri;

var mysqlurl = new url.URL(connectionString);

var config = {
    host: mysqlurl.hostname,
    port: mysqlurl.port,
    user: mysqlurl.username,
    password: mysqlurl.password,
    database: mysqlurl.pathname.split("/")[1]
};

module.exports = config;
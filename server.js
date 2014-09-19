var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.argv[2] || 8888;

connect().use(serveStatic(__dirname)).listen(port);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
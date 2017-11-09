

var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Servidor ejecutandose en el puerto 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


 
wsServer.on('request', function(request) {

    var conexion = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' se establecio una conexion.');
    conexion.on('message', function(mess) {
        console.log('Notificacion: ' + mess.utf8Data);
        conexion.sendUTF(mess.utf8Data);

    });
    conexion.on('close', function(Code, description) {
        console.log((new Date()) + ' Cliente ' + conexion.remoteAddress + ' desconectado.');

    });
});

let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let app = express();
let server = http.Server(app);
let io = socketIO(server);
let port = process.env.PORT || 3000;

console.log(__dirname + '/static')

app.set('port', port);
app.use('/static', express.static(__dirname + 'static'));

// Маршруты
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

// Запуск сервера
server.listen(port, function () {
    console.log('Запускаю сервер на порте ' + port);
});
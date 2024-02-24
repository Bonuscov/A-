let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let app = express();
let server = http.Server(app);
let io = socketIO(server);
let port = process.env.PORT || 5000;

app.set('port', port);
app.use('/static', express.static(__dirname + '/static'));

// Маршруты
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(port, function () {
    console.log('Запускаю сервер на порте ' + port);
});

let connect = 0;

io.on('connection', function (socket) {
    console.log("connect " + ++connect);
});

var players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
    socket.on('movement', function (data) {
        var player = players[socket.id] || {};
        if (data.left) {
            if (data.shift) {
                player.x -= 7.5
            } else {
                player.x -= 15;
            }
        }
        if (data.up) {
            player.y -= 15;
        }
        if (data.right) {
            if (data.shift) {
                player.x += 7.5
            } else {
                player.x += 15;
            }
        }
        if (data.down) {
            player.y += 15;
        }
    });
});
setInterval(function () {
    io.sockets.emit('state', players);
}, 1000 / 60);
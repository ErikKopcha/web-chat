// Подключение всех модулей к программе
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

// Отслеживание порта
server.listen(3000);

// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', (request, respons) => {
	respons.sendFile(__dirname + '/index.html');
});

// Массив со всеми подключениями
let connections = [];

// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on('connection', (socket) => {
	console.log("Успешное соединение");
	// Добавление нового соединения в массив
	connections.push(socket);

	// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', (data) => {
		// Удаления пользователя из массива
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	// Функция получающая сообщение от какого-либо пользователя
	socket.on('send mess', (data) => {
		// Внутри функции мы передаем событие 'add mess',
		// которое будет вызвано у всех пользователей и у них добавиться новое сообщение 
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});
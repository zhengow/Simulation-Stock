var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var feed = require('./feed');

app.use(express.static(path.join(__dirname,'./index')))

var users = [];

io.on('connection',function(socket){
	socket.join(socket.id);
	io.to(socket.id).emit('id',socket.id);
	feed.initial_send(initial);
	console.log('A user connected, Time is %s, Socket is %s', Date(), socket.id);
	socket.on('user', function(name,_pnl){
		if(name!=""){
			var idx = find(users,name);
			if(idx==-1){
				var tmp = {id:name,pnl:_pnl};
				users.push(tmp);
			}
			else{
				users[idx].pnl=_pnl;
			}	
		}
	})
	

	socket.on('disconnect', function(){
		var idx = find(users,socket.id);
		users.splice(idx,1);
		console.log('User disconnected, Socket is %s', socket.id);
	});
});

function find(array,target){
	for(var i = 0; i< array.length;i++){
		if(target==array[i].id){
			return i;
		}
	}
	return -1;
}

function sendRank(){
	io.emit('rank',users);
}


var userinterval = setInterval(sendRank,5000);

feed.start(onChange,clear);

function initial(type,ticks,stocks){
	io.emit(type,ticks,stocks);
}

function onChange(type,tick, stocks){
	io.emit(type,tick,stocks);
}
function clear(type){
	io.emit(type);
}


http.listen(3389, function(){
	console.log('listening on *:3389');
});

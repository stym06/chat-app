const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http, { wsEngine: 'ws' });
const path=require('path');
const knex=require('./config/knex');

app.use(express.static('static'))

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/doctor',function(req,res){
	res.sendFile(path.join(__dirname + '/public/doctor2.html'));
})

app.get('/patient',function(req,res){
	res.sendFile(path.join(__dirname + '/public/patient2.html'));
})

io.on('connection',function(socket){
	console.log('socket connection established!');

	//For normal chatting (Enable DB Support here: Use knex.js)
	socket.on('new-message',function(msg){
		io.emit('receive-msg',msg);
		knex('chat').insert({
			username:msg.username,
			text:msg.text,
		})
		.then(function(rows){
			console.log(rows);
		})
		.catch(function(err){
			console.error(err);
		})
	})

	//For Patient's form submission
	socket.on('patient-data',function(msg){

		//Emit this info to the doctor
		io.emit('patient-to-doctor',msg);
		f=(msg.fever) ? 1: 0;
		n=(msg.nausea) ? 1: 0;
		c=(msg.cough) ? 1: 0;

		//Insertion into `patient_data` table in database
		knex('patient_data').insert({
			name:msg.name,
			age:msg.age,
			fever:f,
			nausea:n,
			cough:c
		},'id')
		.then(function(row){
			console.log(row);
		})
		.catch(function(err){
			console.error(err);
		})
	})

	//For starting of chat by Doctor's permission
	socket.on('start-chat',function(msg){
		io.emit('start-chat',msg);
	})
})

http.listen(4000,function(){
	console.log('Connected at Port 4000');
})
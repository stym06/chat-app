angular.module('doctorApp',[])
	.controller('doctorCtrl',['$scope',function($scope){

		var vm=this;

		vm.patientArrived=false;
		vm.chatOn=false;

		vm.messages=[{
			username: 'System',
			text:'Hello Doc!'
		}];


		vm.patientData={
			name:undefined,
			age:0,
			fever:false,
			nausea:false,
			cough:false
		};

		//Socket connection establishment
		var socket=window.io.connect('localhost:4000/');

		//Receiving the patient details
		socket.on('patient-to-doctor',function(msg){

			console.log(msg);

			//$apply used to manually change the DOM
			$scope.$apply(function(){

				//Patient's info arrived signal
				vm.patientArrived=true;
				
				for(var prop in msg){
					vm.patientData[prop]=msg[prop];
				}
			});

		})

		//Start chat with patient
		vm.chatWithPatient = function(){
			vm.chatOn=true;
			socket.emit('start-chat',vm.chatOn);
		}


		//Send message
		vm.sendMessage =function(){
			var msg={
				username:'Doctor',
				text:vm.newMessage
			}

			//Emitting the message
			socket.emit('new-message',msg);
			vm.newMessage=undefined;
		}

		//Receiving new message
		socket.on('receive-msg',function(msg){

			//$apply used to manually change the DOM
			$scope.$apply(function(){
				vm.messages.push(msg);
			});
		})

	}])


angular.module('patientApp',[])
	.controller('patientCtrl',['$scope','$rootScope',function($scope,$rootScope){

		var vm=this;

		//List of messages 
		vm.messages=[{
			username:'Doctor',
			text:'Hello Patient!'
		}];

		//Checking if form is filled
		vm.formFilled=false;

		//Checking if Doctor has agreed for consultation
		vm.doctorAgreed=false;

		//Make an object out of the patient's data
		vm.patientData={
			name:undefined,
			age:undefined,
			fever:false,
			nausea:false,
			cough:false
		};

		//New message
		vm.newMessage=undefined;

		//Socket connection establishment
		var socket=window.io.connect('localhost:4000/');
		

		//Making Patient Data
		vm.makePatientData = function(){
			// console.log(vm.patientData);
			socket.emit('patient-data',vm.patientData);
			vm.formFilled=true;
		}

		//On clicking Submit button
		vm.sendMessage = function(){
			var msg={
				username:'Patient',
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


		//Starting the chat
		socket.on('start-chat',function(msg){
			$scope.$apply(function(){
				vm.doctorAgreed=true;
			})
		})
	}])

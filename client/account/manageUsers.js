
Template.manageUsers.onCreated(function(){
	let template = Template.instance()
	template.subscribe('userList');
})

Template.manageUsers.events({

	'change .js-selectRole' : function(event , template){
		event.preventDefault();
		let selectedRole = $(event.target).val();
		let id = event.currentTarget.dataset.id;

		if (selectedRole === '0'){
			return false;
		}

		if (selectedRole === 'admin'){
			return false;
		}

		Meteor.call('updateUserRole' , id , selectedRole , function(error , result){
			 if (! error) {
			 		sAlert.success('Roles added to user', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
			 }

			 else{
			 	sAlert.error(error.reason , {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
			 }

		});
	},

	'click .js-deleteUser' : function(event , template){
		debugger;
		event.preventDefault();
		let id = event.currentTarget.dataset.id;

		if (id){
			Meteor.call('deleteUserAccount' , id , function(error , result){
				if (! error){
					sAlert.success('user account deleted', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}

				else{
					sAlert.error(error.reason , {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}
			})
		}
	}
});



Template.manageUsers.helpers({
	getUsers()  {
		let users = Meteor.users.find({}).fetch();
		console.log(users)
		return users
	}
})
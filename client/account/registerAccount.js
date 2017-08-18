

Template.registerAccount.events({
	'submit form' : function(event){
		event.preventDefault();
		let email = event.target.email.value;
		let username = event.target.username.value;
		let name = event.target.name.value;

		let user = {}
		user.email = email;
		user.username = username;
		user.profile = {name : name};
		

		Meteor.call("createUserByAdmin" , user , function(err , userId){
			if (err){
				sAlert.error(err.reason);

			}
			else{
    			sAlert.success('Account created successfully');
    			$('input[type=text]').each(function (){
            	$(this).val('');
            });

			}
		})
	}
})



if (Meteor.isServer){
	//find if the account has already been created
	let user = Accounts.findUserByEmail('jamiebones2000@yahoo.co.uk');

	if (user == undefined){
	    let id = Accounts.createUser({
		email: 'jamiebones2000@yahoo.co.uk',
		password : 'blazing147',
		profile : {name : 'James Oshomah'}
		
	});

	if (id){
		Roles.addUsersToRoles(id , 'super-admin' , Roles.GLOBAL_GROUP);
		
	}

	}
}



    Meteor.methods({
    	'createUserByAdmin' : function(userObj) {
    		let loginUser = Meteor.user();
    		if (Roles.userIsInRole(loginUser, ['super-admin'] , Roles.GLOBAL_GROUP)){
    			if (userObj){
    			let userId =  Accounts.createUser(userObj);
    			Accounts.sendEnrollmentEmail(userId);
   			 }	

    		}

    		else{

    			throw new Meteor.Error(403 , 'Not authorized to create new')
    		}
    		
  }
    	
})

    
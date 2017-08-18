
Advert = new Meteor.Collection('advert');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}




Advert_Schema = new SimpleSchema({
	"imageUrl" : {
		type : String,
		label : 'image url',
		optional : true	
	},

	"advert_owner" : {
		type : String,
		label : 'advert owner',	
	},

	"date" : {
		type : Date,
		label : '',	
	},

	"advert_active" : {
		type : Boolean,
		label : "",

	}

});


Advert.attachSchema(Advert_Schema);







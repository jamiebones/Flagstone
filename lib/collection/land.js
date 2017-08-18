
FlagStoneLand = new Meteor.Collection('flagstoneland');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}


FlagStoneLand_Schema = new SimpleSchema({
	
	"sale_lease" : {
		type : String,
		label : '',	
	},


	"titleDeed" : {
		type : String,
		label : '',	
		optional : true
	},


	"dimension" : {
		type : String,
		label : '',	
	},

	"landmark" : {
		type : String,
		label : '',	
	},
		


	"location" : {
		type : Object,
		label : '',	
		optional : true
	},

	"location.state" : {
		type : String,
		label : 'state',	
	},

	"location.lga" : {
		type : String,
		label : 'lga',
		optional : true	
	},

	"location.address" : {
		type : String,
		label : 'address',
		optional : true	
	},

	"owner" : {
		type : Object,
		label : '',	
		optional : true
	},

	"owner.title" : {
		type : String,
		label : 'title',
		optional : true	
	},

	"owner.name" : {
		type : String,
		label : 'owner name',	
		optional : true
	},

	"owner.phone" : {
		type : [Number],
		label : 'phone contact',
		optional : true	
	},

	"owner.address" : {
		type : String,
		label : 'address',
		optional : true	
	},

	"land_review" : {
		type : String,
		label : 'write review',
		optional : true
	},

	"amount" : {
		type : Object,
		label : '',
		optional : true
	},

	"amount.amount" : {
		type : Number,
		label : '',
		optional : true
	},

	"amount.discount" : {
		type : Number,
		label : '',
		optional : true
	},

	"active" : {
		type : Boolean,
		label : '',
		optional : true
	},

	"views" : {
		type : Number,
		label : '',
		optional : true
	},

	"date_added" : {
		type : Date ,
		label : '',
		optional : true
	},

	"approved" : {
		type : Boolean,
		label : '',
		optional : true
	},

	"updated": {
    type: Date,
    label : 'Updated at' ,
    optional : true,
    autoValue: function() {
      if (this.isUpdate ) {
        return new Date;
      } 
    }
  }
});


FlagStoneLand.attachSchema(FlagStoneLand_Schema);







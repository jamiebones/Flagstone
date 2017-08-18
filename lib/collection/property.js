
Tripart_Property = new Meteor.Collection('tripart_property');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}


Tripart_Property_Schema = new SimpleSchema({
	"type" : {
		type : String,
		label : 'Property type',	
	},

	"sale_lease" : {
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

	"pictures.$.imageUrl" : {
		type : String,
		label : '',
		optional : true
	},

	"pictures.$.description" : {
		type : String,
		label : '',
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

	"property_review" : {
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

	"general_features" : {
		type : [String],
		label : '',
		optional : true
	},

	"outdoor_features" : {
		type : [String],
		label : '',
		optional : true
	},

	"indoor_features" : {
		type : [String],
		label : '',
		optional : true
	},

	"other_facilities" : {
		type : Object,
		label : '',
		optional : true

	},

	"other_facilities.bedroom" : {
		type : Number,
		label : '',
		optional : true	
	},

	"other_facilities.bathroom" : {
		type : Number,
		label : ' ',
		optional : true	
	},

	"other_facilities.garage" : {
		type : Number,
		label : '',
		optional : true	
	},

	"other_facilities.staffQuaters" : {
		type : Number,
		label : '',
		optional : true	
	},

	"approved" : {
		type : Boolean,
		label : '',
		optional : true
	},

	"status" : {
		type : String,
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


Tripart_Property.attachSchema(Tripart_Property_Schema);







StateCollection = new Meteor.Collection('statecollection');

if (Meteor.isServer){
	StateCollection._ensureIndex({state : 1});
}


StateCollection_Schema = new SimpleSchema({
	"state" : {
		type : String,
		label : 'State'
	},
	"local_government" : {
		type : [ String ],
		label : 'Enter Local Govenment Area'
	}
});

StateCollection.attachSchema(StateCollection_Schema);
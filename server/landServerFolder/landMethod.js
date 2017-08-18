
Meteor.methods({

	saveLand : function (land) {
		check(land , FlagStoneLand_Schema);
		return (FlagStoneLand.insert(land));

	},

	editLandState : function(updateObj){
		return FlagStoneLand.update({"_id" : updateObj._id} , {$set : {"location.state" : updateObj.state}});
	},

	editLandLga : function(updateObj){
		return FlagStoneLand.update({"_id" : updateObj._id} , {$set : {"location.lga" : updateObj.lga}});
	},

	deleteLandOwnerPhone : function(phoneObj){
		return FlagStoneLand.update({"_id" : phoneObj._id} , {$pull : {"owner.phone" : phoneObj.phone}})
	},

	updateLandOwnerPhone : function(phoneObj){
		return FlagStoneLand.update({"_id" : phoneObj._id , "owner.phone" : phoneObj.oldPhone} , 
			{$set : {"owner.$.phone" : phoneObj.newPhone}});

	},

	newOwnerLandPhone : function(phoneObj){
		return FlagStoneLand.update({"_id" : phoneObj._id} , {$push : {"owner.phone" : phoneObj.phone}})
	},
    
    approvedLand : function(landId){
    	return FlagStoneLand.update(landId , {$set : {"approved" : true}});
    },

    editLandType : function(obj){
		return FlagStoneLand.update(obj._id, {$set : {"sale_lease" : obj.sale_lease}});
	},
   
     updateLandmark : function(id , newLankmark){
		return FlagStoneLand.update(id, {$set : {"landmark" : newLankmark}});
	},

	 editLandDeed : function(id , titleDeed){
		return FlagStoneLand.update(id, {$set : {"titleDeed" : titleDeed}});
	}
})



Meteor.methods({

	saveProperty : function (property) {
		check(property , Tripart_Property_Schema);
		return (Tripart_Property.insert(property));

	},

	savePropertyPictures : function(id , propertyObj){
		Tripart_Property.update({"_id" : id} , 
			                     {$push : {"pictures" : propertyObj}});
	},

	savePictureDescription : function(imageObj){
		return Tripart_Property.update({"_id" : imageObj._id , "pictures.imageUrl" : imageObj.imageUrl} , 
			                     {$set : {"pictures.$.description" : imageObj.description}});
	},

	deletePictureDescription : function(imageObj){
		return Tripart_Property.update({"_id" : imageObj._id , "pictures.imageUrl" : imageObj.imageUrl} , 
			                     {$pull : {"pictures.$.imageUrl" : imageObj.imageUrl}});
	},

	editPropertyCategory : function(updateObj){
		return Tripart_Property.update({"_id" : updateObj._id} , {$set : {"type" : updateObj.type}})
	},

	editPropertyType : function(updateObj){
		return Tripart_Property.update({"_id" : updateObj._id} , {$set : {"sale_lease" : updateObj.sale_lease}})
	},

	editPropertyStatus : function(updateObj){
		return Tripart_Property.update({"_id" : updateObj._id} , {$set : {"status" : updateObj.status}})
	},

	

	editPropertyState : function(updateObj){
		return Tripart_Property.update({"_id" : updateObj._id} , {$set : {"location.state" : updateObj.state}});
	},

	editPropertyLga : function(updateObj){
		return Tripart_Property.update({"_id" : updateObj._id} , {$set : {"location.lga" : updateObj.lga}});
	},

	deleteOwnerPhone : function(phoneObj){
		return Tripart_Property.update({"_id" : phoneObj._id} , {$pull : {"owner.phone" : phoneObj.phone}})
	},

	updateOwnerPhone : function(phoneObj){
		return Tripart_Property.update({"_id" : phoneObj._id , "owner.phone" : phoneObj.oldPhone} , 
			{$set : {"owner.$.phone" : phoneObj.newPhone}});

	},

	newOwnerPhone : function(phoneObj){
		return Tripart_Property.update({"_id" : phoneObj._id} , {$push : {"owner.phone" : phoneObj.phone}})
	},
    
    approvedProperty : function(propertyId){
    	return Tripart_Property.update(propertyId , {$set : {"approved" : true}});
    },
	
    removePropertyImage: function (selectedPhotoUrl , id){
      check( selectedPhotoUrl, String );
	  let bucket = Meteor.settings.BucketName;

	    // URL string: e.g. https://mybucket.s3.amazonaws.com/images/myimage.jpg is saved in DB,
	    // I only want: 'images/myimage.jpg'
	    //var currentPhotoURL = currentPhoto.url.replace('https://' + bucket + '.s3.amazonaws.com/', '');

	    var splitUrl = selectedPhotoUrl.split('/');
        var deleteUrl = splitUrl[splitUrl.length - 2] + '/' + splitUrl[splitUrl.length - 1];

	    AWS.config.update({
	      accessKeyId: Meteor.settings.AWSAccessKeyId,
	      secretAccessKey: Meteor.settings.AWSSecretAccessKey,
	    });

	    var s3 = new AWS.S3();
	    var params = {
	      Bucket: bucket, // 'mybucket'
	      Key: deleteUrl // 'images/myimage.jpg'
	    };

	    var deleteObject = Meteor.wrapAsync(
	    s3.deleteObject(params, Meteor.bindEnvironment(function (error, data) {
	        if (error) {
	          console.log(error);
	        }
	        else {
	        	
	        	Tripart_Property.update({"_id" : id} , 
				                     {$pull : {"pictures" : {imageUrl : selectedPhotoUrl}}});
	           // Remove the entry in the database. (Want to only trigger this if there is no error from Amazon).     
	        }
	      }))
	    );
   
  },

  updateGeneralFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$addToSet: { general_features : { $each: features }}})
  },

  updateIndoorFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$addToSet: { indoor_features : { $each: features }}})
  },

  updateOutdoorFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$addToSet: { outdoor_features : { $each: features }}})
  },

  deleteGeneralFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$pull: { general_features : features}});
  },

  deleteOutdoorFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$pull: { outdoor_features : features}});
  },

  deleteIndoorFeatures : function(id ,features){
  	Tripart_Property.update({_id : id} , {$pull: { indoor_features : features}});
  }
   
})



let uploader = new ReactiveVar();
let propVar = new ReactiveVar();
let imageUrlVar = new ReactiveVar();


Template.showProperty.onCreated(function(){
	let template = Template.instance();
    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

	template.autorun( () => {
		template.subscribe('showRecentProperties' , template.searchQuery.get() , () => {
			setTimeout( () => {
				 template.searching.set( false );
				} , 300);
		});
       
	});
});


Template.showProperty.rendered = function () {
    
};



Template.showProperty.events({
	'change .js-selectCategory' : function(event , template){
        event.preventDefault();

        var value = $('.js-selectCategory').val();

        if (value !== 0){

        	template.searchQuery.set(value);
        	template.searching.set(true);  
        }

        if ( value === '0'){
        	template.searchQuery.set('');

        }

    },

    'click .js-addPictures' : function(event, template){
        event.preventDefault();
        let modalTitle = $('#modalTitle');
        let propertyId = this._id;
        let div = $('#divUpload')
        modalTitle.html(this.type + ' at ' + this.location.address);
        $('#addPicturesModal').modal('show');
        propVar.set(propertyId);
        if (div.hasClass('hide')){
        	div.toggleClass('hide')
        }



        },

    'change #fileImage' : function(event , template){
        	event.preventDefault();
        	let propertyId = propVar.get();
        	if (propertyId){
        	let file = event.target.files[0];
        	let divP = $('#divProgress');
        	let divU = $('#divUpload');
        	let divD = $('#divDescription');
        	
        	if (divP.hasClass('hide')){
        		divP.toggleClass('hide');
        	}

			let upload = new Slingshot.Upload('propertyPictures');

		    upload.send(file, (error , downloadUrl) => {
			uploader.set();
			if (error){
				sAlert.error('Error uploading image' + '\n' + error);
		    	return false;
		    }

			else{
				let imageObj = {}
				imageObj.imageUrl = downloadUrl;
				imageObj.description = "";
				Meteor.call('savePropertyPictures', propertyId , imageObj, function (error, result) {
					if (! error){
					sAlert.success('Picture added to the system. you can add a description for the picture.');
        	             divU.addClass('hide');
        	             divP.addClass('hide');
        	             if (divD.hasClass('hide')){
        						divD.toggleClass('hide');
        					}
					}

					else{
						sAlert.error(error.reason);
                        $('fileImages').val('')
                        divU.toggleClass('hide');
                        divP.toggleClass('hide');
                        $('#addPicturesModal').modal('hide');
                        
					}
					
				});
				imageUrlVar.set(downloadUrl);
				
			}
			});
			uploader.set(upload);
        	}
        },

        'click .js-saveDescription' : function(event , template){
        	event.preventDefault();
        	let imageUrl = imageUrlVar.get();
        	let saveButton = $('.js-saveDescription');
        	if (imageUrl){
        		saveButton.attr('disabled' , 'disabled');
                let propertyId = propVar.get();
        		let description = $('.js-txtPictureDescription');
        		let descriptionValue = description.val().trim()
        		if (descriptionValue != ''){
        			let divD = $('#divDescription');
        			let imageObj = {};
                    imageObj._id = propertyId;
        		    imageObj.imageUrl = imageUrl;
        		    imageObj.description = descriptionValue;
        		    Meteor.call('savePictureDescription', imageObj, function (error, result) {
        		    	if (! error) {
        		    		sAlert.success('Description added to the image');
        		    		divD.addClass('hide');
        		    		$('#addPicturesModal').modal('hide');
        		    		saveButton.removeAttr('disabled');

        		    	}
        		    	else{
        		    		sAlert.error(error.reason);
                            divD.addClass('hide');
                            $('#addPicturesModal').modal('hide');
                            saveButton.removeAttr('disabled');
        		    	}

        		    });
        		}
 	
        	}
        },

        'click .linkModal' : function(event , template){
        	event.preventDefault();
        	let anchor = $('.linkModal');
        	let imageUrl = anchor.attr('href');
        	let image = $('#imageModal');
        	image.attr('src' , imageUrl);
        	$('#viewPicturesModal').modal('show');
        },
        'click .js-editData' : function(event , template){
        	event.preventDefault();
        	let propertyId = this._id;
        	Router.go('/administration/edit_property/?id=' + propertyId);
        } 
});


Template.showProperty.helpers({
	searching (){
		return Template.instance().searching.get();
	},
     
    query (){
    	return Template.instance().searchQuery.get();
    },

    property() {
    	let property = Tripart_Property.find();
    	if (property){
    		return property;
    	}
    },
	isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-primary">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100);
		}
	}
});
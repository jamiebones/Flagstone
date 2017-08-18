
let uploader = new ReactiveVar();
let advertVar = new ReactiveVar();



Template.advert.onCreated(function(){
	let template = Template.instance();
	
	template.advertId = new ReactiveVar();
    template.subscribe('showAllAdvert');
	template.autorun(function(){
		template.subscribe('getOneAdvert' , template.advertId.get());
	})
});

Template.advert.rendered = function(){
	let template = Template.instance();
	let chk = template.$('.js-checked');
}


Template.advert.events({
    'change #js-fileAdvert' : function(event , template){
        	event.preventDefault();
        	let Id = advertVar.get();
        	if (Id){
        	let file = event.target.files[0];
        	let divP = $('#divProgress');
        	let divU = $('.divAdvertImage');
 
        	
        	if (divP.hasClass('hide')){
        		divP.toggleClass('hide');
        	}

			let upload = new Slingshot.Upload('advert');

		    upload.send(file, (error , downloadUrl) => {
			uploader.set();
			if (error){
				sAlert.error('Error uploading image' + '\n' + error);
		    	return false;
		    }

			else{
				let url = downloadUrl;
			
				Meteor.call('saveAdvert',Id , url, function (error, result) {
					if (! error){
					sAlert.success('Image added.');
        	             divU.addClass('hide');
        	             divP.addClass('hide');
        	             $('#js-fileAdvert').val('');
        	           
					}

					else{
						sAlert.error(error.reason);
                        $('#js-fileAdvert').val('')
                        divU.toggleClass('hide');
                        divP.toggleClass('hide'); 
					}
					
				});
				imageUrlVar.set(downloadUrl);
				
			}
			});
			uploader.set(upload);
        	}
        },

        'click .js-saveAdvert' : function(event , template){
        	event.preventDefault();
        	let divAdvert = $('.divAdvertImage')
        	let text = $('#js-businessName').val(),
        	    date = new Date(),
        	    active = true;

        	let adObj = {}
        	    adObj.imageUrl = "";
        	    adObj.date = date;
        	    adObj.advert_owner = text;
        	    adObj.advert_active = false;

        	if (text !== ""){
        		Meteor.call('saveAdvertName', adObj, function (error, id) {
        			if (! error){
    				 sAlert.success('Business saved !', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    				 advertVar.set(id);
    				 divAdvert.toggleClass('hide');
    				 $('#js-businessName').val('');
    			}
        		});
        	}
        },

        'change .js-advert' : function(event , template){
        	event.preventDefault();
        	let value = $('.js-advert').val();
        	if (value !== '0'){
        		template.advertId.set(value);
        	}
        },

        'click .js-deleteImage' : function(event , template){
        	event.preventDefault();
        	let id = event.currentTarget.dataset.id;
        	let img = $('.js-advertImage')
        	let src = img.attr('src');
        	if (id){

	        	if (src != undefined ){
	        		   Meteor.defer(function(){
	        		   		Meteor.call('removeAdvertImage', src , id, function (error, result) {
	        			   if (! error){
	        			   		 sAlert.success('Advert and image deleted.!', {effect: 'genie', 
	                             position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
	        			  }
	        		});
	        	  });
	        	}

	        	else{
	        		Meteor.call('deleteAdvert', id, function (error, result) {
	        			   if (! error){
	        			   		 sAlert.success('Advert deleted.!', {effect: 'genie', 
	                             position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
	        			  }
	        	});
	        
	           }
        	}
     },

     'change .js-changeImage' : function(event , template){
     	 event.preventDefault();
     	 let id = event.currentTarget.dataset.id;
        	if (id){
        	let file = event.target.files[0];
        	let divP = $('#divEditProgress');
        	let img = $('.js-advertImage')
        	let src = img.attr('src');

        	if (src){
        		Meteor.defer(function(){
        			Meteor.call('removeAdvertImage', src , function (error, result){});
        		});	
        	}
 
        	
        	if (divP.hasClass('hide')){
        		divP.toggleClass('hide');
        	}

			let upload = new Slingshot.Upload('advert');

		    upload.send(file, (error , downloadUrl) => {
			uploader.set();
			if (error){
				sAlert.error('Error uploading image' + '\n' + error);
		    	return false;
		    }

			else{
				let url = downloadUrl;
			
				Meteor.call('saveAdvert',id , url, function (error, result) {
					if (! error){
					sAlert.success('Image added.');
        	             divP.addClass('hide');
        	           
					}

					else{
						sAlert.error(error.reason);
                        $('.js-changeImage').val('')
                        divP.toggleClass('hide'); 
					}
					
				});
				imageUrlVar.set(downloadUrl);
				
			}
			});
			uploader.set(upload);
        	}

     },

     'change .js-checked' : function(event , template){
     	event.preventDefault();
     	debugger;
     	let checkbox = $('.js-checked');
     	let id = event.currentTarget.dataset.id;
     	let status;
     	if ((checkbox).is(':checked')){
     		status = true
     	}
     	else{
     		status = false
     	}
     	Meteor.call('updateStatus', id, status, function (error, result) {
    			if (! error){
    				sAlert.success('Status changed!', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    			}
    		});
     }

});


Template.advert.helpers({
	isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-primary">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100);
		}
	},
	advert: function () {
		return Advert.find({});
	},

	oneAdvert : function(){
		return Advert.findOne({"_id" : Template.instance().advertId.get()});
	}
});
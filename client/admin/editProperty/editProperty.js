let propertyId = new ReactiveVar();

Template.editProperty.onCreated(function(){
     
    let id = this.data.property._id;
    propertyId.set(id);
	this.subscribe('showCategory');
    this.subscribe('showState');  
	//let propertyId = Session.get('propertyIdSession');
	//template.subscribe('getOneProperty' , propertyId);
});


Template.editProperty.rendered = function(){
	let template = Template.instance();

    template.$('.nav-tabs-dropdown').each(function(i, elm) {
    
    $(elm).text($(elm).next('ul').find('li.active a').text());

    //activating the box carousel
    template.$('.carousel').carousel({
      interval: 2000
    });
});


    template.$('#js-generalFeatures').css('height' , parseInt($("#js-generalFeatures option").length * 20));
    template.$('#js-outdoorFeatures').css('height' , parseInt($("#js-outdoorFeatures option").length * 20));
    template.$('#js-indoorFeatures').css('height' , parseInt($("#js-indoorFeatures option").length * 20)); 
 
   
}



Template.editProperty.events({
	'click .nav-tabs-dropdown': function (event , template) {
       event.preventDefault();
       $(event.target).toggleClass('open').next('ul').slideToggle();	
	},

	'click #nav-tabs-wrapper a[data-toggle="tab"]': function (event , template) {
       event.preventDefault();
       $(event.target).closest('ul').hide().prev('a').removeClass('open').text($(this).text());	
	},
    'change .js-selectState' : function(event){
        event.preventDefault();
        var value = $('.js-selectState').val();
        if (value == 0){
            $('.js-selectLGA').find('option').remove()
        }
        else{
            Session.set('selectedState', value)
        }

    },

    'change #editCategory' : function(event , template){
    	event.preventDefault();
    	let dropdown = $('#editCategory').val();
    	if (dropdown != '0'){
    		let obj = {};
    		obj._id = propertyId.get();
    		obj.type = dropdown
    		Meteor.call('editPropertyCategory', obj, function (error, result) {
    			if (! error){
    				sAlert.success('Saved!', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    			}
    		});
    	}
    },


    'change #editState' : function(event , template){
    	event.preventDefault();
    	let dropdown = $('#editState').val();
    	if (dropdown != '0'){

    		let obj = {};
    		obj._id = propertyId.get();
    		obj.state = dropdown;
    		Meteor.call('editPropertyState', obj, function (error, result) {
    			if (! error){
    				sAlert.success('Saved!', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    			}
    		});
    	}
    },


    'change #editType' : function(event , template){
        event.preventDefault();
        let dropdown = $('#editType').val();
        if (dropdown != '0'){

            let obj = {};
            obj._id = propertyId.get();
            obj.sale_lease = dropdown;
            Meteor.call('editPropertyType', obj, function (error, result) {
                if (! error){
                    sAlert.success('Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                }
            });
        }
    },

    
    'change #js-editStatus' : function(event , template){
        event.preventDefault();
        let dropdown = $('#js-editStatus').val();
        if (dropdown != '0'){

            let obj = {};
            obj._id = propertyId.get();
            obj.status = dropdown;
            Meteor.call('editPropertyStatus', obj, function (error, result) {
                if (! error){
                    sAlert.success('Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                }
            });
        }
    },

    'change .js-selectLGA' : function(event , template){
    	event.preventDefault();
    	let dropdown = $('.js-selectLGA').val();
    	if (dropdown != '0'){

    		let obj = {};
    		obj._id = propertyId.get();
    		obj.lga = dropdown
    		Meteor.call('editPropertyLga', obj, function (error, result) {
    			if (! error){
    				sAlert.success('Saved!', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    			}
    		});
    	}
    },


	'click .js-ClosePhone' : function(event , template){
		event.preventDefault();
	    let id = propertyId.get();		
        let para = $(event.target.parentNode)
		let text = para.context.innerText
		text = text.slice(0 , -7).trim()
		let obj = {};
		obj._id = id;
		obj.phone = text;
		Meteor.call('deleteOwnerPhone' , obj , function(error , result){
				if (! error){
					sAlert.success('Saved!', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
					let p =$(event.target.parentNode);
		            p.remove();
				}

				else{
					sAlert.error(error.reason, {effect: 'slide', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}

			})
	},

	'click .js-EditPhone' : function(event , template){
		event.preventDefault();
		let id = propertyId.get();
		let para = $(event.target.parentNode)
		let text = para.context.innerText
		text = text.slice(0 , -7).trim()
		let prom = prompt('Edit the phone number' , text);
		if (prom){
			let obj = {};
			obj._id = id;
			obj.oldPhone = text;
			obj.newPhone = prom;
			Meteor.call('updateOwnerPhone' , obj , function(error , result){
				if (! error){
					sAlert.success('Number edited!', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}

				else{
					sAlert.error(error.reason, {effect: 'slide', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}

			})	
		}
	},

	'click .js-NewPhone' : function(event , template){
		event.preventDefault();
		let text = $('#txtPhone').val();
		let id = this._id;
	    let para = $('<p>' + text + ' ' + '</p>');
	    let obj = {};
	    obj._id = id;
	    obj.phone = text;
		if (text == 'undefined'){
			return sAlert.error('Please enter a phone number', {effect: 'slide', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
		}

		Meteor.call('newOwnerPhone' , obj , function(error , result){
			if (! error){
				sAlert.success('Number edited!', {effect: 'genie', 
    			position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});;
				$('#txtPhone').val(" ");
			}
			else {
				sAlert.error(error.reason, {effect: 'slide', 
    			position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
		   }
		})
	},

    'click .js-imagecarousel' : function(event , template){
        event.preventDefault();
        let imageUrl = event.currentTarget.dataset.url;
        let description = event.currentTarget.dataset.des;
        let image = $('#js-picture');
        let desText =$('#js-pictureDescription');

        if (description != undefined || description != ''){
            desText.val(description)
        }
        else{
            desText.val('');
        }
        image.attr('src', '');
        image.attr('src', imageUrl);
        //open the modal
        let modal = $('#propertyPictureModal');
        modal.modal('show');
    },
    'click #js-updateDescription' : function(event , template){
        let text = $('#js-pictureDescription').val();
        let image = $('#js-picture');
        let button = $('#js-updateDescription');
        button.attr('disabled' , 'disabled');
        if (text != ''){
            let id = propertyId.get();
            let imageUrl = image.attr('src');
            let obj = {};
            obj._id = id;
            obj.imageUrl = imageUrl;
            obj.description = text;
            Meteor.call('savePictureDescription' , obj , function(error , result){
                if (! error){
                    sAlert.success('picture description edited!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});;
                     $('#propertyPictureModal').modal('hide');
                     $('#js-pictureDescription').val('');
                     button.removeAttr('disabled');
                }
                else{
                    sAlert.error(error.reason, {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});;
                    button.removeAttr('disabled');
                }
            })
        }

    },

    'click #js-deletePicture' : function(event , template){
        event.preventDefault();
        let con = confirm('Do you want to delete this image from the system');
        if (! con){
            return false;
        }
        let image = $('#js-picture');
        let button = $('#js-deletePicture');
        let id = propertyId.get();
        let imageUrl = image.attr('src');
        button.attr('disabled' , 'disabled');
        button.text('please wait--------');
        Meteor.call('removePropertyImage',imageUrl, id , function (error, result) {
             if (! error){
                sAlert.success('picture removed!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});;
                     $('#propertyPictureModal').modal('hide');
                     button.text('Delete picture');
                     button.removeAttr('disabled');

             }
            else{
                 sAlert.error(error.reason, {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});;
                    button.removeAttr('disabled');
                    button.prop('Delete picture');
            }
        }); 
    },

    'click .js-goBack' : function(event , template){
        event.preventDefault();
        Router.go('/administration/show_recent_properties');
    },

    'click .generalfeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.dataset.value;
        let id = propertyId.get();
        Meteor.call('deleteGeneralFeatures', id, feature_to_remove, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' removed!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

 'click .indoorFeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.dataset.value;
        let id = propertyId.get();
        Meteor.call('deleteIndoorFeatures', id, feature_to_remove, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' removed!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

 'click .outdoorFeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.dataset.value;
        let id = propertyId.get();
        Meteor.call('deleteOutdoorFeatures', id, feature_to_remove, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' removed!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

'change #js-generalFeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.value;
        let id = propertyId.get();
        let featureArray = [];
        featureArray.push(feature_to_remove);
        Meteor.call('updateGeneralFeatures', id, featureArray, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' added!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

'change #js-indoorFeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.value;
        let id = propertyId.get();
        let featureArray = [];
        featureArray.push(feature_to_remove);
        Meteor.call('updateIndoorFeatures', id, featureArray, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' added!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

'change #js-outdoorFeatures' : function (event , template){
        event.preventDefault();
        let feature_to_remove = event.currentTarget.value;
        let id = propertyId.get();
        let featureArray = [];
        featureArray.push(feature_to_remove);
        Meteor.call('updateOutdoorFeatures', id, featureArray, function (error, result) {
                 if (! error){
                    sAlert.success(feature_to_remove + ' added!', {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                 }
        });      
},

'click .js-approveProperty' : function(event , template){
        event.preventDefault();
        let id = propertyId.get();
        Meteor.call('approvedProperty', id, function (error, result) {
               if (! error){
                    sAlert.success('Property approved' , {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                    // This is where i should send an email to the subscribed user that a property has
                    //been added to the system. I will need the url of the image 
                      Meteor.call('sendSubscriptionEmail', id, function (err, or) {
                        if (err) {
                             console.log("Error sending email", err);
                           }
                             else {
                                  console.log("Send email successfull!")
                            }
                          });
                 }
                
            }
        );
}

});







Template.editProperty.helpers({
	getOneProperty: function () {
		return this.property;
	},

	showCategory: function () {
		return Category.find({}).fetch();

	},

    getState : function () {
        return StateCollection.find({}).fetch();
    },
});
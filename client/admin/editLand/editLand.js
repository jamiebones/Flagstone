let LandId = new ReactiveVar();

Template.editLand.onCreated(function(){
     
    let id = this.data.land._id;
    LandId.set(id);
	this.subscribe('showCategory');
    this.subscribe('showState');  
	//let LandId = Session.get('LandIdSession');
	//template.subscribe('getOneLand' , LandId);
});


Template.editLand.rendered = function(){
	let template = Template.instance();

    template.$('.nav-tabs-dropdown').each(function(i, elm) {
    
    $(elm).text($(elm).next('ul').find('li.active a').text());

});

   
}



Template.editLand.events({
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

    'change #editType' : function(event , template){
        event.preventDefault();
        let dropdown = $('#editType').val();
        if (dropdown != '0'){

            let obj = {};
            obj._id = LandId.get();
            obj.sale_lease = dropdown;
            Meteor.call('editLandType', obj, function (error, result) {
                if (! error){
                    sAlert.success('Saved!', {effect: 'genie', 
                        position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                }
            });
        }
    },

      'change #js-editTitleDeed' : function(event , template){
        event.preventDefault();
        let dropdown = $('#js-editTitleDeed').val();
        if (dropdown != '0'){

            let obj = {};
            obj._id = LandId.get();
            obj.titleDeed = dropdown;
            Meteor.call('editLandDeed', obj, function (error, result) {
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
    		obj._id = LandId.get();
    		obj.state = dropdown;
    		Meteor.call('editLandState', obj, function (error, result) {
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
    		obj._id = LandId.get();
    		obj.lga = dropdown
    		Meteor.call('editLandLga', obj, function (error, result) {
    			if (! error){
    				sAlert.success('Saved!', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    			}
    		});
    	}
    },


	'click .js-ClosePhone' : function(event , template){
		event.preventDefault();
	    let id = LandId.get();		
        let para = $(event.target.parentNode)
		let text = para.context.innerText
		text = text.slice(0 , -7).trim()
		let obj = {};
		obj._id = id;
		obj.phone = text;
		Meteor.call('deleteLandOwnerPhone' , obj , function(error , result){
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
		let id = LandId.get();
		let para = $(event.target.parentNode)
		let text = para.context.innerText
		text = text.slice(0 , -7).trim()
		let prom = prompt('Edit the phone number' , text);
		if (prom){
			let obj = {};
			obj._id = id;
			obj.oldPhone = text;
			obj.newPhone = prom;
			Meteor.call('updateLandOwnerPhone' , obj , function(error , result){
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

		Meteor.call('newOwnerLandPhone' , obj , function(error , result){
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

    'click .js-goBack' : function(event , template){
        event.preventDefault();
        Router.go('/admin/show_recent_lands');
    },

   
'click .js-approveLand' : function(event , template){
        event.preventDefault();
        let id = LandId.get();
        Meteor.call('approvedLand', id, function (error, result) {
               if (! error){
                    sAlert.success('Land approved' , {effect: 'bouncyflip', 
                    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
                    // This is where i should send an email to the subscribed user that a Land has
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







Template.editLand.helpers({
	getOneLand: function () {
		return this.land;
	},

	showCategory: function () {
		return Category.find({}).fetch();

	},

    getState : function () {
        return StateCollection.find({}).fetch();
    },
});
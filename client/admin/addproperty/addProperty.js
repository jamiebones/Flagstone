var uploader = new ReactiveVar();
var imageDetails = new ReactiveVar();

let propertyID = new ReactiveVar();
let propertyVar = new ReactiveVar();


Template.addProperty.onCreated(function () {
	let template = Template.instance();
	template.subscribe('showCategory');
    template.subscribe('showState');
});


Template.addProperty.rendered = function () {	
	let template = Template.instance();
    template.$('#js-generalFeatures').css('height' , parseInt($("#js-generalFeatures option").length * 20));
    template.$('#js-outdoorFeatures').css('height' , parseInt($("#js-outdoorFeatures option").length * 20));
    template.$('#js-indoorFeatures').css('height' , parseInt($("#js-indoorFeatures option").length * 20)); 

    template.$('#summernoteReview').summernote();
};

Template.localGovernment.onCreated(function () {
    this.subscribe('findState' , Session.get('selectedState'));
});



Template.addProperty.helpers({
	showCategory: function () {
		return Category.find({}).fetch();

	},

    getState : function () {
        return StateCollection.find({}).fetch();
    },

    isUploading : function () {
		return  '<p>File is uploading : ' + '<span class="text-primary">' + Boolean(uploader.get()) + '</span></p>';
	},

	progress : function() {
		var upload = uploader.get();
		if (upload){
			return Math.round(upload.progress() * 100)
		}
	}
});

Template.addProperty.events({
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

    'click .js-closephone' : function (event) {
		event.preventDefault()
		var pcount = $('.divPhone p').length
		if (pcount - 1 == 0){
			$('.divPhone').addClass('hide');
			$('.divPhone').removeClass('show');

		}
		var clickbutton = $(event.target);
		var p = $(event.target.parentNode)
		p.remove()
		
	},

	'click .btn:first-of-type' : function(event , template){
		event.preventDefault();
		let btn = $(event.currentTarget);
		let input = btn.closest('.spinner').find('input');
		if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) { 
		    if (parseInt(input.attr('max')) === 1000000000) {
		    	input.val(parseInt(input.val(), 10) + 5000);

		    }else{
		    	  input.val(parseInt(input.val(), 10) + 1);
		    }   
      
      } else {
        btn.next("disabled", true);
      }
	},

	'click .btn:last-of-type' : function(event , template){
		event.preventDefault();
		let btn = $(event.currentTarget);
		let input = btn.closest('.spinner').find('input');
		 if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
		      if (parseInt(input.attr('max')) === 1000000000) {
		    	input.val(parseInt(input.val(), 10) - 5000);

		    }else{
		    	  input.val(parseInt(input.val(), 10) - 1);
		    }   
      } else {
        btn.prev("disabled", true);
      }
	},


    'click .js-contact' : function (event){
		event.preventDefault();
        var inputElement = $('#txtPhone')
        
        if (! inputElement.val() == ''){
        	//get the id of the div
        	var div = $('.divPhone')
        	var button = $('<button/>' , {
        		            text :  "X",
        		            class : "js-closephone btn btn-danger btn-small"
        		            
        	})
        	var text = inputElement.val()
        	var para = $('<p>' + text + ' ' + '</p>')
        	para.append(button)
        	div.append(para);
        	inputElement.val('');
        	if (div.hasClass('hide')){
                div.toggleClass('hide');
            }
            
        }
	},

	'click .js-submitProperty' : function(event , template){
		debugger;
		event.preventDefault();
		let category = $('.js-selectCategory'),
		    propertyState = $('.js-selectState'),
		    propertyLga = $('.js-selectLGA'),
		    location = $('.js-location'),
		    title = $('.js-selectTitle'),
		    firstname = $('.js-firstname'),
		    surname = $('.js-surname'),
		    address = $('.js-address'),
		    review = $('#summernoteReview').summernote('code'),
		    generalFeatures = $('#js-generalFeatures'),
		    outdoorFeatures = $('#js-outdoorFeatures'),
		    indoorFeatures  = $('#js-indoorFeatures'),
		    bedroom = $('#js-bedroom'),
		    bathroom = $('#js-bathroom'),
		    staffQuaters = $('#js-staffQuaters'),
		    garage = $('#js-garage'),
		    price = $('#js-price'),
		    sale_lease = $('#js-saleLease'),
		    status = $('#js-status')


		    let emailHeading = {};

		    //validation of the form fields starts here

		    if (sale_lease.val() != '0'){
		    	sale_lease = sale_lease.val();
		    }
		    else{
		    	alert('please select if the property is for sale or for lease');
		    	return false;
		    }

		    if (category.val() != '0'){
		    	category = category.val();
		    	emailHeading.type = category
		    }
		    else{
		    	alert('Please select a category');
		    	return false;
		    }

		    if (status.val() != '0'){
		    	status = status.val();
		    }
		    else{
		    	alert('please select the property status');
		    	return false;
		    }
		    if (propertyState.val() != '0'){
		    	propertyState = propertyState.val();
		    }

		    else{
		    	alert('Please select a state from the drop downlist');
		    	return false;
		    }

		    if (propertyLga.val() != '0'){
		    	propertyLga = propertyLga.val();
		    }

		    else{
		    	alert('Please select the local government area');
		    	return false;
		    }

		    if (location.val() != ''){
		    	location = location.val();
		    	emailHeading.location = location;
		    }

		    else{
		    	alert('Please enter the address of the property');
		    	return false;
		    }

		    if (title.val() != '0'){
		    	title = title.val();
		    }

		    else{
		    	alert('Please select a the title');
		    	return false;
		    }

		    var phoneArray = [];
	         //Extracting the phone numbers from the div and saving to an array
			$('.divPhone p').each(function(){
				var para = $(this)
				var str = para.context.innerText;
				str = str.slice(0 , -1).trim()
				phoneArray.push(parseInt(str));
			})
  			
  			price = parseInt(price.val());
  			firstname = firstname.val();
  			surname = surname.val();
  			address = address.val();
  			generalFeatures = generalFeatures.val();
  			indoorFeatures = indoorFeatures.val();
  			outdoorFeatures = outdoorFeatures.val();
  			bedroom = parseInt(bedroom.val());
  			bathroom = parseInt(bathroom.val());
  			garage = parseInt(garage.val());
  			staffQuaters = parseInt(staffQuaters.val());

  			let other_facilities = {};
  			other_facilities.bedroom = bedroom;
  			other_facilities.bathroom = bathroom;
  			other_facilities.garage = garage;
  			other_facilities.staffQuaters = staffQuaters;


  			let pictures = [];

  			let propertyObj = {};

  			propertyObj.type = category;
  			propertyObj.status = status;
  			propertyObj.location = {}
  			propertyObj.location.state = propertyState;
  			propertyObj.location.lga = propertyLga;
  			propertyObj.location.address = address;
  			propertyObj.pictures = pictures;
  			propertyObj.owner = {};
  			propertyObj.owner.title = title;
  			propertyObj.owner.name = firstname + ' ' + surname;
  			propertyObj.owner.phone = phoneArray;
  			propertyObj.owner.address = address;
  			propertyObj.property_review = review;
  			propertyObj.amount = {};
  			propertyObj.amount.amount = price;
  			propertyObj.amount.discount = 0;
  			propertyObj.active = true;
  			propertyObj.views = 0;
  			propertyObj.date_added = new Date();
  			propertyObj.approved = false;
  			propertyObj.general_features = generalFeatures;
  			propertyObj.outdoor_features = outdoorFeatures;
  			propertyObj.indoor_features = indoorFeatures;
  			propertyObj.other_facilities = other_facilities;
  			propertyObj.sale_lease = sale_lease;

		    //validation of form fields ends here

		    //save the email heading stuffs to the reactive var variable
		    propertyVar.set(emailHeading)

		    Meteor.call('saveProperty' , propertyObj , (error , result) => {
		    	if (! error){
		    		sAlert.success('Property information added to the system. You can now proceed to add the property pictures');
		    		$('input[type=text],textarea').each(function (){
            			$(this).val('');
            			Router.go('/admin/show_recent_properties');
            		});
            
            		propertyID = result;
            		//send an email letting the administrator know that there's property for approval.
            		

            			 let emailObj = {};
            			 let emailVar = propertyVar.get();
            			 emailObj.to = "jamiebones2000@yahoo.co.uk";
            			 emailObj.from = "[FlagStone Properties] <noreply@flagstoneholdings.com>";
            			 emailObj.subject = emailVar.type + " at " + emailVar.location ;
            			 emailObj.text = "<p>" + "Hello please a property has been saved in the database system. Please find time to review and approve. Thank you" + "</p>"
            			 emailObj.html = "<p>" + "Hello please a property has been saved in the database system. Please find time to review and approve. Thank you" + "</p>"
            			 //This is where an email will be sent to the administrator using 
            			Meteor.defer(function(){
            				Meteor.call('sendAdminPropertySubmissionEmail' , emailObj ,(error,result) =>{
							  if (error){
							  		alert(error.reason);
							  		Meteor.setTimeout(()=>{
							  	 		Meteor.call('sendAdminPropertySubmissionEmail' , emailObj , (error) => {
							  				if (error){
							  				alert('I could not sent the email to admin i give up. sigh----- what a life');
							  			  }
							  		  });

							  	}, 3000)
							  }
					    })
            			});
					
            		
		    	}
		    	//tHere was an error entering it in the system
		    	else{
		    		sAlert.error('There was an error please try again \n' + error.reason);
		    	}

		    })

	},

	'change .js-uploadFile' : function(event , template){
			event.preventDefault();
			let file = event.target.files[0];
			let upload = new Slingshot.Upload('propertyPictures');

		    upload.send(file, (error , downloadUrl) => {
			uploader.set();
			if (error){
				sAlert.error('Error uploading image' + '\n' + error);
		    	return false;
		    }

			else{
				sAlert.success('Image uploaded successfully');

			}
			});
			uploader.set(upload);
	}
})


Template.localGovernment.helpers({
    getLGA : function () {
        return StateCollection.find({'state' : Session.get('selectedState')});
    },
});


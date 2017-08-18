

let LandID = new ReactiveVar();
let LandVar = new ReactiveVar();


Template.addLand.onCreated(function () {
	let template = Template.instance();
	template.subscribe('showCategory');
    template.subscribe('showState');
});


Template.addLand.rendered = function () {	
	let template = Template.instance();
    template.$('#summernoteLandReview').summernote();
};

Template.localGovernment.onCreated(function () {
    this.subscribe('findState' , Session.get('selectedState'));
});



Template.addLand.helpers({
    getState : function () {
        return StateCollection.find({}).fetch();
    },
});

Template.addLand.events({
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

	'click .js-submitLand' : function(event , template){
		debugger;
		event.preventDefault();
		let LandState = $('.js-selectState'),
		    LandLga = $('.js-selectLGA'),
		    location = $('.js-location'),
		    title = $('.js-selectTitle'),
		    firstname = $('.js-firstname'),
		    surname = $('.js-surname'),
		    address = $('.js-address'),
		    review = $('#summernoteLandReview').summernote('code'),
		    price = $('#js-price'),
		    sale_lease = $('#js-saleLease'),
		    dimension = $('.js-dimension'),
		    landmark = $('.js-landMark'),
		    titleDeed = $('#js-titleDeed')


		    let emailHeading = {};

		    //validation of the form fields starts here

		    if (sale_lease.val() != '0'){
		    	sale_lease = sale_lease.val();
		    }
		    else{
		    	alert('please select if the Land is for sale or for lease');
		    	return false;
		    }

		    if (titleDeed.val() != '0'){
		    	 titleDeed = titleDeed.val();
		    }
		    else{
		    	alert('please select title document for the Land.');
		    	return false;
		    }

		   
		    if (LandState.val() != '0'){
		    	LandState = LandState.val();
		    }

		    else{
		    	alert('Please select a state from the drop downlist');
		    	return false;
		    }

		    if (LandLga.val() != '0'){
		    	LandLga = LandLga.val();
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
		    	alert('Please enter the address of the Land');
		    	return false;
		    }

		    if (dimension.val() != ''){
		    	dimension = dimension.val();
		    }

		    else{
		    	alert('Na wa! for you. you don see land wen no get dimension.Abeg enter the dimension.');
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
  			landmark = landmark.val();
  			


  			let LandObj = {};

  			LandObj.location = {}
  			LandObj.location.state = LandState;
  			LandObj.location.lga = LandLga;
  			LandObj.location.address = address;
  			LandObj.owner = {};
  			LandObj.owner.title = title;
  			LandObj.owner.name = firstname + ' ' + surname;
  			LandObj.owner.phone = phoneArray;
  			LandObj.owner.address = address;
  			LandObj.land_review = review;
  			LandObj.amount = {};
  			LandObj.amount.amount = price;
  			LandObj.amount.discount = 0;
  			LandObj.active = true;
  			LandObj.views = 0;
  			LandObj.date_added = new Date();
  			LandObj.approved = false;
  			LandObj.sale_lease = sale_lease;
  			LandObj.dimension = dimension;
  			LandObj.landmark = landmark;
  			LandObj.titleDeed = titleDeed;

		    //validation of form fields ends here

		    //save the email heading stuffs to the reactive var variable
		    LandVar.set(emailHeading)

		    Meteor.call('saveLand' , LandObj , (error , result) => {
		    	if (! error){
		    		sAlert.success('Land information added to the system.');
		    		$('input[type=text],textarea').each(function (){
            			$(this).val('');
            			Router.go('/admin/show_recent_lands');
            		});
            
            		LandID = result;
            		//send an email letting the administrator know that there's Land for approval.
            		

            			 let emailObj = {};
            			 let emailVar = LandVar.get();
            			 emailObj.to = "jamiebones2000@yahoo.co.uk";
            			 emailObj.from = "[FlagStone Land] <jamiebones147@gmail.com>";
            			 emailObj.subject ="Land available at " + emailVar.location ;
            			 emailObj.text = "<p>" + "Hello please a Land has been saved in the database system. Please find time to review and approve. Thank you" + "</p>"
            			 emailObj.html = "<p>" + "Hello please a Land has been saved in the database system. Please find time to review and approve. Thank you" + "</p>"
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
            			})
					
            		
		    	}
		    	//tHere was an error entering it in the system
		    	else{
		    		sAlert.error('There was an error please try again \n' + error.reason);
		    	}

		    })

	},
})


Template.localGovernment.helpers({
    getLGA : function () {
        return StateCollection.find({'state' : Session.get('selectedState')});
    },
});


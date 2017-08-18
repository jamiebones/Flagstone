

Template.home.onCreated(function(){
		let template = Template.instance();
		template.subscribe('showAdvert');
		template.subscribe('showHotProperties');
		
});


Template.home.rendered = function () {
	let template = Template.instance();
	template.$("#homeCarousel").carousel();
    template.$('#js-generalFeatures').css('height' , parseInt($("#js-generalFeatures option").length * 20));
    template.$('#js-outdoorFeatures').css('height' , parseInt($("#js-outdoorFeatures option").length * 20));
    template.$('#js-indoorFeatures').css('height' , parseInt($("#js-indoorFeatures option").length * 20));
};



Template.home.events({
	'click .js-signUp' : function(event , template){
		event.preventDefault();
		$('.js-subscriptionModal').modal('show');
	},

	'click .js-viewPropertyDetails' : function(evt , template){
		debugger;
		evt.preventDefault();
		let id = evt.currentTarget.dataset.id;
		if (id){
			Router.go('/view_property/' + id);
		}
	},

	//'click .js-searchHome': function (event , template) {
	//	event.preventDefault();
		//let element = event.currentTarget.dataset.element;
		//$('#search_concept').html(element);
	//},

	'keyup [name="search"]' : function (event , template) {
		event.preventDefault();
		let value = event.target.value.trim();
		let divSearch = $('.divSearch');
		if (value !== '' && event.keyCode === 13){
			template.searchQuery.set(value);
			template.searching.set(false);
			if (divSearch.hasClass('hide')){
				divSearch.removeClass('hide');
			};
		}

		if (value === ''){
			template.searchQuery.set(value);
		}

	},

	'click .js-searchButton' : function(event , template) {
		event.preventDefault();
		let value = $('.js-searchProperty').val().trim();
		let divSearch = $('.divSearch');
		if (value !== ''){
			template.searchQuery.set(value);
			template.searching.set(false);
			if (divSearch.hasClass('hide')){
				divSearch.removeClass('hide');
			};
		}
	},
	'click .js-more' : function(event , template){
		event.preventDefault();
		let divLess = $('.div-less');
		let divMore = $('.div-more');
		divLess.toggleClass('hide');
		divMore.toggleClass('hide');
	},

	'click .js-less' : function(event , template){
		event.preventDefault();
		$('.div-more').toggleClass('hide');
		$('.div-less').toggleClass('hide');
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
	'click .js-submitEmail' : function(event , template){
		event.preventDefault();
		let name = $('#js-name').val().trim();
		let email = $('#js-email').val().trim();
		if (email !== '' && name !== ''){
			if (!flagstone_holdings.validateEmail(email)){
					alert('Please use a valid email address');
					return false;
			}
			let subscription = {}
			subscription.name = name;
			subscription.email = email;
			subscription.date_subscribe = new Date();
			Meteor.call('saveSubscription', subscription, function (error, result) {
				if (! error){
    				sAlert.success('We have you covered now. You will start receiving property notifications', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    				$('.js-subscriptionModal').modal('hide');
    				name.val('');
    				email.val('');
    			}
    			else{
    				sAlert.error(error.reason);
    			}
			});
		}
	},


});


Template.showadvert.helpers({
	advert: function () {
		return Advert.find({});
	}
});


Template.home.helpers({
	hotProperty : function(){
		return Tripart_Property.find().fetch();
	}
})
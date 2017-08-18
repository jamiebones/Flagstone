
Template.searchBox.onCreated(function(){

	let template = Template.instance();
	template.searchQuery = new ReactiveVar();
    template.subscribe('showState');

})

Template.searchBox.rendered = function(){
	let tabActive = Session.get('sessionTabActive');
	switch (tabActive) {
		case 'land':
			activaTab('land');
			break;
		case 'property':
			activaTab('property');
			break;
		default:
		    activaTab('property');

	}
}


Template.searchBox.events({
		'click #js-searchProperty': function (event , template) {
		 event.preventDefault();
		 //set the seaching variable to true
		 Session.set('sessionTabActive' , 'property')
		let searchObject = {};
		//get all the search data from the individual web element on the page
		let radio = $('[name="radioHouse"]'),
		    searchText = $('#js-searchHideText'),
		    minPrice = $('#js-minPrice'),
		    maxPrice = $('#js-maxPrice'),
		    category = $('.js-selectCategory'),
		    genFeatures = $('#js-generalFeatures'),
		    outFeatures = $('#js-outdoorFeatures'),
		    inFeatures = $('#js-indoorFeatures'),
		    state = $('.js-selectState'),
		    lga = $('.js-selectLGA'),
		    bedroom = $('.js-bedroom'),
		    bathroom = $('.js-bathroom'),
		    garage = $('.js-garage'),
		    staffQuaters = $('#js-staffQuaterSearch');

		    let para = $('js-message');
		    para.val(''); 
		    radio.each(function(){
		    	let rad = $(this);
		    	if (rad.is(':checked')){
		    		searchObject.sale_lease = rad.val();
		       }
		 });

		   
		    if (searchText.val()!== "" ){
		    	 searchObject.searchText = searchText.val();
		    }

		    if (parseInt(minPrice.val()) !== 0 && parseInt(minPrice.val()) !== 'undefined' && parseInt(minPrice.val()) !== ''){
		    	searchObject.minPrice = parseInt(minPrice.val());
		    }

		    if (parseInt(maxPrice.val()) !== 0 && parseInt(maxPrice.val()) !== 'undefined' && parseInt(maxPrice.val()) !== ''){
		    	searchObject.maxPrice = parseInt(maxPrice.val());
		    }
		    
		   
		    if (parseInt(bedroom.val()) !== 0 && parseInt(bedroom.val()) !== '' && parseInt(bedroom.val()) !== undefined){
		    	searchObject.bedroom = parseInt(bedroom.val());
		    }
		    
		    if (parseInt(bathroom.val()) !== 0 && parseInt(bathroom.val()) !== '' && parseInt(bathroom.val()) !== undefined){
		    	searchObject.bathroom = parseInt(bathroom.val());
		    }

		    if (parseInt(garage.val()) !== 0 && parseInt(garage.val()) !== '' && parseInt(garage.val()) !== undefined){
		    	searchObject.garage = parseInt(garage.val());
		    }

		    if (parseInt(staffQuaters.val()) !== 0 && parseInt(staffQuaters.val()) !== '' && parseInt(staffQuaters.val()) !== undefined){
		    	searchObject.staffQuaters = parseInt(staffQuaters.val());
		    }
		    
		    if (category.val() !== '0'){
		    	searchObject.type = category.val();
		    }

		    if (genFeatures.val() !== null){
		    	searchObject.general_features = genFeatures.val()

		    }

		    if (outFeatures.val() !== null){
		    	searchObject.out_features = outFeatures.val();
		    }

		    if (inFeatures.val() !== null){
		    	searchObject.in_features = inFeatures.val()
		    }

		    if (state.val() !== '0'){
		    	searchObject.state = state.val();
		    }

		    if (lga.val() !== '0'){
		    	searchObject.lga = lga.val();
		    }

		     if (_.isEmpty(searchObject)){
    	             return false
      		   }

			Session.set('searchParameter', searchObject);
			Router.go('/search');
			activaTab('property');
		
	},


	'click #js-searchPropertyLessDetails'  : function(event , template){
		event.preventDefault();
		//set the seaching variable to true
		Session.set('sessionTabActive' , 'property')
		let para = $('js-message');
		para.val('');
		let searchTerm = $('#js-searchPropertyTextLess').val();
		let radio = $('[name="radioHouse"]');
		let searchObj = {};
		if (searchTerm !== ''){
			searchObj = searchTerm
		}
		radio.each(function(){
				let rad = $(this);
				if (rad.is(':checked')){
					searchObj.sale_lease = rad.val();
				}
		});

		 if (_.isEmpty(searchObj)){
    	             return false
      		   }
      
		Session.set('searchParameter', searchObj);
		Router.go('/search');
		activaTab('property');
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

	'click .js-searchButton' : function(event , template){
		event.preventDefault();
		//set the seaching variable to true
		Session.set('sessionTabActive' , 'land');
		let minPrice = $('#js-minPriceLand');
		let maxPrice = $('#js-maxPriceLand');
		let para = $('js-message');
		para.val('');
		let searchText = $('.js-searchLand').val();
		let radio = $('[name="radioLand"]');
		let searchObj = {};
		if (searchText !== ""){
             searchObj.searchText = searchText;
		}
		radio.each(function(){
				let rad = $(this);
				if (rad.is(':checked')){
					searchObj.sale_lease = rad.val();
				}
		});

		if (parseInt(minPrice.val()) !== 0 && parseInt(minPrice.val()) !== 'undefined' && parseInt(minPrice.val()) !== ''){
		    	searchObj.minPrice = parseInt(minPrice.val());
		    }

		if (parseInt(maxPrice.val()) !== 0 && parseInt(maxPrice.val()) !== 'undefined' && parseInt(maxPrice.val()) !== ''){
		    	searchObj.maxPrice = parseInt(maxPrice.val());
		    }
		    

		
		 if (_.isEmpty(searchObj)){
    	             return false
      	 }
      
		Session.set('searchParameterLand', searchObj);
		Router.go('/search_land');
		activaTab('land');

	},

	'click .js-showLand' : function(event , template){
		event.preventDefault();
		let div = $('.divLand');
		let link = $('.js-showLand');
		div.toggleClass('hide');
		if (div.hasClass('hide')){
			link.html('More Details');
			let icon = link.closest('<i>');
			icon.removeClass('fa-chevron-down');
			icon.addClass('fa-chevron-down');
		}
		else{
			link.html('Less Details');
			let icon = link.closest('.icon');
			icon.removeClass('fa-chevron-up');
			icon.addClass('fa-chevron-down')
		}
	}
	
});



Template.searchBox.helpers({
	
	property (){
		let property = Tripart_Property.find();
		if (property) {
			return property;
		}
	},

	 getState () {
        return StateCollection.find({}).fetch();
    },


});


function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};


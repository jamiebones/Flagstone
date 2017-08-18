

Template.viewPropertyDetails.onCreated(function(){
	let template = Template.instance();
	template.propertyData = new ReactiveVar();
	let data = template.data.oneProperty;
	template.propertyData.set(data);
	template.subscribe('showAdvert');


});


Template.viewPropertyDetails.rendered = function(){
	let template = Template.instance();
	template.$("#propertyViewCarousel").carousel({
		interval : 2000
	});
}


Template.viewPropertyDetails.events({
	'click .js-saveSearch': function (event , template) {
		event.preventDefault();
		if (localStorage){
			let id = event.currentTarget.dataset.id
			let property = template.propertyData.get();
			//try and get the localStorage saved in the system if available please fucking update it
			let storedData = localStorage.getItem('savedPropertySearch');
			let savedAlready = false
			if (storedData){
				storedData = JSON.parse(storedData);
				_.each(storedData , (value , index)=> {
					if (storedData[index]._id === id){
							storedData[index] = property;
							localStorage.setItem('savedPropertySearch' , JSON.stringify(storedData));
							savedAlready = true;
							sAlert.success('search updated', {effect: 'genie', 
    					    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
					}	
				});

				if (! savedAlready){
					storedData.push(property);
					localStorage.setItem('savedPropertySearch' , JSON.stringify(storedData));
					sAlert.success('new search result added', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}	
			}

			else{
		    //i have not saved local storage before i am going to save it now
					let propertyArray = [];
					propertyArray.push(property);
					localStorage.setItem('savedPropertySearch' , JSON.stringify(propertyArray));
					sAlert.success('search saved!', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
			}
			
		}

		else{
				sAlert.success('please you cannot save your search result please update your browser', {effect: 'genie', 
	    		position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});		
		}
	}
});


Template.viewPropertyDetails.helpers({
	oneProperty() {
		return this.oneProperty;
	}
});
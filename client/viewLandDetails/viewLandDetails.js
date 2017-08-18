

Template.viewLandDetails.onCreated(function(){
	let template = Template.instance();
	template.landData = new ReactiveVar();
	let data = template.data.oneLand;
	template.landData.set(data)
	template.subscribe('showAdvert');
});


Template.viewLandDetails.rendered = function(){
	
}


Template.viewLandDetails.events({
	'click .js-saveSearch': function (event , template) {
		event.preventDefault();
		if (localStorage){
			let id = event.currentTarget.dataset.id
			let land = template.landData.get();
			//try and get the localStorage saved in the system if available please fucking update it
			let storedData = localStorage.getItem('savedLandSearch');
			let savedAlready = false
			if (storedData){
				storedData = JSON.parse(storedData);
				_.each(storedData , (value , index)=> {
					if (storedData[index]._id === id){
							storedData[index] = land;
							localStorage.setItem('savedLandSearch' , JSON.stringify(storedData));
							savedAlready = true;
							sAlert.success('search updated', {effect: 'genie', 
    					    position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
					}	
				});

				if (! savedAlready){
					storedData.push(land);
					localStorage.setItem('savedLandSearch' , JSON.stringify(storedData));
					sAlert.success('new search result added', {effect: 'genie', 
    				position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
				}	
			}

			else{
		    //i have not saved local storage before i am going to save it now
					let landArray = [];
					landArray.push(land);
					localStorage.setItem('savedLandSearch' , JSON.stringify(landArray));
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


Template.viewLandDetails.helpers({
	oneLand() {
		return this.oneLand;
	}
});
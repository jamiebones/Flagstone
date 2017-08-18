Template.viewSaveProperty.onCreated(function(){
	let template = Template.instance();
		template.subscribe('showAdvert');

	template.propertyData = new ReactiveVar();
	let storedData = localStorage.getItem('savedPropertySearch');
		if (storedData){
			storedData = JSON.parse(storedData);
			template.propertyData.set(storedData);
		}

})




Template.viewSaveProperty.helpers({
	savedProperty(){
		return Template.instance().propertyData.get();
	}
});




Template.viewSaveProperty.events({
	'click .js-removeSearch': function (event , template) {
		event.preventDefault();
		let id = event.currentTarget.dataset.id;

		let storedData = template.propertyData.get();
		_.each(storedData , (value , index)=> {
			if (storedData[index]._id === id){
				storedData.splice(index , 1);
		       	template.propertyData.set(storedData);
		       	localStorage.setItem('savedPropertySearch' , JSON.stringify(storedData));  	
			}

		});

		if (storedData.length == 0){
			Router.go('/');
		}
		
	}
});
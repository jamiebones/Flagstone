
Template.searchPageResult.onCreated(function(){
	
		let template = Template.instance();
		template.subscribe('showAdvert');

});


Template.searchPageResult.rendered = function () {
	let template = Template.instance();
    template.$('#js-generalFeatures').css('height' , parseInt($("#js-generalFeatures option").length * 20));
    template.$('#js-outdoorFeatures').css('height' , parseInt($("#js-outdoorFeatures option").length * 20));
    template.$('#js-indoorFeatures').css('height' , parseInt($("#js-indoorFeatures option").length * 20)); 

};





Template.searchPageResult.events({
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

	
});


Template.searchPageResult.helpers({
	property() {
		return this.property
	}
});



Template.searchPageLand.onCreated(function(){
	
		let template = Template.instance();
		template.subscribe('showAdvert');

});
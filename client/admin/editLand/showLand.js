

let propVar = new ReactiveVar();


Template.showLand.onCreated(function(){
	let template = Template.instance();
    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

	template.autorun( () => {
		template.subscribe('showRecentLands' , template.searchQuery.get() , () => {
			setTimeout( () => {
				 template.searching.set( false );
				} , 300);
		});
       
	});
});


Template.showLand.rendered = function () {
    
};



Template.showLand.events({
	'change .js-selectCategory' : function(event , template){
        event.preventDefault();

        var value = $('.js-selectCategory').val();

        if (value !== 0){

        	template.searchQuery.set(value);
        	template.searching.set(true);  
        }

        if ( value === '0'){
        	template.searchQuery.set('');

        }

    },

   
 'click .js-editData' : function(event , template){
        debugger;
        event.preventDefault();
        let landId = this._id;
        Router.go('/admin/edit_land/?id=' + landId);
    },
 
  'keyup [name="search"]' : function (event , template) {
        event.preventDefault();
        let value = event.target.value.trim();
        //let divSearch = $('.divSearch');
        if (value !== '' || event.keyCode === 13){
            template.searchQuery.set(value);
            template.searching.set(false);
        }

        if (value === ''){
            template.searchQuery.set(value);
        }
    },
});


Template.showLand.helpers({
	searching (){
		return Template.instance().searching.get();
	},
     
    query (){
    	return Template.instance().searchQuery.get();
    },

    land() {
    	let land = FlagStoneLand.find();
    	if (land){
    		return land;
    	}
    },
});
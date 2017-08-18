Template.registerHelper('count' , function(arr){
	if (arr instanceof Array){
		return arr.length
	}
	else{
		return arr
	}

})


Template.registerHelper('first' , function(index){
	if (index == 0) {
		return 'active'
	}
});


Template.registerHelper('addZero' , function(number){
	return '0' + (number);
});


Template.registerHelper('startYear', function(){
    	var yearArr = [];
    	var yearDate = new Date();
    	var yearEnd = yearDate.getFullYear();
    	for (var i = 1980; i <= yearEnd; i++){
    		yearArr.push(i);
    	}
    	
    	return yearArr;
    }),

Template.registerHelper('endYear' , function(){
    	var yearArr = [];
    	var yearDate = new Date();
    	var yearEnd = yearDate.getFullYear();
    	for (var i = 1980; i <= yearEnd; i++){
    		yearArr.push(i);
    	}
    	return yearArr;
    });

Template.registerHelper('propertyCategory' , function(){
	var category = [];
	category.push('Flat');
	category.push('Duplex');
	category.push('Block of flat');
	category.push('Bungalows');
	category.push('Corpers lodge');
	category.push('Hostel');
	category.push('Hotels');
	category.push('Self contain');
	category.push('One room apartment');
	return category;
});

Template.registerHelper('generalFeatures' , function(){
	let general = [];
	general.push('Alarm');
	general.push('Borehole');
	general.push('Club House');
	general.push('Electric Fence');
	general.push('Golf Course');
	general.push('Gym');
	general.push('Intercom');
	general.push('Laundry');
	general.push('Pets Allowed');
	general.push('Satelite');
	general.push('Sea View');
	general.push('Security Post');
	general.push('Squash Court');
	general.push('Storage');
	general.push('Tennis Court');
	general.push('Wheel Chair Friendly');
	return general
});

Template.registerHelper('outdoorFeatures' , function(){
	let general = [];
	general.push('Access Gate');
	general.push('Balcony');
	general.push('Deck');
	general.push('Fence');
	general.push('Garden');
	general.push('Irrigation System');
	general.push('Patio');
	general.push('Pool');
	general.push('Staff Quarters');
	
	return general
});

Template.registerHelper('indoorFeatures' , function(){
	let general = [];
	general.push('Entrance Hall');
	general.push('Family Tv Room');
	general.push('Fireplace');
	general.push('Guest Toilet');
	general.push('Kitchen');
	general.push('Pantry');
	general.push('Spa Bath');
	general.push('Study');
	general.push('Walk in Closet');
	
	return general
});

Template.registerHelper('title' , function(){
	var title = [];
	title.push('Mrs');
	title.push('Prof');
	title.push('Prof (Mrs)');
	title.push('Dr(Mrs)');
	title.push('Arch');
	title.push('Arch(Mrs)');
	title.push('Engr');
	title.push('Engr(Mrs)');
	return title;
});

Template.registerHelper('formatDate' , function(date){
	 if(date){
	 		return moment(date).format('MM/DD/YYYY');
	 }
});

Template.registerHelper('shortWord' , function(word){
	var wordToShorten = word;
    var newWord = wordToShorten.substr(0 , 300);
	return newWord +  '----'
});

Template.registerHelper('formatMoney' , (money)=> {
	Meteor.call('formatMoney' , money , function(error , result){
		if (result){
			return result
		}

	});
});


Template.registerHelper('getName' , (userId) => {
	let user = Meteor.users.findOne(userId);
	if (user){
		return user.profile.name;
	}

	else{
		return 'Client';
	}
})

Template.registerHelper('formatDate2' , function(date){
	 if(date){
	 		
	 		return moment(date).startOf('second').fromNow();
	 }
});


Template.registerHelper('getClient' , (userId) => {
	let user = Meteor.users.findOne(userId);
	if (user){
		return true;
	}

	else{
		return false;
	}
});

Template.registerHelper('showIndex' , (index) => {
	return (index + 1)
});

Template.registerHelper('showStatus', (status)=> {
	if (status){
		return 'success'
	}
	else{
		return 'danger'
	}
});

Template.registerHelper('isCurrentUser', ( currentUser ) => {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper('disableIfAdmin', ( userId ) => {
  if ( Meteor.userId() === userId ) {
    return Roles.userIsInRole( userId, 'super-admin' , Roles.GLOBAL_GROUP) ? "disabled" : "";
  }
});

Template.registerHelper('selected', ( v1, v2 ) => {
  return v1 === v2 ? true : false;
});


Template.registerHelper('displayTodayDate' , () => {
	let todayDate  = new Date();
	let monthArray = ['January' , 'February' , 'March', 'April' , 'May' , 'June', 'July' , 'August' , 'September' ,'October','November', 'December']
	let dayArray = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday', 'Friday' , 'Saturday'];
	let date = todayDate.getDate();
	let month = todayDate.getMonth();
	let year = todayDate.getFullYear();
	let day = todayDate.getDay();

	let theDate = dayArray[day]  + ' ' + date + ' ' + monthArray[month] + ' ' + year;

	return theDate;

})
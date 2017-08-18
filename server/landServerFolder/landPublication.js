Meteor.publish('showLand' , function(lga) {
	if (lga){
	return FlagStoneLand.find({"location.lga" : lga});
	}
});


Meteor.publish('getOneLand' , function(landID) {
	if (landID){
		return FlagStoneLand.find({"_id" : landID});
	}
});

Meteor.publish('showRecentLands' , function(search){
	let query = {},
	    projection = {limit : 10, sort :{date_added : -1}}

	if (search){
		let regex = new RegExp(search , 'i');
		query = {
			$or : [
				{"location.lga" : regex},
				{"location.state" : regex}
			]

		}
		projection.limit = 100;
	}

	return FlagStoneLand.find(query , projection);
});

Meteor.publish('searchLand' , function(search){

	if (search){
		let query = {} ,
	    projection = {limit : 100 , sort: {date_added : 1}};

    if (search.searchText){
		let regex = new RegExp(search.searchText, 'i');
		query = {

			$or : [
					{ "location.state" : regex},
					{ "location.lga" : regex},
			]

	}
}

     if (search.minPrice && search.maxPrice){

		query["amount.amount"] = {"$gt" : search.minPrice , "$lt" : search.maxPrice }

	}

    else{

    	if (search.minPrice){
		   query["amount.amount"] =  {"$lte" : search.minPrice};
	     }

         if (search.maxPrice){
		   query["amount.amount"] = {"$gte" : search.maxPrice};
	     }

	}

	if (search.sale_lease){
		  query["sale_lease"] =  search.sale_lease;
	   }

	return FlagStoneLand.find(query , projection);

	}
});

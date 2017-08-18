Meteor.publish('showProperty' , function(type) {
	if (type){
	return Tripart_Property.find({"type" : type});
	}
});


Meteor.publish('getOneProperty' , function(propertyID) {
	if (propertyID){
		return Tripart_Property.find({"_id" : propertyID});
		}
});

Meteor.publish('showRecentProperties' , function(search){
	let query = {},
	    projection = {limit : 5, sort :{date_added : -1} , 
	    fields : {"sale_lease" : 1 , "location.address" : 1 ,
	              "owner.name" : 1 , "property_review" : 1,
	              "date_added" : 1 , "amount.amount" : 1,
	              "active" : 1 , "pictures" : 1}}

	if (search){
		query = {"type" : search}

		projection.limit = 100;
	}

	return Tripart_Property.find(query , projection);
});

Meteor.publish('searchProperty' , function(search){
	if (search){
	let query = {} ,
	    projection = {limit : 100 , sort: {date_added : 1}};

	if ( search.type ){
		let regex = new RegExp(search, 'i');
		query = {
			$or : [	
					{ "type" : regex},
					{ "location.state" : regex},
					{ "location.lga" : regex},
			]
		};

	}

	if (search.sale_lease){
		query["sale_lease"] =  search.sale_lease;
	}


	return Tripart_Property.find(query , projection);
	}
});


Meteor.publish('searchQuery' , function(searchObj){
    if (searchObj){
	let search = searchObj;
	
	let query = {}
	let regex = new RegExp(search.searchText, 'i');

	if (search.searchText){
		//query.type =  regex
		query = {
			$or : [				
					{ "type" : regex},
					{ "location.state" : regex},
					{ "location.lga" : regex},
			]
		};
	}
	
	if (search.general_features){
		query.general_features = {$all : search.general_features} 
	}

	if (search.out_features){
		query.outdoor_features = {$all : search.out_features} 
	}

	if (search.in_features){
		query.indoor_features = {$all : search.in_features} 
	}

	if (search.state){
		let state = search.state
		query["location.state"] =  state;
	}

	if (search.lga){
		let lga = search.lga
		query["location.lga"] =  search.lga;
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
	

	if (search.staffQuaters){
		query["other_facilities.staffQuaters"] = search.staffQuaters;
	}

	if (search.bedroom){
		query["other_facilities.bedroom"] = search.bedroom;
	}

	if (search.bathroom){
		query["other_facilities.bathroom"] = search.bathroom;
	}

	if (search.garage){
		query["other_facilities.garage"] = search.garage;
	}

	if (search.sale_lease){
		query["sale_lease"] =  search.sale_lease;
	}
    

   // console.log(query);
	return Tripart_Property.find(query);
   }
});

Meteor.publish('showHotProperties' , function(){
	let query = {"active" : true},
	projection = {limit : 4, sort :{date_added : -1}};

	return Tripart_Property.find(query , projection);
});

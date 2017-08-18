//function to use to shorten the review
     let shortWord =   function (word){
      var wordToShorten = word;
      var newWord = wordToShorten.substr(0 , 400);
     return newWord +  '----'
    }

Meteor.methods({
  sendSubscriptionEmail: function(propertyId) {
    let subscriptionData = EmailSubscription.find({} , {fields :{"email" : 1 ,"name" :1}}).fetch();
   
    let emailAddress = subscriptionData.map(function(data){
      return {email : data.email, name : data.name}
    });
    //getting the data i will display to the client
    let getData = Tripart_Property.find(propertyId).fetch();

    let dataObj = {
           _id : getData[0]._id,
           sale_lease : getData[0].sale_lease,
           type : getData[0].type,
           location : getData[0].location,
           pictures : getData[0].pictures,
           property_review : shortWord(getData[0].property_review),
           amount : getData[0].amount
    }

    let data = [];
    data.push(dataObj);
   
for (var i =0; i < emailAddress.length; i++){
          var emailData = {
          data : data,
          name : emailAddress[i].name,
          mainTitle : "Property Alert",
          unsubscribe: "http://"
    }; 

    let email = emailAddress[i].email;
    let body = EmailGenerator.generateHtml("subscriptionTemplate", emailData);
    (function(){
        Meteor.call("sendMailgunEmail",
                "noreply@Flagstoneholdings.com",
                "From Flagstone Administrator",
                 [email],
                "Property Alert",
                body);
        })(i);
      }
    }

});
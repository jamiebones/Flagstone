Router.configure({
  //layoutTemplate: 'mainLayout',
  loadingTemplate : 'loadingTemplate',

});



Router.route('/', {
  name : 'home',
  template : 'home',
  layoutTemplate:'mainLayout'

});

Router.route('/aboutus', {
  name : 'aboutus',
  template : 'aboutUs',
  layoutTemplate:'mainLayout'

});

Router.route('/contactus', {
  name : 'contact',
  template : 'contact',
  layoutTemplate:'mainLayout'

});


Router.route('/administration/add_property', {
  name : 'add_property',
  template : 'addProperty',
  layoutTemplate:'mainLayout',

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },

});

Router.route('/administration/add_land', {
  name : 'add_land',
  template : 'addLand',
  layoutTemplate:'mainLayout',

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },

});

Router.route('administration/edit_property' , {

  name : 'propertyEdit',
  template : 'editProperty',
  layoutTemplate : 'mainLayout',
  data : function () {
    let propertyId = this.params.query.id;
        return {property : Tripart_Property.findOne({"_id" : propertyId})}
      },

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },
    waitOn : function () {
    let propertyId = this.params.query.id;
    return Meteor.subscribe('getOneProperty' , propertyId);
  }
});


Router.route('administration/edit_land' , {

  name : 'landEdit',
  template : 'editLand',
  layoutTemplate : 'mainLayout',
  data : function () {
    let landId = this.params.query.id;
        return {land : FlagStoneLand.findOne({"_id" : landId})}
      },

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },
    waitOn : function () {
    let landId = this.params.query.id;
    return Meteor.subscribe('getOneLand' , landId);
  }
});





Router.route('/search' , {

  name : 'searchPageResult',
  template : 'searchPageResult',
  layoutTemplate : 'mainLayout',
  data : function () {
    debugger;
    console.log(Session.get('searchParameter'))
    let search = Session.get('searchParameter')
        return {property : Tripart_Property.find()}
      },
    waitOn : function () {
    let search = Session.get('searchParameter');
    return Meteor.subscribe('searchQuery' , search);
  }
});

Router.route('/search_land' , {

  template : 'searchPageLand',
  layoutTemplate : 'mainLayout',
  data : function () {
    let search = Session.get('searchParameterLand')
        return {land : FlagStoneLand.find()}
      },
    waitOn : function () {
    let search = Session.get('searchParameterLand');
    return Meteor.subscribe('searchLand' , search);
  }
});





Router.route('/administration/show_recent_properties', {
  name : 'showProperty',
  template : 'showProperty',
  layoutTemplate:'mainLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },
});




Router.route('/administration/show_recent_lands', {
  name : 'showLand',
  template : 'showLand',
  layoutTemplate:'mainLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },
});


Router.route('/view_property/:_id' , {
  name : 'viewProperty',
  template : 'viewPropertyDetails',
  layoutTemplate : 'mainLayout',
  data : function () {
    let propertyId = this.params._id;
        return {oneProperty : Tripart_Property.findOne({"_id" : propertyId})}
      },
  waitOn : function () {
    let propertyId = this.params._id;
    return Meteor.subscribe('getOneProperty' , propertyId);
  }
});



Router.route('/manage_saved_search' , {
  name : 'viewSaveProperty',
  template : 'viewSaveProperty',
  layoutTemplate : 'mainLayout',
});


Router.route('/view_land/:_id' , {
  name : 'viewLand',
  template : 'viewLandDetails',
  layoutTemplate : 'mainLayout',
  data : function () {
    let landId = this.params._id;
        return {oneLand : FlagStoneLand.findOne({"_id" : landId})}
      },
  waitOn : function () {
    let landId = this.params._id;
    return Meteor.subscribe('getOneLand' , landId);
  }
});


Router.route('/manage_saved_landsearch' , {
  name : 'viewSaveLand',
  template : 'viewSaveLand',
  layoutTemplate : 'mainLayout',
});




Router.route('/view_chat' , {

  name : 'view_chat',
  template : 'chat',
  layoutTemplate : 'mainLayout',
  data : function () {
    let chatId = this.params.query.chatId;
        return {ChatMessage : Chat.findOne(chatId)}
      },

  waitOn : function () {
     let chatId = this.params.query.chatId;
     return Meteor.subscribe('getChatMessage' , chatId);
  }
});


//Admin router functions

Router.route('/view_message_details' , {

  name : 'messageDetails',
  template : 'viewContactMessage',
  layoutTemplate : 'mainLayout',
  data : function () {
    let msgId = this.params.query.msgId;
        return {message : Contact_Message.findOne(msgId)}
      },
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },

  waitOn : function () {
     let msgId = this.params.query.msgId;
     return Meteor.subscribe('getContactMessage' , msgId);
  }
});

Router.route('/message/archived_message' , {
  name : 'archivedMessage',
  template : 'archivedMessage',
  layoutTemplate : 'mainLayout',
  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },
  data : function () {
        return {message : Contact_Message.find({"message_read" : true}).fetch()};
      },

  waitOn : function () {
     return Meteor.subscribe('getArchivedMessages');
  }
});



Router.route('/administration/create_account', {
  name : 'registerAccount',
  template : 'registerAccount',
  layoutTemplate:'mainLayout',

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },

});


Router.route('/administration/manage_account', {
  name : 'manageUsers',
  template : 'manageUsers',
  layoutTemplate:'mainLayout'

});






//Account router functionalities
Router.route('/verify-email/:token' , {
  controller : 'AccountController',
  action : 'verifyEmailAddress'
});

AccountController = RouteController.extend({
  fastRender : true,
  data : function (){},
  onBeforeAction : function(){
    this.next()
  },
  verifyEmailAddress : function(){
    let verificationToken = this.params.token;
    Accounts.verifyEmail(verificationToken , function(error) {
        if (error){
          sAlert.error(error.reason);
        }
        else{
          sAlert.success('Email verified please proceed to set up your password');
          Router.go('/')
        }
    })
  }
});



Router.route('/administration/add_advert', {
  name : 'add_advert',
  template : 'advert',
  layoutTemplate:'mainLayout',

  onBeforeAction : function () {
    var user = Meteor.user()
    if (! user) {
      //route.go('/signIn')
      this.render('myLogin')
    }
    else{
      this.next();
      //var currentRoute =  Router.current().route.getName();
    }

  },

});


var myPostLogout = function(){
    //example redirect after logout
    Session.set('showChat', '');
    Router.go('/')
}


var addUserHookUp = function(userid , info){

    //if (info.profile.surname == 'admin'){
       // Roles.addUsersToRoles(userid , ['admin']);
   //}

   //else{
      //  Roles.addUsersToRoles(userid , ['sitemember'])
  //  }
}

var mypreSubmitFunction = function(pwd , info){
    //adding the token to the hidden field

}


AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: '',
    termsUrl: '',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    onLogoutHook: myPostLogout,
    //onSubmitHook: mySubmitFunc,
    preSignUpHook: mypreSubmitFunction,
    postSignUpHook: addUserHookUp,

    // Texts
    texts: {
      button: {
          signUp: "Sign Up For An Account"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },


});

AccountsTemplates.removeField ('email');

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 4,
    lowercase: true,
    });

AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/
});

AccountsTemplates.removeField ('password');
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 5
});


AccountsTemplates.addFields([
  
    {
        _id: 'firstname',
        type: 'text',
        displayName: "Firstname",
        required : true,
    },
    {
        _id: 'surname',
        type: 'text',
        displayName: "Surname",
        required : true,
    }
]);

//AccountsTemplates.addField({
   // _id: 'password',
   // type: 'password',
  //  placeholder: {
    //    signUp: "At least six characters"
   // },
   // required: true,
   // minLength: 6,
   // re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
  //  errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
//});


AccountsTemplates.configure({
    defaultLayout: 'mainLayout',
});

AccountsTemplates.configureRoute('signIn' , {
    name : 'signIn',
    path : '/login',
    template : 'myLogin',
    layoutTemplate : 'mainLayout',
    redirect :'/administration/add_property'
});


AccountsTemplates.configureRoute('changePwd' , {
    name : 'changepassword',
    path : '/clubmembers/changepassword',
    template : 'changePassword',
    layoutTemplate : 'mainLayout',
   // redirect :'/clubmembers/home'
});

//AccountsTemplates.configureRoute('signUp' , {
   //name : 'register',
    //path : '/register',
    //template : 'registerTemplate',
    //layoutTemplate : 'mainLayout',
    //redirect : '/'
//});

AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Set Password",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "Please Login",
        signUp: "Sign Up Title",
        verifyEmail: "Verify Email Title",
      }
    }
});


AccountsTemplates.configure({
    texts: {
        button: {
          changePwd: "Change Password",
          enrollAccount: "Set Password",
          forgotPwd: "Forgot Password",
          resetPwd: "Reset Password",
          signIn: "Login",
          signUp: "Register Account",
        }
    }
});


AccountsTemplates.configure({
    texts: {
        info: {
            emailSent: "info.emailSent",
            emailVerified: "info.emailVerified",
            pwdChanged: "info.passwordChanged",
            pwdReset: "info.passwordReset",
            pwdSet: "info.passwordReset",
            signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
            verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
        }
    }
});


AccountsTemplates.configure({
    texts: {
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "error.accounts.Login forbidden",
            mustBeLoggedIn: "error.accounts.Must be logged in",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        }
    }
});

//AccountsTemplates.configureRoute('changePwd');

AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configure({
    defaultLayout: 'accountLayout',
    texts:{
          signUpLink_pre: '',
          signUpLink_link: '',
       }
    

});


AccountsTemplates.configureRoute('enrollAccount' , {
    name : 'setPassword',
    template : 'setPassword',
    layoutTemplate : 'mainLayout',
    redirect :'/administration/add_property'
});

  
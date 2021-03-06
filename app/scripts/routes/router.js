/*global define*/

define([
  'jquery',
  'backbone'
], function ($, Backbone) {
  'use strict';

  var ShowAdRouter = Backbone.Router.extend({
    routes: {
    	"":"login",
    	"mediaownerregistration":"mediaownerregistration",
    	"emailConfirmed":"emailConfirmed",
    	"confirmEmail":"confirmEmail",
    	"register":"register",
    	"incorrectPassword":"incorrectPassword",
    	"layout":"layout",
    	"resetPassword":"resetPassword",
    	"passwordreset":"showPasswordreset",
    	"booking/:orgId":"onlineBooking",
    	"feedBack/:orgId":"feedBackForm"
    },
    
    
    paysucess:function(){
    	
    	alert("pay success");
    },
    
    
    login:function(){
    	
    		var dataTransfer = {SignUpmessage:""};
    		CommonUtils.setDataTransfer(dataTransfer);		
    		require(['views/loginView'], function (LoginView) {
			new LoginView().loadLoginPage();
    		});
    	//oauthAuthorization();
    },
	redirectFromOAuth:function(oauth_token,oauth_token_secret){
		CommonUtils.set("oauth_token",oauth_token);
		CommonUtils.set("oauth_token_secret",oauth_token_secret);
		require(['views/loginView'], function (LoginView) {
			new LoginView().loadLoginPage();
		});
		
		var  loginStatus = CommonUtils.getUser('loginStatus')
		//console.log(loginStatus);
		//alert(loginStatus);
		if( loginStatus == 'E'){
		
			CommonUtils.showErrorMessage("Invalid Credentials");
		}
		else if( loginStatus == 'N'){
			
			CommonUtils.showErrorMessage("No Account Present");
		}
		
	},
	
    emailConfirmed:function(){
    	require(['views/loginView'], function (LoginView) {
			new LoginView().loadLoginPage();
		});
		
		CommonUtils.showSuccessMessage("Welcome to bookmyLED." +"<br>"+"Your e-mail id is confirmed ");
    },
    
    
    confirmEmail:function(){
    	require(['views/loginView'], function (LoginView) {
			new LoginView().loadLoginPage();
		});
    	CommonUtils.showSuccessMessage("Successfully SignUp Please confirm your email");
    },
    
    onlineBooking:function(orgId){
    	console.log(orgId);
    	var organization = {organizationId : orgId};
    	CommonUtils.setOrganization(organization);
    	require(['views/loginView'], function (LoginView) {
			new LoginView().loadBookingPage();
		});    	
    },
    
    feedBackForm:function(orgId){
    	console.log(orgId);
    	var organization = {organizationId : orgId};
    	CommonUtils.setOrganization(organization);
    	require(['views/loginView'], function (LoginView) {
			new LoginView().loadFeedBackPage();
		});    	
    },
    
    incorrectPassword:function(){    	
    	require(['views/loginView'], function (LoginView) {
			new LoginView().loadLoginPage();
		});
    	CommonUtils.showErrorMessage("Invalid Credentials");
    },
    
    resetPassword:function(){
    	
    	
    	require(['views/resetPasswordView'], function (ResetPasswordView) {
    		new ResetPasswordView().loadResetPage();
		});
    },
    
    
    showPasswordreset:function(){
    	
    	
    	require(['views/resetPasswordView'], function (ResetPasswordView) {
    		new ResetPasswordView().loadChangePasswordPage();
		});
    },
    
    mediaownerregistration:function(){
    	
    	
    	require(['views/registrationView'], function (RegistrationView) {
    		new RegistrationView().mediaOwnerRegistration();
		});
    },
    register:function(){
    	
    	require(['views/registrationView'], function (RegistrationView) {
			   new RegistrationView().register();
		});
    },
    
    
    
    
    layout:function(){
    	
    	//console.log("session storage length"+sessionStorage.length);
    	
    	if(sessionStorage.length == 2){
    		
    		  location.href = "";
    		 
 		     // window.location.reload();
    		
    	} else {
    		
    		require(['views/layoutView'], function (LayoutView) {
    		
    		   //console.log("loading default");
			   new LayoutView().renderDefault();
    		});
    	
    	}
    }
    
    
  });
  
  /*ev.router.on("route", function(route, params) {
	   if(route == "layout"){
	      //console.log("Different Page: " + route);
	      that.deleteMarker();
	   }

	});
*/
  return ShowAdRouter;
});

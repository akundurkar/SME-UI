/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/loginModel',
  'text!../templates/resetPassword.html',
  'text!../templates/passwordreset.html'
], function ($, _, Backbone, LoginModel,resetPasswordTemplate,changePasswordTemplate) {

  var ResetPasswordView = Backbone.View.extend({
    events: {
    	"click #resetPassword1" : "resetPassword",
    	"click #changePassword":"saveChangePassword"
    },

    initialize: function () {
     // this.listenTo(this.model, 'change', this.render);
    },
    loadResetPage:function(){
    	this.render();
    },
    
    loadChangePasswordPage:function(){
    	$("#mainBody").html($(this.el).html(_.template(changePasswordTemplate)));
        this.delegateEvents();
    },
    render: function () {
      $("#mainBody").html($(this.el).html(_.template(resetPasswordTemplate)));
      this.delegateEvents();
    },
    
    saveChangePassword:function(){

    	var formData=CommonUtils.getFormDataAsJSON("#changepassword-form .input","input");
    	
    	var loginModel=new LoginModel(formData);
    	
    	loginModel.url=CommonUtils.get("projectUrl")+"/rest/login/changepassword";
    	
    	loginModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			//console.log("Sucess---",response);
    			
    			
    			location.href= "";
    			
    			//check for first time login
    			/*var  loginStatus = CommonUtils.getUser('loginStatus')
    			if( loginStatus == 'Y'){
    			
    			
    			}
    			else
    			{
    				
    				
    			}*/
    		
    		},
    		error: function(model, response, options){
    			if (response.status === 500) {
    				
      				 var template = _.template(genericMessageTemplate);
   		    		  
   		    		  var renderData = {
   		    			  errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		  };
   		    		  
   					  $("#showADMain").html($(me.el).html(template(renderData)));
      			}
    		}
    	 });

    
    },
    
    
    resetPassword:function(){

    	var formData=CommonUtils.getFormDataAsJSON("#resetpassword-form .input","input");
    	
    	var resetModel = new LoginModel(formData);
    	
    	resetModel.url=CommonUtils.get("projectUrl")+"/rest/login/resetpasswordlink";
    	
    	resetModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			//console.log("Sucess---",response);
    			var dataTransfer = {loginError:"Password reset link is sent to your email account please check your email"};
				CommonUtils.setDataTransfer(dataTransfer);
		
				location.href= "";
    			
    		},
    		error: function(model, response, options){
    			if (response.status === 500) {
    				
      				 var template = _.template(genericMessageTemplate);
   		    		  
   		    		  var renderData = {
   		    			  errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		  };
   		    		  
   					  $("#showADMain").html($(me.el).html(template(renderData)));
      			}
    		}
    	 });
    	

    }

    
  });
  return ResetPasswordView;
});

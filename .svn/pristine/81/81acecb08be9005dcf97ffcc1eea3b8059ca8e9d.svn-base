/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/commonModel',
  'text!../templates/businessOwnerRegistration.html',
  'text!../templates/mediaRegistrationLayout.html',
  'text!../templates/messages/generic_message.html'
], function ($, _, Backbone,CommonModel,businessOwnerRegistrationTemplate,mediaRegistrationLayoutTemplate,genericMessageTemplate) {
  'use strict';

  var RegistrationView = Backbone.View.extend({
    tagName: 'div',

    id: 'content',

    className: '',

    events: {
    	
    	"click #mediaOwnerRegistrationBtn":"createAccount",
    	"click #advertizerSignUp":"createAccount",
    	"click #mediaownerregistration":"mediaownerregistration"
    },

    initialize: function () {
     // this.listenTo(this.model, 'change', this.render);
    },
  
    mediaOwnerRegistration:function(){
    	
    	
    	$("#mainBody").html($(this.el).html(_.template(businessOwnerRegistrationTemplate)));
    	// this.$el = this.$el.children();
         // Unwrap the element to prevent infinitely 
         // nesting elements during re-render.
         //this.$el.unwrap();
    	
    },
    
   /* mediaownerregistration:function(){
    	location.href= "#mediaownerregistration";
    },*/
   
    
    
    createAccount:function(){
    	
    	//console.log("Create Account");
    	
    	var registerUserData=CommonUtils.getFormDataAsJSON("#register-user .input","input");
    	
    	var registrationModel=new CommonModel(registerUserData);
    	
    	//console.log(registerUserData);
    	registrationModel.url=CommonUtils.get("projectUrl")+"/rest/registerUser";
    	
    	registrationModel.save(null,{
    		
    		success : function(model, response, options){
    			//console.log("Sucess---",response);    			
    			    			
    			
    			location.href= "#confirmEmail";
    			//require(['views/layoutView'], function (LayoutView) {
    				//new LayoutView().loadLayout();
    			//});
    		},
    		error: function(model, response, options){
    			if (response.status === 500) {
    				
      				 var template = _.template(genericMessageTemplate);
   		    		  
   		    		  var renderData = {
   		    			  errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		  };
   		    		  
   					  $("#showADMain").html($(me.el).html(template(renderData)));
      			}
    			CommonUtils.showSuccessMessage("Our service is temporarly down please visit after some time"+Constants.UPLOADFILELIMIT);
    			location.href= "";
    			//console.log("Error");
    		}
    	 });
    	
    	
    	
    	
    	
    	//$("#mainBody").html($(this.el).html(_.template(mediaOwnerRegistrationTemplate)));
    	
    },
    
    
  });
  return RegistrationView;
});

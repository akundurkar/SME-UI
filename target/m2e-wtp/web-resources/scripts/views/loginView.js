/*global define*/

define([
        
  'jquery',
  'underscore',
  'backbone',
  '../models/loginModel',
  '../models/commonModel',
  '../collections/commonCollection',  
  'text!../templates/login.html',
  'text!../templates/registrationLayout.html',
  'text!../templates/bookOrder/onlineBook.html',
  'text!../templates/bookOrder/feedBack.html',
  'text!../templates/messages/generic_message.html'
  
], function ($, _, 
			 Backbone, 
			 LoginModel,
			 CommonModel,
			 CommonCollection,
			 loginTemplate,
			 RegistrationLayoutTemplate,
			 OnlineBookTemplate,
			 FeedBackTemplate,
			 genericMessageTemplate) {

  var LoginView = Backbone.View.extend({
	  
    events: {
    	
    	"click #submit":"login",
    	"click #resetPassword" : "resetPassword",
    	"click #saveOnlineBooking":"saveOnlineBooking",
    	"click #sendFeedback":"sendFeedback",
    	"click #mediaownerregistration":"mediaownerregistration"
    		
    },

    initialize: function () {
    	this.servicesCollection = new CommonCollection();
		this.staffCollection = new CommonCollection();
		this.locationCollection = new CommonCollection();
		var value;  
		var clientId;
    },
    
    
    loadLoginPage:function(){
    	
    	this.render();
    	
    },
    
    mediaownerregistration:function(){
    	
    	location.href = "#mediaownerregistration";
    },
    
    render: function () {    	
    		
    		$("#mainBody").html($(this.el).html(_.template(loginTemplate)));
    		$("#mediaRegistrationLayout").append(_.template(RegistrationLayoutTemplate));
      
    },
    
    
    resetPassword:function(){
    	
    	$("#mainBody").html($(this.el).html(_.template(loginTemplate)));
    	
    },
    
    
    getAllBranches : function(){

		 var me=this;
		 
		 me.locationCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/listBranchesForOrg?orgId="+CommonUtils.getOrganization("organizationId");
	   
	     me.locationCollection.fetch({
		   
	    	 							cache:false,
		   
	    	 							success: function (model, response, options) {			    	
		    	
	    	 									me.getServicesList();
		
	    	 							},
	    	 							
	    	 							error:function(model, xhr, options){
		
	    	 							}
	    	 							
	     });

   },


    getServicesList:function(){

		var me = this;

		me.servicesCollection.url = CommonUtils.get("projectUrl")+"/rest/listServices?organisationId="+CommonUtils.getOrganization("organizationId");//+CommonUtils.getUser("organisationId");

		me.servicesCollection.fetch({
	  
							cache:false,
	   
							success: function (model, response, options) {			    	
	    	
									me.getstaffList();
		
							},error:function(model, xhr, options){
	  		
									me.renderUsersNotFoundTemplate();  	
									
							}
							
		});
		
	},
	
	
	
	
	getstaffList:function(){
		
		var me = this;

		me.staffCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/searchStaffNameList?organisationId="+CommonUtils.getOrganization("organizationId");//+CommonUtils.getUser("organisationId");

		me.staffCollection.fetch({
  
						cache:false,
   
						success: function (model, response, options) {			    	
    	
							me.renderOnlinebooking();
	
						 },error:function(model, xhr, options){
  		
							 	me.renderUsersNotFoundTemplate(); 
							 	
						 }
						 
		});
		
},

    
    loadBookingPage:function(){
    	//location.href = ;

    	var me=this;
    	console.log("onlien booking");
    	me.getAllBranches();
    
    	
    	
    },

    renderOnlinebooking:function(){
    	var me = this;
    	var renderData = {					   		   
				
    			//serviceDetailsList : me.servicesCollection.models,
    			locationList:me.locationCollection.models,
				servicesList:me.servicesCollection.models,			
				staffList : me.staffCollection.models,				
				cName :"" ,
					
				errorMsg:"Error Message"
					
		};
    	
    	var template = _.template(OnlineBookTemplate);
        
		$("#mainBody").html($(this.el).html(template(renderData)));
		
		
    	//$("#mainBody").html($(this.el).html(_.template()));
		//$("#showADMain").html($(this.el).html(_.template(OnlineBookTemplate)));
		
		this.delegateEvents();
    	
    },
    
    saveOnlineBooking:function(){
    	console.log("saving online booking wait");
    	var numItems = $('.repeatingSection').length;
    	var servicesArray = new Array();
    	for (i = 1; i <= numItems; i++) 
    	{ 
    	
    		var serviceId = "serviceId_"+i;
    		var staffId = "staffId_"+i;
    		var booking = new Object();
         
    		//serviceId
    		var serviceIdString=serviceId+" option:selected";
    		booking.serviceId =$("#"+serviceIdString).val();
        
    		//serviceId
    		var staffIdString=staffId+" option:selected";
    		booking.staffId =$("#"+staffIdString).val();

    		var signleServiceModel=new CommonModel(booking);
    		servicesArray.push(signleServiceModel);
    	}

    	var bookingServices = new CommonCollection(servicesArray);
    	var existingUser = $("input[name=existsUser]:checked").val();    	
    	var time = $("#time").val();
    	var bookingDate = $("#bookingDate").val();
    	var bookOrderModel = new CommonModel();

    	bookOrderModel.set("existingUser",existingUser);
    	bookOrderModel.set("time",time);
    	bookOrderModel.set("bookingDate",bookingDate);
    	bookOrderModel.set("serviceAndStaffList",bookingServices);
    	bookOrderModel.set("branchId",CommonUtils.getBranch("branchId"));
    	bookOrderModel.set("organizationId",CommonUtils.getOrganization("organizationId"));    	

    	if(existingUser !=="NEWUSER")
    	{
    		var mobile = $("#mobile").val();
    		mobile = mobile.trim();
    		bookOrderModel.set("mobile",mobile);    	
    	}else{
    		
    		var fname = $("#newClientFname").val();
    		var lname = $("#newClientLname").val();
    		var newClientMobile = $("#newClientMobile").val();
    		newClientMobile = newClientMobile.trim();
    		bookOrderModel.set("newClientMobile",newClientMobile);
    		bookOrderModel.set("clientFirstName",fname);
    		bookOrderModel.set("clientLastName",lname);
    		bookOrderModel.set("clientEmail",$("#newClientEmail").val());
    	}
    	
    	bookOrderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/newClient";
    	
    	bookOrderModel.save(null,{
    		
    		success : function(model, response, options){
    			console.log("Sucess---",response);
    			$('.next').click();
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
    
    loadFeedBackPage:function(){
        
    	var me=this;
    	
    	me.renderFeedBackPage();
   
    },
    
    renderFeedBackPage:function(){
    	
    	var me = this;
    	
    	var renderData = {					   		   
				
		};
    	
    	var template = _.template(FeedBackTemplate);
        
		$("#mainBody").html($(this.el).html(template(renderData)));
		
		this.delegateEvents();
    	
    },
    
    sendFeedback :function(e){
   
    	console.log("saving online feedback wait");
    	
    	var me = this;
    	
    	var clientId =  $(e.currentTarget).attr("clientId");
    	
    	var orderId  = $(e.currentTarget).attr("orderId");
    	
    	var branchId  = $(e.currentTarget).attr("branchId");
    	
		var formData = CommonUtils.getFormObj("feedback-form"); 
		
		var feedBackFormModel = new CommonModel(formData);
		
    	feedBackFormModel.url= CommonUtils.get("projectUrl")+"/rest/booking/setFeedback";
    	
    	var serviceExperience = $("input[name=serviceExperience]:checked").val();
    	feedBackFormModel.set("serviceExperience",serviceExperience);
		
		var offerExperience = $("input[name=offerExperience]:checked").val();
		feedBackFormModel.set("offerExperience",offerExperience);
		
		feedBackFormModel.set("serviceExperienceQue",100000001);
		feedBackFormModel.set("offerExperienceQue",100000002);
		feedBackFormModel.set("commentsQue",100000003);
		
		feedBackFormModel.set("clientId",clientId);
		feedBackFormModel.set("branchId",branchId);
		
		feedBackFormModel.set("orderId",orderId);
    	
    	feedBackFormModel.save(null,{
    		
    		success : function(model, response, options){
    			console.log("Sucess---",response);
    			CommonUtils.showSuccessMessage("Feed back save sucessfully!!");
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
    
    login:function(){
    	 
    		var formData=CommonUtils.getFormDataAsJSON("#login-form .input","input");
    	
    		var loginModel=new LoginModel(formData);
    	
    		loginModel.url=CommonUtils.get("projectUrl")+"/rest/login";
    	
    		var target = document.getElementById("loginSpinner");
    		
    		spinner = new Spinner();
    		
		    spinner.spin(target);
		    
		    $("#loginSpinner").attr("style","position: absolute; width: 0px; z-index: 2000000000;top:40% !important;left:50%!important;");
    	
		    loginModel.save(null,{
    		
		    		success : function(model, response, options){
    			
		    				CommonUtils.setUser(response);
    			
		    				var  loginStatus = CommonUtils.getUser('loginStatus')
		    				
		    				if( loginStatus == 'Y'){
    			
		    					console.log("Profile status.."+response.profileCompletion);
			    						if(response.profileCompletion != 100){	
			    							console.log("Profile status1222.."+response.profileCompletion);
			    							require(['views/layoutView'], function (LayoutView) {
	        				
			    									new LayoutView().getAllBusinessType(response.profileCompletion);
			    									
			    							});
	    				
			    						}else{
	    	    	
			    							require(['views/layoutView'], function (LayoutView) {
	    				
			    									new LayoutView().getAllBranches();
			    									
			    							});
			    							
			    						}
		    						
		    				}else{
    				
				    					if(loginStatus == 'E'){
				    						
				    							var dataTransfer = {loginError:""};
				    							
				    							CommonUtils.setDataTransfer(dataTransfer);
		    	    			
				    							location.href= "";
				    							
				    					}else{
				    							var dataTransfer = {loginError:""};
				    							
				    							CommonUtils.setDataTransfer(dataTransfer);
				    							
				    							location.href= "";
				    							
				    					}
		    				}
    		
		    		},
		    		error: function(model, response, options){
		    				
		    						var me=this;
    			
		    						if (response.status === 500) {
    				
		    								var template = _.template(genericMessageTemplate);
   		    		  
		    								var renderData = {
		    										
		    										errorMessage:"There was some unexpected error. Please Try again or report the Problem",
		    								
		    								};
   		    		  
		    								$("#showADMain").html($(me.el).html(template(renderData)));
		    								
		    						}else if (response.status === 0) {
    				
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
  
  return LoginView;
  
});

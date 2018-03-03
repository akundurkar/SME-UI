/*global define*/

define([ 'jquery',       
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/Campaign/campaignManager.html',
        'text!../templates/Campaign/newCampaign.html',
        'text!../templates/Campaign/editCampaign.html'
       
        
], function ($,
		CommonModel,
		CommonCollection,
		campaignManagerTemplate,
		newCampaignTemplate,
		editCampaignTemplate
		) {
	
  var campaignManagerView = Backbone.View.extend({
	  
	  events: {
	    	
	    	"click #campaignManager":"getCampaignManagerList",
	    	"click #newCampaign":"newCampaign",
	    	"click #editCampaign":"editCampaign",
	    	"click #saveNewCampaign":"saveNewCampaign",
	    	"click #saveAddOfferTypeBtn":"saveAddOfferTypeBtn",	
	    	"click #addOfferTypeBtn":"addOfferTypeBtn",
	    	"click #changeOrderStatus":"changeOrderStatus"
	    },


    initialize: function () {
    	this.commonCollection = new CommonCollection();
    	this.campaignlCollection =new  CommonCollection();
    	this.eventCommonCollection =new CommonCollection();
    	this.festivalCommonCollection =new CommonCollection();
    	this.campaignTemplateCollection =new CommonCollection();
    },
    
    editCampaign:function(){
    	
		var me = this;

		var renderData = {					   		   
		
					errorMsg:"Error Message"
		}; 
	 
		$("#showADMain").html($(this.el).html(_.template(editCampaignTemplate)));
	
		this.delegateEvents();

},
    
    saveNewCampaign: function () 
    {
    	
    	var me = this;
    	console.log("saving data!!!");
    	
    	//console.log("save Cancel Reason");
    	
    	var formData = CommonUtils.getFormDataAsJSON("#newCampaignForm-form .input","input"); 
    	var offerType = $("#addOfferTypeBtn").attr("offerType");
    	var offerTypeId;
    	if(offerType == 1)
    		offerTypeId = $("#offerType option:selected").val();
    	else
    		offerTypeId = $("#festivals option:selected").val();    	
    	var sendBy = $("#sendby option:selected").val();
    	var reminderNotice = $("#remindernotice").val();
    	var customerTypeArr = $('select#customerType').val();
    	var offerDate= $("#offerStartDate").val();
    	var endDate= $("#offerEndDate").val();
    	var emailSubject= $("#emailSubject").val();
    	var emailTemplate= $("#emailTemplate").val();
    	var smsTemplate= $("#smsTemplate").val();
    	
    	var newCampaignModel = new CommonModel(formData);
    	console.log(newCampaignModel);
    	
    	newCampaignModel.url= CommonUtils.get("projectUrl")+"/rest/saveNewCampaign";
    	newCampaignModel.set("offerTypeId",offerTypeId);
    	newCampaignModel.set("sendBy",sendBy);
    	newCampaignModel.set("reminderNotice",reminderNotice);
    	newCampaignModel.set("offerDate",offerDate);
    	newCampaignModel.set("endDate",endDate);
    	newCampaignModel.set("emailSubject",emailSubject);
    	newCampaignModel.set("emailTemplate",emailTemplate);
    	newCampaignModel.set("smsTemplate",smsTemplate);
    	newCampaignModel.set("customerType",customerTypeArr);
    	newCampaignModel.set("branchId",CommonUtils.getBranch("branchId"));
    	newCampaignModel.set("offerDiscountPer",$("#offerDiscountPer").val());
    	
    	//$('#addNewServiceGroupModal').modal('hide');
    	newCampaignModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Campaign save sucessfully!!");
    			me.getCampaignManagerList();
    			console.log("Sucess---",response);
    			
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
    
    
    saveAddOfferTypeBtn:function(){
    	var me = this;
    	
    	var formData = CommonUtils.getFormDataAsJSON("#addOfferType-form .input","input"); 
    	var offerType = $("#addOfferTypeBtn").attr("offertype");
    	
    	var addOfferTypeDataModel = new CommonModel(formData);
    	addOfferTypeDataModel.set("userId",CommonUtils.getUser("userId"));
    	addOfferTypeDataModel.set("offerType",offerType);
    
    	console.log(addOfferTypeDataModel);    	
    	    	
    	addOfferTypeDataModel.url= CommonUtils.get("projectUrl")+"/rest/saveOfferTypeDetails";
    	
   /* 	$('#addtype').modal('hide');
    	$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();*/
    	addOfferTypeDataModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Offer Type save successfully!!");
    			console.log("Sucess---",response);

    		},
    		error: function(model, response, options){
    			
    			if (response.status === 500) {
    				
      				 var template = _.template(genericMessageTemplate);
   		    		  
   		    		  var renderData = {
   		    			  errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		  };
   		    		  
   					  $("#showADMain").html($(me.el).html(template(renderData)));
      			}
    			me.showHomeScreen();
    		}
    	 });

 
    },
    

 
    getCampaignManagerList:function(){
    
		var me=this;
		   
		//me.campaignlCollection.url = CommonUtils.get("projectUrl")+"/rest/getCampaignDetails?branchId=100000000";
		me.campaignlCollection.url = CommonUtils.get("projectUrl")+"/rest/getCampaignDetails?branchId="+CommonUtils.getBranch("branchId");		
	   
		me.campaignlCollection.fetch({
		   
		   cache:false,
		   
		    success: function (model, response, options) {			    	
		    	
		    	me.renderCampaignList();
  		
		  	},error:function(model, xhr, options){
		  		
		  		me.renderUsersNotFoundTemplate();  	
		  	}
		});

    },
    
   /* getCampaignTemplate:function(){
        
		var me=this;
		   
	
		me.campaignTemplateCollection.url = CommonUtils.get("projectUrl")+"/rest/getCampaignTemplate?branchId="+CommonUtils.getBranch("branchId");		
	   
		me.campaignTemplateCollection.fetch({
		   
		   cache:false,
		   
		    success: function (model, response, options) {			    	
		    	
		    	me.renderCampaignList();
  		
		  	},error:function(model, xhr, options){
		  		
		  		me.renderUsersNotFoundTemplate();  	
		  	}
		});

    },
    */
    
    
    renderCampaignList : function(){
    	
    	var me = this;
    	
    	console.log("in render function");
    	console.log(me.campaignlCollection.models);
    	console.log("list of data");
	   	
    	var renderData = {
	   			campaignList:me.campaignlCollection.models,
	   			/*campaigntemplateList:me.campaignTemplateCollection.models,*/
	    		 errorMsg:"Error Message"
	      }; 
   	 
	   	var template = _.template(campaignManagerTemplate);
	    
	    $("#showADMain").html($(this.el).html(template(renderData)));
	    this.delegateEvents();

    },
    
    newCampaign:function(){
    	var me = this;
    	me.getEventList();
    },
    
    addOfferTypeBtn:function(){
    	var me = this;
    	me.getEventList();
    },
    
    getEventList:function(){
        
    	var me = this;
   
		me.eventCommonCollection.url = CommonUtils.get("projectUrl")+"/rest/searcEventNameList?userId="+CommonUtils.getUser("userId");
		
		 me.eventCommonCollection.fetch({
			  
			   cache:false,
			   
			    success: function (model, response, options) {			    	
			    	
			    	me.getFestivalList();
	  		
	  	},error:function(model, xhr, options){
	  		
	  		me.renderUsersNotFoundTemplate();  	
	  	}
		});
    },
    
    getFestivalList:function(){
        
    	var me = this;
   
		me.festivalCommonCollection.url = CommonUtils.get("projectUrl")+"/rest/searcFestivalNameList?userId="+CommonUtils.getUser("userId");
		
		 me.festivalCommonCollection.fetch({
			  
			   cache:false,
			   
			    success: function (model, response, options) {			    	
			    	
			    	me.renderEventAndFestivalDetail();
	  		
	  	},error:function(model, xhr, options){
	  		
	  		me.renderUsersNotFoundTemplate();  	
	  	}
		});

		
    },
    
    renderEventAndFestivalDetail:function()
    {
    	var me = this;
    	
    	
    	 var renderData = {					   		   
        		 errorMsg:"Error Message",
        		 eventNameList : me.eventCommonCollection.models,
        		 festivalNameList : me.festivalCommonCollection.models
        		 
          }; 
    	 
    	 var template = _.template(newCampaignTemplate);
    	    
    	    $("#showADMain").html($(this.el).html(template(renderData)));
    	   	 
    	    this.delegateEvents();
    	    	
    },
    
    changeOrderStatus:function(){
    	var me = this;
    	var offerModel = new CommonModel();
    	offerModel.set("offerId",CommonUtils.getOffer("offerId"));
    	offerModel.set("offerStatus",CommonUtils.getOffer("offerStatus"));        	   
    	    	
    	offerModel.url= CommonUtils.get("projectUrl")+"/rest/changeOfferStatus";
    	
    	console.log("changing offer status!!!");
    	
    	offerModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Offer Status changed sucessfully!!");
    			console.log("Sucess---",response);
    		},
    		error: function(model, response, options){
    			
    			if (response.status === 500) {
    				
      				 var template = _.template(genericMessageTemplate);
   		    		  
   		    		  var renderData = {
   		    			  errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		  };
   		    		  
   					  $("#showADMain").html($(me.el).html(template(renderData)));
      			}
    			me.showHomeScreen();
    		}
    });
    }
   
  });
  return campaignManagerView;
});
    
  
  
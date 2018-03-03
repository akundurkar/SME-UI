/*global define*/

define([
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/services/services.html',
        'text!../templates/services/newServices.html',
        'datatables', 
        'dataTablescolVis',
        'dataTablestableTools',
        'datatablesresponsive'
        
], function (
		CommonModel,
		CommonCollection,
		ServicesTemplate,
		NewServicesTemplate,
		D1,D2,D3,D4) {
	
  var ServicesView = Backbone.View.extend({
	  
    events: {
    	
    	"click #saveServiceGroupBtn":"saveServiceGroupBtn",
    	"click #newService":"newService",
    	"click #saveServiceDetailBtn":"saveServiceDetailBtn",
    	"click #cancelAddService":"cancelAddService",
        "click #deleteServiceDetails":"deleteServiceDetails"

    },
    
    initialize: function () {
    	
    	
    	this.ServiceCollection = new CommonCollection();
    	this.serviceGroupId;
    	var serviceId;
        this.deleteCommonModel = new CommonModel();
        
    },

 
    getAllServices:function(){
  
			var me=this;
		   
			//ToDo:change Static  branchId
			me.ServiceCollection.url = CommonUtils.get("projectUrl")+"/rest/listServices?organisationId="+CommonUtils.getUser("organisationId");

			me.ServiceCollection.fetch({
		   
									cache:false,
		   
									success: function (model, response, options) {			    	
		    	
											me.renderAllServices();
  		
									},error:function(model, xhr, options){
  		
											me.renderUsersNotFoundTemplate();  	
											
									}
									
			});

    },
    
    
    renderAllServices:function(){
    	
    				var me = this;
    	
    				var renderData = {	
   			
    						servicesList:me.ServiceCollection.models,
    						
    						errorMsg:"Error Message"
    				}; 
   	 
    				var template = _.template(ServicesTemplate);
    
    				$("#showADMain").html($(this.el).html(template(renderData)));
	    
    				this.delegateEvents();

    },
    

    saveServiceGroupBtn:function(){
    	
    			var me = this;
    	
    			var formData = CommonUtils.getFormDataAsJSON("#groupName-form .input","input"); 
    	
    			var serviceModel = new CommonModel(formData);
    	
    			serviceModel.url= CommonUtils.get("projectUrl")+"/rest/addNewServiceGroup";
    	
    			serviceModel.set("userId",CommonUtils.getUser("userId"));
    	
    			 $('#addNewServiceGroupModal').modal('hide');
    			 $('body').removeClass('modal-open');
    			 $('.modal-backdrop').remove();
    
    			serviceModel.save(null,{
    		
    		         				success : function(model, response, options){
    			                            
    		         					    CommonUtils.showSuccessMessage("Service Group save sucessfully!!");
    		         					       		         					  
    		         					  
    		         					    me.getAllServices();
    		         					
    	             
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
    
    
    newService:function(ev){
    	
				var me = this;
		
				me.serviceGroupId=$(ev.currentTarget).attr("serviceGroupId");
		
				var renderData = {					   		   
				
							errorMsg:"Error Message"
		
				}; 
		
				$("#showADMain").html($(this.el).html(_.template(NewServicesTemplate)));
		
				this.delegateEvents();

    },
    
    saveServiceDetailBtn:function(){
    	
    			var me = this;
    
    			var formData = CommonUtils.getFormDataAsJSON("#newService-form .input","input"); 
    	
    			var pricingtime = $("#pricingTime option:selected").val();
    			var treatmentType = $("#treatmentType option:selected").val();
    			var durationTime = $("#durationTime option:selected").val();
    			var availableFor = $("#availableFor option:selected").val();
    			var extraTimeType = $("#extraTimeType option:selected").val();
    			var tax = $("#tax option:selected").val();
    	
    			var serviceModel = new CommonModel(formData);
      	
    			serviceModel.url= CommonUtils.get("projectUrl")+"/rest/addNewService";
    	
    			serviceModel.set("userId",CommonUtils.getUser("userId"));
    	
    			serviceModel.set("pricingTime",pricingtime);
    			serviceModel.set("treatmentType",treatmentType);
    			serviceModel.set("durationTime",durationTime);
    			serviceModel.set("availableFor",availableFor);
    			serviceModel.set("extraTimeType",extraTimeType);
    			serviceModel.set("tax",tax);
    	
    			serviceModel.set("serviceGroupId",me.serviceGroupId);
    	
    			serviceModel.save(null,{
    		
    						success : function(model, response, options){
	    	 			                
    							        CommonUtils.showSuccessMessage("New Service save sucessfully!!");
    									
    							        me.getAllServices();
	
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
    
    cancelAddService:function(){
    	var me=this
 		me.getAllServices();

	},
    
    
    //delete service
    deleteServiceDetails : function(e){
    	
    		var me = this;
    		
    		alert("Do you really want to Remove this service ");
    		
    		me.serviceId =  $(e.currentTarget).attr("serviceId");
    		
    		console.log("in delete service details "+me.serviceId);
    		
    		me.deleteCommonModel.set("serviceId",me.serviceId); 
    			          	    																	
    		me.deleteCommonModel.url = CommonUtils.get("projectUrl")+"/rest/deleteServiceDetails";
    	
    		me.deleteCommonModel.save(null,{
    		
    							success : function(model, response, options){	
    			
    									CommonUtils.showSuccessMessage("Service  Deleted..!!");
    			
    									me.getAllServices();
    			
    									me.delegateEvents();

    							},
    							error: function(model, response, options){
    			
    									CommonUtils.showErrorMessage("Service Delete Error..!!");
    			
    			
    							}
    		
    	    });
    	
    }
    
  });
  
  return ServicesView;
  
});

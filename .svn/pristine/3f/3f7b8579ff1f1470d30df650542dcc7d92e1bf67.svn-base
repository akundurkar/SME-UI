/*global define*/

define(['jquery',   
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/staff/staff.html',
        'text!../templates/staff/newStaffModel.html',
        'text!../templates/staff/editNewStaffModel.html',
        'text!../templates/staff/staffSchedule.html'
       
        
       
        
], function($,
		CommonModel,
		CommonCollection,
		staffTemplate,
		NewStaffModelTemplate,
		EditNewStaffModelTemplate,
		staffScheduleTemplate
		) {
	
  var StaffView = Backbone.View.extend({
	  
    events: {
    	
    	//"click .getAllServicesName":"getAllServicesDetail"
    	"click #saveStaffDetailsBtn":"saveNewStaffDetailsBtn",
    	"click #newStaff":"newStaff",    	
    	"click #cancelNewStaffDetails":"staff",
    	"click #cancelStaffSchedule":"staff",
    	"click #cancelUpdateStaffDetails":"staff",
    	"click .editStaff":"editStaff",
    	"click #updateEditedStaffDetailsBtn":"updateEditedStaffDetailsBtn",
    	"click #staffSchedule":"getForEditStaffSchedule",
    	"click #saveEditStaffScheduleBtn":"saveEditStaffScheduleBtn",
    	"click #saveNewClosedDateBtn":"saveClosedDates"
    },

    initialize: function () {
    	
    	this.serviceCollection = new CommonCollection();
    	this.staffCollection = new CommonCollection();
    	this.locationCollection = new CommonCollection();
    	this.staffEditModel = new CommonModel();
    	this.staffEditResModel = new CommonModel();
    	this.staffEditcollection = new CommonCollection();
    	this.updateStaffEditDataModel = new CommonModel();
    	this.updateEditStaffAddressDataModel = new CommonModel();
    	/*this.updateEditStaffServiceDataModel = new CommonModel();*/
    	this.staffScheduleCollection = new CommonCollection();
    	this.closedDatesCollection = new CommonCollection();
    	var staffId ;
    },
    
    
    staff:function(){
    	
    		var me = this;
    
    		me.getAllServicesDetail();
   	
    },
    
    newStaff:function(){
    	
		var me = this;
		
		var renderData = {					   		   
					
				errorMsg:"Error Message",
				
				serviceDetailsList : me.serviceCollection.models,
				
				staffDetailsList : me.staffCollection.models,
				
				locationList : me.locationCollection.models,
	 
		}; 

		var template = _.template(NewStaffModelTemplate);

		$("#showADMain").html($(this.el).html(template(renderData)));

		this.delegateEvents();

   },
    
    
    getAllServicesDetail:function(){
        
    			var me = this;
   
    			me.serviceCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/searchServiceDetailsList?userId="+CommonUtils.getUser("userId");
		
    			me.serviceCollection.fetch({
			  
    									cache:false,
			   
    									success: function (model, response, options) {			    	
			    	
    											me.getAllLocations();
    										
	  		
    									},error:function(model, xhr, options){
	  		
    											me.renderUsersNotFoundTemplate();  	
    											
    									}
    									
    			});
		
    },
    
    getAllLocations:function(){
		   
					 var me=this;
					   
					 me.locationCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/list?userId="+CommonUtils.getUser("userId");
				   
				     me.locationCollection.fetch({
		   
					    	 			cache:false,
						   
					    	 			success: function (model, response, options) {			    	
						    	
					    	 					me.getAllClosedDates();
				 		
					    	 			},error:function(model, xhr, options){
				 		
					    	 			}
					    	 			
				     });

    },
 
    
     getAllStaffDetail:function(){
        
    	 			var me = this;
   
    	 			me.staffCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/searchStaffDetailsList?userId="+CommonUtils.getUser("userId");
		
    	 			me.staffCollection.fetch({
			  
    	 							cache:false,
			   
    	 							success: function (model, response, options) {			    	
			    	
    	 									me.renderServicesDetail();
	  		
    	 							},error:function(model, xhr, options){
	  		
    	 									me.renderUsersNotFoundTemplate();  	
    	 							}
    	 							
    	 			});

     },
    
    
    renderServicesDetail:function(){
    				
    				var me = this;
    				
    				var renderData = {					   		   
    							
    						errorMsg:"Error Message",
    						
    						serviceDetailsList : me.serviceCollection.models,
    						
    						staffDetailsList :me.staffCollection.models,
    						
    						locationList:me.locationCollection.models,
    						
    						closedDatesList:me.closedDatesCollection.models
        		 
    				}; 
    	 
    				var template = _.template(staffTemplate);
    	    
    				$("#showADMain").html($(this.el).html(template(renderData)));
    
    				//$('.nav-tabs a[href="#s3"]').tab('show');
    				this.delegateEvents();
    	
    },
    
    saveNewStaffDetailsBtn:function(){
    	
    			var me = this;
    			
    			var saveStaffDetailsFormData = CommonUtils.getFormObj("details-form"); 
    			
    			var saveStaffAddressFormData = CommonUtils.getFormObj("address-form"); 
    			
    			/*var saveStaffServiceFormData = CommonUtils.getFormObj("service-form"); */
    	
    			var staffDetailsMasterDataModel = new CommonModel(saveStaffDetailsFormData);
    			
    			var staffAddressMasterDataModel = new CommonModel(saveStaffAddressFormData);
    			
    			/*var staffServiceMasterDataModel = new CommonModel(saveStaffServiceFormData);*/
    			
    			staffDetailsMasterDataModel.set("userId",CommonUtils.getUser("userId"));
    			
    			var userPermission = $("#userPermission option:selected").val();

    			staffDetailsMasterDataModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/saveStaffDetails";    
    			
    			staffDetailsMasterDataModel.set("userPermission",userPermission);
    			
    			
    			if (staffAddressMasterDataModel != null)
    	    	{
    	    		
    				staffDetailsMasterDataModel.set("address",staffAddressMasterDataModel.get('address'));
    				staffDetailsMasterDataModel.set("city",staffAddressMasterDataModel.get('city'));
    				staffDetailsMasterDataModel.set("state",staffAddressMasterDataModel.get('state'));
    				staffDetailsMasterDataModel.set("pincode",staffAddressMasterDataModel.get('pincode'));
    	    		
    	    	}  	
    			
    			staffDetailsMasterDataModel.save(null,{
    		
    						success : function(model, response, options){
    			                
    								CommonUtils.showSuccessMessage("New Staff save sucessfully!!");    								    							
    								me.staff();
    			
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
    	
    	
    	editStaff:function(ev){
    		  
    		    var me = this;
    			
    			me.staffId = $(ev.currentTarget).attr("id");
    			
    			me.staffEditModel = new CommonModel();	
    			
    			me.staffEditModel.set("staffId", me.staffId);
    			
    			me.staffEditModel.set("userId", CommonUtils.getUser("userId"))
    			
    			me.staffEditModel.url = CommonUtils.get("projectUrl")+"/rest/masterdata/staffEditDetails"
    			
    			me.staffEditModel.save(null,{
    				
    						  success : function(model, response, options){
    							 
    					    			var staffEditResModel = new CommonModel(response);
    					    			me.staffEditcollection = new CommonCollection(staffEditResModel);
    					    			me.renderStaffEditList();
    					    			
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

    	renderStaffEditList:function(){

    		 	var me=this;

    		 	if(me.staffEditcollection.length > 0){

    			   		     var renderData = {					   
    			   				   
    			   		    		serviceDetailsList : me.serviceCollection.models, 
    			   		    		 
    			   				   	staffEditList : me.staffEditcollection.models,
    			   				   	
    			   				    locationList : me.locationCollection.models
    			   				    
    			   				    
    			
    			   		      }; 
    			   	   
    			   		     var template = _.template(EditNewStaffModelTemplate);
    			   		     
    			   		     $("#showADMain").html($(this.el).html(template(renderData))); 
    			   		   
    			   		     me.delegateEvents();
    		  
    		 	}

    	}, 
    		
    	updateEditedStaffDetailsBtn : function(){
    			
    			var me =this;
    			
    			var updateEditStaffDetailsData = CommonUtils.getFormObj("updateDetails-form");
    			
    			var updateEditStaffAddressData = CommonUtils.getFormObj("updateAddress-form");
    			
    			/*var updateEditStaffServiceData = CommonUtils.getFormObj("updateService-form");*/
    			
    			me.updateStaffEditDataModel = new CommonModel(updateEditStaffDetailsData);
    			
    			me.updateEditStaffAddressDataModel = new CommonModel(updateEditStaffAddressData);
    			
    			/*me.updateEditStaffServiceDataModel = new CommonModel(updateEditStaffServiceData);*/
    			
    			me.updateStaffEditDataModel.set("staffId",me.staffId);
    			
    			me.updateStaffEditDataModel.set("userId",CommonUtils.getUser("userId"));
    		
    			var userPermission = $("#userPermission option:selected").val();
	       	
    			me.updateStaffEditDataModel.url=CommonUtils.get("projectUrl")+"/rest/masterdata/updateStaffEditDetails";
	    
		    	me.updateStaffEditDataModel.set("userPermission",userPermission);
	       	
			if (me.updateEditStaffAddressDataModel != null)
	    	{
	    		
	    		me.updateStaffEditDataModel.set("address",me.updateEditStaffAddressDataModel.get('address'));
	    		me.updateStaffEditDataModel.set("city",me.updateEditStaffAddressDataModel.get('city'));
	    		me.updateStaffEditDataModel.set("state",me.updateEditStaffAddressDataModel.get('state'));
	    		me.updateStaffEditDataModel.set("pincode",me.updateEditStaffAddressDataModel.get('pincode'));
	    		
	    	}  	
	       	   	
	       	me.updateStaffEditDataModel.save(null,{
	       		
		       		success : function(model, response, options){
		       			
		       						CommonUtils.showSuccessMessage(" Staff updated sucessfully!!");    								    							
		       						
		       						me.staff();
		       		},
		       		
		       		error: function(model, response, options){
		       			
		       				
		       					
		       		}
		       		
	       	 });
    	
    	},
    	
    	getForEditStaffSchedule:function(ev){
    		
				var me = this;
				
				me.staffId =  $(ev.currentTarget).attr("staffId");
				   
				me.staffScheduleCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/getStaffScheduleDetails?staffId="+me.staffId;
				
				console.log("staffSchedule"+me.staffScheduleCollection);
				
				me.staffScheduleCollection.set("staffId",me.staffId);
				
				me.staffScheduleCollection.fetch({
					  
							cache:false,
					   
							success: function (model, response, options) {			    	
					    	
										me.renderStaffScheduleDetail();
			  		
							},error:function(model, xhr, options){
			  		
										me.renderUsersNotFoundTemplate();  	
							}
							
				});
	
	
		}, 
		
		renderStaffScheduleDetail:function(){
			
				var me = this;
				
				var renderData = {	
									staffId :me.staffId,
						
									staffScheduleDetailsList : me.staffScheduleCollection.models,
			    		         	
			    		         	errorMsg:"Error Message"
			    }; 
				 
				 
				var template = _.template(staffScheduleTemplate);
				    
				$("#showADMain").html($(this.el).html(template(renderData)));
				   	 
			    this.delegateEvents();
			
		},
		
		saveEditStaffScheduleBtn:function(){
	    	
		    	var me = this;
		   
		    	var staffId = $("#staffId").val();
		    	
		    	var formData = CommonUtils.getFormDataAsJSON("#editStaffSchedule-form .input","input");  
		   	
		    	var openTimeSun = $("#openTimeSun").val();
		    	var closeTimeSun = $("#closeTimeSun").val();
		    	var openTimeMon = $("#openTimeMon").val();
		    	var closeTimeMon = $("#closeTimeMon").val();
		    	var openTimeTue = $("#openTimeTue").val();
		    	var closeTimeTue = $("#closeTimeTue").val();
		    	var openTimeWed = $("#openTimeWed").val();
		    	var closeTimeWed = $("#closeTimeWed").val();
		    	var openTimeThr = $("#openTimeThr").val();
		    	var closeTimeThr = $("#closeTimeThr").val();
		    	var openTimeFri = $("#openTimeFri").val();
		    	var closeTimeFri = $("#closeTimeFri").val();
		    	var openTimeSat = $("#openTimeSat").val();
		    	var closeTimeSat = $("#closeTimeSat").val();
		    	
		    	var editStaffScheduleDataModel = new CommonModel(formData);
		    	
		    	editStaffScheduleDataModel.set("staffId", staffId);
		    	
		    	editStaffScheduleDataModel.set("openTimeSun",openTimeSun);
		    	editStaffScheduleDataModel.set("closeTimeSun",closeTimeSun);
		    	editStaffScheduleDataModel.set("openTimeMon",openTimeMon);
		    	editStaffScheduleDataModel.set("closeTimeMon",closeTimeMon);
		    	editStaffScheduleDataModel.set("openTimeTue",openTimeTue);
		    	editStaffScheduleDataModel.set("closeTimeTue",closeTimeTue);
		    	editStaffScheduleDataModel.set("openTimeWed",openTimeWed);
		    	editStaffScheduleDataModel.set("closeTimeWed",closeTimeWed);
		    	editStaffScheduleDataModel.set("openTimeThr",openTimeThr);
		    	editStaffScheduleDataModel.set("closeTimeThr",closeTimeThr);
		    	editStaffScheduleDataModel.set("openTimeFri",openTimeFri);
		    	editStaffScheduleDataModel.set("closeTimeFri",closeTimeFri);
		    	editStaffScheduleDataModel.set("openTimeSat",openTimeSat);
		    	editStaffScheduleDataModel.set("closeTimeSat",closeTimeSat);
		    	
		    	console.log(editStaffScheduleDataModel);    	
		    	    	
		    	editStaffScheduleDataModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/setStaffSchedule";
		    	
		    	
				editStaffScheduleDataModel.save(null,{
		    		
		    		success : function(model, response, options){
		    			
		    						CommonUtils.showSuccessMessage(" Staff Schedule Update sucessfully!!");       
		    			
		    						me.getAllLocations();
	
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
		
		saveClosedDates:function(){
			
			var me = this;
	    	
	    	var closedDatesformData = CommonUtils.getFormDataAsJSON("#newClosedDate-form .input","input"); 
	    	
	    	var ClosedDatesModel = new CommonModel(closedDatesformData);
	    	
	    	ClosedDatesModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/setClosedDates";
	    	ClosedDatesModel.set("branchId",CommonUtils.getBranch("branchId"));
	 
	   /*	$('#newClosedModal').modal('hide');
	    	$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();*/
			
			ClosedDatesModel.save(null,{
	    		
	    				success : function(model, response, options){
	    			 
	    								CommonUtils.showSuccessMessage("Closed Dates save sucessfully!!");
	    								
	    								me.staff();

	    				},
	    				error: function(model, response, options){
	    			
	    							if (response.status === 500) {
	    				
	    									var template = _.template(genericMessageTemplate);
	   		    		  
	    									var renderData = {
	   		    				  
	    											errorMessage:"There was some unexpected error. Please Try again or report the Problem",
	    									
	    									};
	   		    		  
	    									$("#showADMain").html($(me.el).html(template(renderData)));
	    									
	    							}
	    							
	    							me.staff();
	    				}
	    				
	    				
	    	 });
    	
		},    
		
		getAllClosedDates:function(){
			
			var me=this;
	   
			me.closedDatesCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/getAllClosedDates?branchId="+CommonUtils.getBranch("branchId");
   
			me.closedDatesCollection.fetch({
	   
						cache:false,
	   
						success: function (model, response, options) {			    	
	    	
									me.getAllStaffDetail();
		
						},error:function(model, xhr, options){
		
						}
          
			});

},

/*renderClosedDates:function(){
	
			var me = this;

			var renderData = {
  			
						closedDatesList:me.closedDatesCollection.models,
						
   		  
			}; 
	 
			var template = _.template(staffTemplate);

			$("#showADMain").html($(this.el).html(template(renderData))); 

			this.delegateEvents();
 
},*/
	
 
  });
  
 
  
  return StaffView;
  
});
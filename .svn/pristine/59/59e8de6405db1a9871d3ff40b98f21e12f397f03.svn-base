/*global define*/

define([      
        'dropzone',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/setup/setUp.html',
        'text!../templates/setup/companyProfileDetails.html',
        'text!../templates/setup/companyProfileEditDetails.html',
        'text!../templates/setup/companyLocations.html',
        'text!../templates/setup/editCompanyLocations.html',
        'text!../templates/setup/schedule.html',
        'text!../templates/setup/photos.html',
        'text!../templates/setup/editOwnerDetails.html',
        'text!../templates/setup/discountTypes.html',
        'text!../templates/setup/paymentTypes.html',
        'text!../templates/setup/taxes.html',
        'text!../templates/setup/notification.html',
        'text!../templates/setup/referralSources.html',
        'text!../templates/setup/cancellationReason.html',
        'text!../templates/setup/branchSchedule.html',
        'text!../templates/messages/generic_message.html'
        
        
], function (DropZone,
		CommonModel,
		CommonCollection,
		SetUpTemplate,
		CompanyProfileDetailsTemplate,
		CompanyProfileEditDetailsTemplate,
		CompanyLocationsTemplate,
		EditCompanyLocationsTemplate,
		scheduleTemplate,
		PhotosTemplate,
		EditOwnerDetailsTemplate,
		DiscountTypesTemplate,
		PaymentTypesTemplate,
		TaxesTemplate,
		NotificationTemplate,
		ReferralSourcesTemplate,
		CancellationReasonTemplate,
		branchScheduleTemplate,
		genericMessageTemplate) {
	
  var SetupView = Backbone.View.extend({
	  
    events: {
    	"click #companyProfileDetails":"companyProfileDetails",
    	"click #saveCompanyProfileBtn":"saveCompanyProfileBtn",
    	
    	"click #editCompanyProfileDetails":"getCompanyProfileDetails",
    	"click #updateCompanyProfileBtn":"updateCompanyProfileDetails",	
    	
    	"click #editOwnerDetails":"getOwnerDetails",
    	"click #updateOwnerDetailsBtn":"updateOwnerDetailsBtn",
    	
    	"click #companyLocations":"getAllLocations",
    	"click #saveCompanyLocationBtn":"saveCompanyLocationBtn", 
    	"click #saveBranchScheduleBtn":"saveBranchScheduleBtn",
    	"click #shedule":"getScheduleDetail",
    	"click #deleteCompanyLocation":"deleteCompanyLocation",
    	"click #editCompanyLocation":"getCompanyLocation",
    	"click #updateCompanyLocationBtn":"updateCompanyLocationBtn",
    	
    	"click #photos":"getImageGallery",
    	"click #uploadImageMedia":"imageUpload",
    	"click #uploadMenuCardMedia":"menuCardUpload",
    	"click .deleteImage":"deleteImage",
    	
    	"click .deleteMenuCard":"deleteMenuCard",
    		
    	"click #discountTypes":"discountTypes",
    	
    	"click #paymentTypes":"paymentTypes",
    	
    	"click #taxes":"getAllTaxes",
    	"click #saveTaxTypeBtn":"saveTaxTypeBtn",
    	"click #deleteTaxDetails":"deleteTaxDetails",
    	
    	"click #notification":"notification",
    	
    	"click #referralSources":"getAllReferralSources",
    	"click #saveReferralSourceBtn":"saveReferralSourceBtn",
    	
    	"click #cancellationReason":"getAllCancellationReason",
    	"click #saveCancelReasonBtn":"saveCancelReasonBtn",
    	
    	"click #branchSchedule":"getForEditBranchSchedule",
    	"click #saveEditBranchScheduleBtn":"saveEditBranchScheduleBtn"
    	
    },

    initialize: function () {
    	
    	this.commonCollection = new CommonCollection();
    	this.locationCollection = new CommonCollection();
    	this.companyLocationCollection = new CommonCollection();
    	this.scheduleCollection = new CommonCollection();
    	this.cancellationResonCollection = new CommonCollection();
    	this.taxesCollection = new CommonCollection();
    	this.referralSourcesCollection = new CommonCollection();
    	this.companyProfileRescollection = new CommonCollection();
    	this.getOwnerDetailsResCollection = new CommonCollection();
    	this.companyProfileModel = new CommonModel();
    	this.comProfileDataModel = new CommonModel();
    	this.updateOwnerDetailsModel = new CommonModel();
    	this.mediaCollection = new CommonCollection();
    	this.deleteLocationCommonModel = new CommonModel();
    	this.deleteTaxCommonModel = new CommonModel();
    	this.businessTypeCollection = new CommonCollection();
    	this.branchScheduleCollection = new CommonCollection(); 
    	this.updateEditCompanyLocationDataModel = new CommonModel();
    	this.deleteImageCommonModel = new CommonModel();
    	var branchId;
    	var taxId;
    	var imageId
    	
    },
    

    blank_screen:function(){
    	
    		var me = this;
    
    		var renderData = {					   		   
    		
    					errorMsg:"Error Message"
    		}; 
   	 
    		$("#showADMain").html($(this.el).html(_.template(SetUpTemplate)));
    	
    		this.delegateEvents();

    },
    
   /* companyProfileDetails:function(){
    	
			var me = this;
			
			me.value = "0";
			
			me.getAllBusinessType();
	
			var renderData = {	
					
					errorMsg:"Error Message"
			}; 
		 
			$("#showADMain").html($(this.el).html(_.template(CompanyProfileDetailsTemplate)));
	
			this.delegateEvents();

    },
    
    renderCompanyProfileWithBusinessTypeList:function(){
    	
  			var me=this;
 	
    		var renderData = {					   
    				   
    		   					businessTypeList : me.businessTypeCollection.models,
    		    		        
    		   					errorMsg:"Error Message"

    		 }; 
    	   
	   		var template = _.template(CompanyProfileDetailsTemplate);
	     
	   		$("#showADMain").html($(this.el).html(template(renderData))); 
  
	   		this.delegateEvents();

    },*/
    
    saveCompanyProfileBtn:function(){
    	
	    	var me = this;
	    	
	    	var formData = CommonUtils.getFormDataAsJSON("#companyDetails-form .input","input"); 
	    	
	    	var companyModel = new CommonModel(formData);
	    	
	    	var businesssCategory = $("#businesssCategory option:selected").val();
	    	
	    	var info = $('#info').val();
	    	
	    	companyModel.url= CommonUtils.get("projectUrl")+"/rest/businessacccontroller/saveCompanyDetails";
	    	
	    	companyModel.set("userId",CommonUtils.getUser("userId"));
	    	
	    	companyModel.set("businesssCategory",CommonUtils.getUser("businesssCategory"));
	    	
	    	companyModel.set("info", info);
	    	//var slot_sec1 = $('#slot option:selected').text();
	    	
	    	//console.log(screenModel.toSource());
	    	
	    	companyModel.save(null,{
	    		
	    				success : function(model, response, options){
	    			            
	    				    	CommonUtils.showSuccessMessage("Business Details save sucessfully!!");
	    						
	    				    	me.showHomeScreen();
	
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
    
   
    getCompanyProfileDetails:function(){
    	
				var me = this;
				
				me.companyProfileModel = new CommonModel();	
 	
				me.companyProfileModel.url = CommonUtils.get("projectUrl")+"/rest/getCompanyProfileDetails?userId="+CommonUtils.getUser("userId");
 	            	
				me.companyProfileModel.save(null,{
 		
							success : function(model, response, options){
			 			
									var companyProfileResModel = new CommonModel(response);
									
									me.companyProfileRescollection = new CommonCollection(companyProfileResModel);
									
									me.getAllBusinessType();
			
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
    
    getAllBusinessType : function(){
    	
	    	var me = this;
	     	
			me.businessTypeCollection.url = CommonUtils.get("projectUrl")+"/rest/getAllBusinessType";
			
			me.businessTypeCollection.fetch({
				
						cache:false,
		 		
						success : function(model, response, options){
								
										me.renderCompanyProfileList();
								
						},error:function(model, xhr, options){
					  		
										me.renderUsersNotFoundTemplate();  	
							
						}
			
			});
    },
    
    
    renderCompanyProfileList:function(){
    	
    	  		var me=this;
    	 	
    	  		if(me.companyProfileRescollection.length > 0){
    		   
		    		   		var renderData = {					   
		    				   
		    		   					companyProfileList:me.companyProfileRescollection.models,
		    		   					
		    		   					businessTypeList:me.businessTypeCollection.models,
		    		    		        
		    		   					errorMsg:"Error Message"
		
		    		   		}; 
		    	   
		    		   		var template = _.template(CompanyProfileEditDetailsTemplate);
		    		     
		    		   		$("#showADMain").html($(this.el).html(template(renderData))); 
    		      
    	  		}
    	
  	},
  	
  	
  	updateCompanyProfileDetails:function(){
  	    
	  		   var me = this;
	  		   
	  		   var comProfileData = CommonUtils.getFormObj("editCompanyDetails-form");
	    	
	    	   me.comProfileDataModel = new CommonModel(comProfileData);
	    	
	    	   me.comProfileDataModel.set("id", CommonUtils.getUser("organisationId"));
	    	
	    	   me.comProfileDataModel.set("userId", CommonUtils.getUser("userId"));
	          	
	    	   me.comProfileDataModel.url=CommonUtils.get("projectUrl")+"/rest/updateCompanyDetails";
	    	   	 
	    	   me.comProfileDataModel.save(null,{
	    		
	    		  				success : function(model, response, options){
	    			
	    		  						CommonUtils.showSuccessMessage("Business Details updated sucessfully!!");
	    		  						
	    		  						me.showHomeScreen();
	    			
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

  	 
  	editOwnerDetails:function(){
     	
	 		var me = this;
	 
	 		var renderData = {	
	 				
	 				errorMsg:"Error Message"
	 		}; 
		 
	 		$("#showADMain").html($(this.el).html(_.template(EditOwnerDetailsTemplate)));
	 
	 		this.delegateEvents();

	},
    
	getOwnerDetails:function(){
    	
				var me = this;
		
				me.getOwnerDetailsModel = new CommonModel();	
		
				me.getOwnerDetailsModel.url = CommonUtils.get("projectUrl")+"/rest/getOwnerDetails?userId="+CommonUtils.getUser("userId");
		         	
				me.getOwnerDetailsModel.save(null,{
			
							success : function(model, response, options){
			 			
									var getOwnerDetailsResModel = new CommonModel(response);
									
									me.getOwnerDetailsResCollection = new CommonCollection(getOwnerDetailsResModel);
									
									me.renderOwnerDetailsList();
			
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
		
		
		renderOwnerDetailsList:function(){
		
		  		var me=this;
		 	
		  		if(me.getOwnerDetailsResCollection.length > 0){
			   
		    		   		var renderData = {					   
		    				   
		    		   					ownerDetailsList:me.getOwnerDetailsResCollection.models,
		    		    		 
		    		   					errorMsg:"Error Message"
		
		    		   		}; 
		    	   
		    		   		var template = _.template(EditOwnerDetailsTemplate);
		    		     
		    		   		$("#showADMain").html($(this.el).html(template(renderData))); 
			      
		  		}
		
	},
		
	updateOwnerDetailsBtn:function(){
		
				var me = this;
				
				var formData = CommonUtils.getFormDataAsJSON("#EditOwnerDetails-form .input,#EditOwnerDetails-form .hidden","input"); 
				
				me.updateOwnerDetailsModel = new CommonModel(formData);
		    	
		        me.updateOwnerDetailsModel.set("userId", CommonUtils.getUser("userId"));
				
				me.updateOwnerDetailsModel.url= CommonUtils.get("projectUrl")+"/rest/updateOwnerDetails";
				
				me.updateOwnerDetailsModel.save(null,{
					
							success : function(model, response, options){
						            
							    	CommonUtils.showSuccessMessage("Owner Details Updated sucessfully!!");
									
							    	me.showHomeScreen();
				
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
		  	
  	 
  	 saveCompanyLocationBtn:function(){ 
    	
	    	var me = this;
	    	    
	    	var formData = CommonUtils.getFormDataAsJSON("#branchDetails-form .input","input"); 
	    	
	    	var branchModel = new CommonModel(formData);   	
	    	    	
	    	branchModel.url= CommonUtils.get("projectUrl")+"/rest/branch/addNewBranch";
	    	
	    	branchModel.set("userId",CommonUtils.getUser("userId"));
	    	
	    	var gender = $("input[name=gender]:checked").val();
	    	branchModel.set("gender",gender);
	    	
	    	var shopType = $("input[name=shopType]:checked").val();
	    	branchModel.set("shopType",shopType);
	    	
	    	var online_bookng_status = $("input[name=online_bookng_status]:checked").val();
	    	branchModel.set("online_bookng_status",online_bookng_status);
	    	
	    	var wiFiAvailable = $("input[name=wiFiAvailable]:checked").val();
	    	branchModel.set("wiFiAvailable",wiFiAvailable);
	    	
	    	$('#locationModal').modal('hide');
	    	$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
	    	
	    	branchModel.save(null,{	
	    		
	    				success : function(model, response, options){
	    					
	    						CommonUtils.showSuccessMessage("Company Location save sucessfully!!");
	    			
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
    
    
    saveBranchScheduleBtn:function(){
    	
		    	var me = this;
		   
		    	var branchId = $("#branchId").val();
		    	
		    	var formData = CommonUtils.getFormDataAsJSON("#branchSchedule-form .input","input");  
	
		    /*	var openTimeSun = $("#openTimeSun option:selected").val();
		    	var closeTimeSun = $("#closeTimeSun option:selected").val();
		    	var openTimeMon = $("#openTimeMon option:selected").val();
		    	var closeTimeMon = $("#closeTimeMon option:selected").val();
		    	var openTimeTue = $("#openTimeTue option:selected").val();
		    	var closeTimeTue = $("#closeTimeTue option:selected").val();
		    	var openTimeWed = $("#openTimeWed option:selected").val();
		    	var closeTimeWed = $("#closeTimeWed option:selected").val();
		    	var openTimeThr = $("#openTimeThr option:selected").val();
		    	var closeTimeThr = $("#closeTimeThr option:selected").val();
		    	var openTimeFri = $("#openTimeFri option:selected").val();
		    	var closeTimeFri = $("#closeTimeFri option:selected").val();
		    	var openTimeSat = $("#openTimeSat option:selected").val();
		    	var closeTimeSat = $("#closeTimeSat option:selected").val();*/
		    	
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
		    	
		    	var branchScheduleDataModel = new CommonModel(formData);
		    	
		    	branchScheduleDataModel.set("branchId", branchId);
		    	
		    	branchScheduleDataModel.set("openTimeSun",openTimeSun);
		    	branchScheduleDataModel.set("closeTimeSun",closeTimeSun);
		    	branchScheduleDataModel.set("openTimeMon",openTimeMon);
		    	branchScheduleDataModel.set("closeTimeMon",closeTimeMon);
		    	branchScheduleDataModel.set("openTimeTue",openTimeTue);
		    	branchScheduleDataModel.set("closeTimeTue",closeTimeTue);
		    	branchScheduleDataModel.set("openTimeWed",openTimeWed);
		    	branchScheduleDataModel.set("closeTimeWed",closeTimeWed);
		    	branchScheduleDataModel.set("openTimeThr",openTimeThr);
		    	branchScheduleDataModel.set("closeTimeThr",closeTimeThr);
		    	branchScheduleDataModel.set("openTimeFri",openTimeFri);
		    	branchScheduleDataModel.set("closeTimeFri",closeTimeFri);
		    	branchScheduleDataModel.set("openTimeSat",openTimeSat);
		    	branchScheduleDataModel.set("closeTimeSat",closeTimeSat); 	
		    	    	
		    	branchScheduleDataModel.url= CommonUtils.get("projectUrl")+"/rest/branch/setBranchSchedule";
		    	
		    	$('#scheduleModal').modal('hide');
		    	$('body').removeClass('modal-open');
   			 	$('.modal-backdrop').remove();
		    	branchScheduleDataModel.save(null,{
		    		
		    		success : function(model, response, options){
		    			
		    						CommonUtils.showSuccessMessage("Branch Schedule save sucessfully!!");       
		    			
		    						me.showHomeScreen();
		
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
    
    
    saveEditBranchScheduleBtn:function(){
    	
    	var me = this;
   
    	var branchId = $("#branchId").val();
    	
    	var formData = CommonUtils.getFormDataAsJSON("#editBranchSchedule-form .input","input");  
   	
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
    	
    	var editBranchScheduleDataModel = new CommonModel(formData);
    	
    	editBranchScheduleDataModel.set("branchId", branchId);
    	
    	editBranchScheduleDataModel.set("openTimeSun",openTimeSun);
    	editBranchScheduleDataModel.set("closeTimeSun",closeTimeSun);
    	editBranchScheduleDataModel.set("openTimeMon",openTimeMon);
    	editBranchScheduleDataModel.set("closeTimeMon",closeTimeMon);
    	editBranchScheduleDataModel.set("openTimeTue",openTimeTue);
    	editBranchScheduleDataModel.set("closeTimeTue",closeTimeTue);
    	editBranchScheduleDataModel.set("openTimeWed",openTimeWed);
    	editBranchScheduleDataModel.set("closeTimeWed",closeTimeWed);
    	editBranchScheduleDataModel.set("openTimeThr",openTimeThr);
    	editBranchScheduleDataModel.set("closeTimeThr",closeTimeThr);
    	editBranchScheduleDataModel.set("openTimeFri",openTimeFri);
    	editBranchScheduleDataModel.set("closeTimeFri",closeTimeFri);
    	editBranchScheduleDataModel.set("openTimeSat",openTimeSat);
    	editBranchScheduleDataModel.set("closeTimeSat",closeTimeSat);   	
    	    	
    	editBranchScheduleDataModel.url= CommonUtils.get("projectUrl")+"/rest/branch/setBranchSchedule";
    	
    	$('#scheduleModal').modal('hide');
    	$('body').removeClass('modal-open');
		 	$('.modal-backdrop').remove();
		editBranchScheduleDataModel.save(null,{
    		
    		success : function(model, response, options){
    			
    						CommonUtils.showSuccessMessage(" Branch Schedule Update sucessfully!!");       
    			
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
  	 
  	 
    getAllLocations:function(){
		   
			 var me=this;
			   
			 me.locationCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/list?userId="+CommonUtils.getUser("userId");
		   
		     me.locationCollection.fetch({
			   
		    	 			cache:false,
			   
		    	 			success: function (model, response, options) {			    	
			    	
		    	 					me.renderAllCompanyLocations();
	  		
		    	 			},error:function(model, xhr, options){
	  		
		    	 			}
		     });

    },
    
    renderAllCompanyLocations:function(){
  
    		var me = this;
    		
    		var renderData = {
   			 
    						locationList:me.locationCollection.models,
    						
    						errorMsg:"Error Message"
    		}; 
   	 
    		var template = _.template(CompanyLocationsTemplate);
    
    		$("#showADMain").html($(this.el).html(template(renderData)));  
    
    		this.delegateEvents();
    }, 
    
    
    getCompanyLocation:function(e){
		   
			 var me=this;
			 
			 me.branchId =  $(e.currentTarget).attr("branchId");
			   
			 me.companyLocationCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/getCompanyLocation?branchId="+me.branchId;
			 
		     me.companyLocationCollection.fetch({
			   
		    	 			cache:false,
			   
		    	 			success: function (model, response, options) {			    	
			    	
		    	 					me.renderCompanyLocations();
	 		
		    	 			},error:function(model, xhr, options){
	 		
		    	 			}
		     });
	
	},
	
	renderCompanyLocations:function(){
	
			var me = this;
			
			var renderData = {
				 
							companyLocationList:me.companyLocationCollection.models,
							
							errorMsg:"Error Message"
			}; 
		 
			var template = _.template(EditCompanyLocationsTemplate);
	
			$("#showADMain").html($(this.el).html(template(renderData)));  
	
			this.delegateEvents();
	}, 
	
	
	updateCompanyLocationBtn:function(){
			
			var me = this;
			
			
			var updateEditCompanyLocationData = CommonUtils.getFormDataAsJSON("#editBranchDetails-form .input","input");
			
			
			me.updateEditCompanyLocationDataModel = new CommonModel(updateEditCompanyLocationData);
			
			me.updateEditCompanyLocationDataModel.url=CommonUtils.get("projectUrl")+"/rest/updateBranchInformation";
			
			me.updateEditCompanyLocationDataModel.set("branchId",me.branchId);
			
			var gender = $("input[name=gender]:checked").val();
			me.updateEditCompanyLocationDataModel.set("gender",gender);
	    	
	    	var shopType = $("input[name=shopType]:checked").val();
	    	me.updateEditCompanyLocationDataModel.set("shopType",shopType);
	    	
	    	var online_bookng_status = $("input[name=online_bookng_status]:checked").val();
	    	me.updateEditCompanyLocationDataModel.set("online_bookng_status",online_bookng_status);
	    	
	    	var wiFiAvailable = $("input[name=wiFiAvailable]:checked").val();
	    	me.updateEditCompanyLocationDataModel.set("wiFiAvailable",wiFiAvailable);
			
			me.updateEditCompanyLocationDataModel.save(null,{
	       		
			       		success : function(model, response, options){
			       			
			       					CommonUtils.showSuccessMessage("Branch details updated sucessfully!!");
			       			        
			       					me.getAllLocations();
			       		},
			       		
			       		error: function(model, response, options){
			       			
			       				/*	if (response.status === 500) {
			    				
			       								var template = _.template(genericMessageTemplate);
			   		    		  
			       								var renderData = {
			       										
			       										errorMessage:"There was some unexpected error. Please Try again or report the Problem",
			       								};
			   		    		  
			       								$("#showADMain").html($(me.el).html(template(renderData)));
			       					}*/
			       					
			       		}
		       		
       	 });
	},
    
    
    
    deleteCompanyLocation : function(e){
  	  
  		var me = this;
  
  		alert("Do you really want to Remove this location  ");
	
  		me.branchId =  $(e.currentTarget).attr("branchId");
  		
  		me.deleteLocationCommonModel.set("branchId",me.branchId);
  		
  		me.deleteLocationCommonModel.url = CommonUtils.get("projectUrl")+"/rest/branch/deleteLocationDetails";
  		
  		me.deleteLocationCommonModel.save(null,{
    		
  				success : function(model, response, options){	

  							CommonUtils.showSuccessMessage("Location Deleted succesfully..!!");

  							me.getAllLocations();

  							me.delegateEvents();

  				},
  				error: function(model, response, options){

  							CommonUtils.showErrorMessage("Location Delete Error..!!");


  				}

  		});
  

    },
    
    
    getImageGallery : function(){
		    
    	     // alert("in getImageGallery");
    	    
		  	var me=this;	 			
		 
		  	me.mediaCollection.url=CommonUtils.get("projectUrl")+"/rest/media/getImageForGallery?userId="+CommonUtils.getUser('userId');
		   
		  	//console.log(me.mediaCollection);
		  	
		  	me.mediaCollection.fetch({
			   
		  			cache:false,
		
		  			success: function (model, response, options) {			    	
		  						console.log("images found");
		  						me.getAllLocationsForPhotoGallery();
	  		
		  			},error:function(model, response, options){  
	  		
		
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
	   
	   
	  getAllLocationsForPhotoGallery:function(){
	        
		    //alert(" in getAllLocationsForPhotoGallery ");
		   
		  	var me=this;
		   
		  	me.locationCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/list?userId="+CommonUtils.getUser("userId");
	   
		  	me.locationCollection.fetch({
		   
	    	 				cache:false,
		   
	    	 				success: function (model, response, options) {			    	
		    	
	    	 							me.renderMediaList();
		
	    	 				},error:function(model, xhr, options){
		
	    	 				}
		  	});

},
	   
	  renderMediaList:function(){
	     
		    //alert("in  renderMediaList ");
		  
		   var me=this;
		 
		   if(me.mediaCollection.length > 0){
			   
			   		var renderData = {					   
					   
			   					locationList:me.locationCollection.models,
			   					
			   					mediaList:me.mediaCollection.models,			    		 
			   					
			   		}; 
		   			     
			   		var template = _.template(PhotosTemplate);
			     			     
			   		$("#showADMain").html(template(renderData));
			     
			   		me.initDropZoneUpload("uploadImageMedia");
			   		
			   		me.initDropZoneUpload("uploadMenuCardMedia");
			     
			   		this.delegateEvents();
			     
			      
			}else{
				
				console.log("no data present at moment!!!");
				
		    }
		   
    },
   
    imageUpload:function()
    {
    	  
    		var campaignType="I"
    		
    		this.uploadMedia(campaignType);
    	
    },
    
     menuCardUpload:function()
    {
    	   
    		var campaignType="M"
    	
    		this.uploadMedia(campaignType);
    	
    },
    
    
    //upload Media Starts
    uploadMedia:function(campaignType){
    			
    			
    			var me = this;
    			
    			if(true){
 		   
		    		    if(campaignType == "I"){
		    		    	 
		    		    		me.initDropZoneUpload("uploadImageMedia");
		 		     
		    		    } else{
		    		    	 
		    		    	 	me.initDropZoneUpload("uploadMenuCardMedia");
		    		     
		    		    }
		    		    
		    		    this.delegateEvents();
 		     
    			}else{			
 	    	  
    					$("#screenNotFound").css("display","");
    			
    			}
    		     
        }, 
    //upload Media ends
        
        
    //uplload Media method calls
        
        initDropZoneUpload:function(id)
        {  
        
      	   
 		   var me=this;
 		   var maxFileExceeded=false;
 		   var theUrl;
 		   var userId = CommonUtils.getUser("userId");
 		   
 		   switch(id)
 		   {
 		   case "uploadImageMedia":
				theUrl = CommonUtils.get("projectUrl") + "/rest/media/upload?imageType=I&userId="+CommonUtils.getUser('userId')+"&oauth_token="+CommonUtils.get("oauth_token")+"&oauth_token_secret="+CommonUtils.get("oauth_token_secret");
 			   break;
 			   
 		   case "uploadMenuCardMedia":			   
 			   theUrl = CommonUtils.get("projectUrl")+"/rest/media/upload?imageType=M&userId="+CommonUtils.getUser('userId')+"&oauth_token="+CommonUtils.get("oauth_token")+"&oauth_token_secret="+CommonUtils.get("oauth_token_secret");
 			   break;
 			   		   
 		   }
 		   
 		   this.myDropzone = new DropZone("a#"+id,
 			{ 
 			   url: theUrl,
 			   acceptedFiles:"image/*,video/*",
 			   uploadMultiple:true,
 			   thumbnailWidth:100,
 			   parallelUploads: Constants.UPLOADFILELIMIT,
 			   thumbnailHeight:100,
 			   autoProcessQueue:true,
 			   addedfile: function(file) {
 				   theUrl = theUrl+"groupId="+1;
 				   
 					var target = document.getElementById("listSpinner");
 					   me.spinner = new Spinner();
 				       me.spinner.spin(target);
 				       
 				   
 				   //console.log(file.name+"uploading..!!"+ theUrl);   				   
 				   //console.log(file.size+"one file added");				   
 				 },
 				 
 			uploadprogress: function(file,progress,bytesSent){
 					
 				//console.log(file.name+"uploading..!!");
 			},
 			
 			success:function(file,response){
 				CommonUtils.showSuccessMessage("File uploaded sucessfully!!");
 				me.spinner.stop();
 				  me.getImageGallery();
 			},
 						
 			init: function() {
 				
 				   this.on('complete', function(file) {
 					   
 					   CommonUtils.showSuccessMessage("File uploaded sucessfully!!");
 					   //me.renderMediaImages(Constants.IMAGE);
 					   me.spinner.stop();
 				   });
 				   

 				   this.on('error', function(file) {
 					   
 					   CommonUtils.showErrorMessage("Unexpected Error in File uploading<br/>JPG File format is not Standard. try again If the problem persist please contact admin@SME.com");
 					   //me.renderMediaImages(Constants.IMAGE);
 					   me.spinner.stop();
 				   });				   
 				   

 			   }
 			});
 	   },
 	   
 	   
 	  deleteImage : function(e){
 	  	  
 	  		var me = this;
 	  
 	  		alert("Do you really want to Remove this Image  ");
 		
 	  		me.imageId =  $(e.currentTarget).attr("imageId");
 	  		
 	  		me.deleteImageCommonModel.set("imageId",me.imageId);
 	  		
 	  		me.deleteImageCommonModel.url = CommonUtils.get("projectUrl")+"/rest/media/deleteImage";
 	  		
 	  		me.deleteImageCommonModel.save(null,{
 	    		
 	  				success : function(model, response, options){	

 	  							CommonUtils.showSuccessMessage("Image  Deleted succesfully..!!");

 	  							me.getImageGallery();

 	  				},
 	  				error: function(model, response, options){

 	  							CommonUtils.showErrorMessage("Image Delete Error..!!");


 	  				}

 	  		});
 	  

 	    },
        
 	   deleteMenuCard : function(e){
  	  	  
	  		var me = this;
	  
	  		alert("Do you really want to Remove this Image  ");
		
	  		me.imageId =  $(e.currentTarget).attr("imageId");
	  		
	  		me.deleteImageCommonModel.set("imageId",me.imageId);
	  		
	  		me.deleteImageCommonModel.url = CommonUtils.get("projectUrl")+"/rest/media/deleteImage";
	  		
	  		me.deleteImageCommonModel.save(null,{
	    		
	  				success : function(model, response, options){	

	  							CommonUtils.showSuccessMessage("Image  Deleted succesfully..!!");

	  							me.getImageGallery();

	  				},
	  				error: function(model, response, options){

	  							CommonUtils.showErrorMessage(" Image Delete Error..!!");


	  				}

	  		});
	  

	    },

        //upload media method calls
 	  
     discountTypes:function(){
    	  	
    	 var me = this;
    
    	 var renderData = {					   		   
    		
    			 errorMsg:"Error Message"
          }; 
   	 
	      $("#showADMain").html($(this.el).html(_.template(DiscountTypesTemplate)));
   
	      this.delegateEvents();

    },    
    
    paymentTypes:function(){
    	
    	  var me = this;
    
   	      var renderData = {
   	    		  
    		      errorMsg:"Error Message"
          }; 
   	 
	      $("#showADMain").html($(this.el).html(_.template(PaymentTypesTemplate)));
    
	      this.delegateEvents();

    },
    
    saveTaxTypeBtn:function(){
    	
    	var me = this;
    	
    	var formData = CommonUtils.getFormDataAsJSON("#newTaxType-form .input","input"); 
    	
    	var taxMasterDataModel = new CommonModel(formData);
    	
    	taxMasterDataModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/saveTaxMasterData";
    	
    	taxMasterDataModel.set("userId",CommonUtils.getUser("userId"));
    	
    	$('#taxTypeModal').modal('hide');
    	$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		
    	taxMasterDataModel.save(null,{
    		
    				success : function(model, response, options){
    			 
    								CommonUtils.showSuccessMessage("Tax Type save sucessfully!!");
    								
    								me.getAllTaxes();

    				},
    				error: function(model, response, options){
    			
    							if (response.status === 500) {
    				
    									var template = _.template(genericMessageTemplate);
   		    		  
    									var renderData = {
   		    				  
    											errorMessage:"There was some unexpected error. Please Try again or report the Problem",
    									
    									};
   		    		  
    									$("#showADMain").html($(me.el).html(template(renderData)));
    									
    							}
    							
    							me.getAllTaxes();
    				
    				}
    		
    	 });

    },
    
    
    getAllTaxes:function(){
		
    			var me=this;
		   
    			me.taxesCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/listTaxMasterData?userId="+CommonUtils.getUser("userId");
	   
    			me.taxesCollection.fetch({
		   
    						cache:false,
		   
    						success: function (model, response, options) {			    	
		    	
    									me.renderTaxes();
  		
    						},error:function(model, xhr, options){
  		
    						}
              
    			});

    },
    
    renderTaxes:function(){
    	
    			var me = this;

    			var renderData = {
      			
    						taxesList:me.taxesCollection.models,
       		  
    			}; 
   	 
    			var template = _.template(TaxesTemplate);
    
    			$("#showADMain").html($(this.el).html(template(renderData))); 
    
    			this.delegateEvents();
     
    },
    
    deleteTaxDetails : function(e){
  	  
  		var me = this;
  
  		alert("Do you really want to Remove this Tax  ");
	
  		me.taxId =  $(e.currentTarget).attr("taxId");
  		
  		me.deleteTaxCommonModel.set("taxId",me.taxId);
  		
  		me.deleteTaxCommonModel.url = CommonUtils.get("projectUrl")+"/rest/masterdata/deleteTaxDetails";
  		
  		me.deleteTaxCommonModel.save(null,{
    		
  				success : function(model, response, options){	

  							CommonUtils.showSuccessMessage("Tax Deleted succesfully..!!");

  							me.getAllTaxes();

  				},
  				error: function(model, response, options){

  							CommonUtils.showErrorMessage("Tax Delete Error..!!");


  				}

  		});
  

    },
    
    
    notification:function(){
    	
    			var me = this;

    			var renderData = {	
	        		 
    						errorMsg:"Error Message"
    			}; 
	 
    			$("#showADMain").html($(this.el).html(_.template(NotificationTemplate)));

    			this.delegateEvents();

     },  
    
    
     saveReferralSourceBtn:function(){
    	
    	            var me = this;
    	
    	            var formData = CommonUtils.getFormDataAsJSON("#newReferralSource-form .input","input"); 
    	
    	            var referralMasterDataModel = new CommonModel(formData);
    	
    	            referralMasterDataModel.set("userId",CommonUtils.getUser("userId"));
  	
    	            referralMasterDataModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/saveReferralSourceMasterData";
    	
    	            $('#referralSourceModal').modal('hide');
    	            $('body').removeClass('modal-open');
       			 	$('.modal-backdrop').remove();
       			 	
    	            referralMasterDataModel.save(null,{
    		
    		                                success : function(model, response, options){
    		                                			
    		                                			CommonUtils.showSuccessMessage("Referral Source save sucessfully!!");
    		                                			
    		                                			me.getAllReferralSources();

    		                                },
    		                                error: function(model, response, options){
    			
    			                                 if (response.status === 500) {
    				
      				                                       var template = _.template(genericMessageTemplate);
   		    		  
   		    		                                       var renderData = {
   		    			                                        
   		    		                                    		   errorMessage:"There was some unexpected error. Please Try again or report the Problem",
   		    		                                       };
   		    		  
   		    		                                       $("#showADMain").html($(me.el).html(template(renderData)));
      			                          
    			                                  }
    			                                 
    			                                  me.getAllReferralSources();
    			                  
    		                                }
    		                                
    	            });
    	            
    },
    
    getAllReferralSources:function(){
		
    	       var me=this;
		   
		       me.referralSourcesCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/listReferralSourcesData?userId="+CommonUtils.getUser("userId");
	   
	           me.referralSourcesCollection.fetch({
		   
		                     cache:false,
		   
		                     success: function (model, response, options) {			    	
		    	
		    	                      me.renderReferralSources();
  		
  	                         },error:function(model, xhr, options){
  		
  	                         }
	           });

    },
    
    renderReferralSources:function(){
    	
    	         var me = this;
       
      	         var renderData = {
      			                
      	        		 referralSourceList:me.referralSourcesCollection.models,
       		            
                 }; 
   	 
 	             var template = _.template(ReferralSourcesTemplate);
    
                 $("#showADMain").html($(this.el).html(template(renderData))); 
    
                 this.delegateEvents();
     
    },
    
    
    saveCancelReasonBtn:function(){
    		
    			var me = this;
    	
    			var formData = CommonUtils.getFormDataAsJSON("#cancel_master_data-form .input","input"); 
    	
    			var cancelMasterDataModel = new CommonModel(formData);
    			
    			cancelMasterDataModel.set("userId",CommonUtils.getUser("userId"));

    			cancelMasterDataModel.url= CommonUtils.get("projectUrl")+"/rest/masterdata/saveCancelOrderMasterData";
    	
    			$('#cancelReasonModal').modal('hide');
    			$('body').removeClass('modal-open');
    			$('.modal-backdrop').remove();
   			 
    			cancelMasterDataModel.save(null,{
    		
    								success : function(model, response, options){
    											
    											CommonUtils.showSuccessMessage("Cancel Reason save sucessfully!!");
    											
    											me.getAllCancellationReason();

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
    
    
    getAllCancellationReason:function(){   
		
    	 var me=this;
		   
		 me.cancellationResonCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/listCancellationReason?userId="+CommonUtils.getUser("userId");
	   
	     me.cancellationResonCollection.fetch({
		   
	    	 					cache:false,
		   
	    	 					success: function (model, response, options) {			    	
		    	
	    	 							me.renderCancellationReson();
  		
	    	 					},error:function(model, xhr, options){
  		
	    	 					}
	    });

    },
    
    renderCancellationReson:function(){
    	
    	       var me = this;
     
      	       var renderData = {
      	    		   
      			                cancellationResonList:me.cancellationResonCollection.models,
       		 
               }; 
   	 
 	           var template = _.template(CancellationReasonTemplate);
    
               $("#showADMain").html($(this.el).html(template(renderData))); 
    
               this.delegateEvents();
     
    },
    
    
    showHomeScreen:function(){
    	
    		var me = this;
    	
    		me.blank_screen();
    },

    
    getScheduleDetail:function(){
        
	    	var me = this;
	   
			me.scheduleCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/getBranchScheduleDetails?branchId="+CommonUtils.getBranch("branchId");
			
			me.scheduleCollection.fetch({
				  
						cache:false,
				   
						success: function (model, response, options) {			    	
				    	
									me.renderScheduleDetail();
		  		
						},error:function(model, xhr, options){
		  		
									me.renderUsersNotFoundTemplate();  	
						}
						
			});
	
	},


	renderScheduleDetail:function(){
		
			var me = this;
			
			var renderData = {	
					
		    		         	scheduleDetailsList : me.scheduleCollection.models,
		    		         	
		    		         	errorMsg:"Error Message"
		    }; 
			 
			 
			var template = _.template(scheduleTemplate);
			    
			$("#showADMain").html($(this.el).html(template(renderData)));
			   	 
		    this.delegateEvents();
		
	},

	getForEditBranchSchedule:function(ev){
	
			var me = this;
			
			me.branchId =  $(ev.currentTarget).attr("branchId");
			   
			me.branchScheduleCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/getBranchScheduleDetails?branchId="+me.branchId;
			
			me.branchScheduleCollection.set("branchId",me.branchId);
			
			me.branchScheduleCollection.fetch({
				  
						cache:false,
				   
						success: function (model, response, options) {			    	
				    	
									me.renderBranchScheduleDetail();
		  		
						},error:function(model, xhr, options){
		  		
									me.renderUsersNotFoundTemplate();  	
						}
						
			});


	}, 
	
	renderBranchScheduleDetail:function(){
		
			var me = this;
			
			var renderData = {	
					            branchId :me.branchId,
					
								branchScheduleDetailsList : me.branchScheduleCollection.models,
		    		         	
		    		         	errorMsg:"Error Message"
		    }; 
			 
			 
			var template = _.template(branchScheduleTemplate);
			    
			$("#showADMain").html($(this.el).html(template(renderData)));
			   	 
		    this.delegateEvents();
		
	}
	
  });
  
  return SetupView;
  
});
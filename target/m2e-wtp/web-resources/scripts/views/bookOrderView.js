/*global define*/

define([
        'jquery',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/bookOrder/bookOrder.html',
        'text!../templates/bookOrder/clientBookOrder.html',
        'text!../templates/bookOrder/invoice.html',
        'text!../templates/client/newClients.html'
        
], function ($,
		CommonModel,
		CommonCollection,
		bookOrderTemplate,
		ClientsBookOrderTemplate,
		invoiceTemplate,
		newClientsTemplate) {
	
  var BookOrderView = Backbone.View.extend({
	  
    events: {
    	
    	"click #bookOrder":"bookOrder",
    	"click #saveNewBooking":"saveOrders",
    	"click #checkOut":"checkOut",
    	"click #newClients":"newClients",
        "click #saveNewClientsBtn":"saveNewClientsBtn"
    },

    initialize: function () {
    	this.commonCollection = new CommonCollection();
    	this.servicesCollection = new CommonCollection();
		this.staffCollection = new CommonCollection();
		this.lastBookingCollection = new CommonCollection();
		this.taxesCollection = new CommonCollection();
		this.OrderForInvoiceModel = new CommonModel();
		this.OrderForInvoiceResModelCol = new CommonCollection();
		var value;
		var clientId;
		var fName;
		var ownerMobile;
		var orderId;
    },
    
    bookOrder:function(){
		
		var me = this;
		
		me.getServicesList();
		
		me.value = "0";
},

	bookOrderForSelectedClient:function(e){
		
		var me = this;
		
		me.clientId =  $(e.currentTarget).attr("id");
		me.fName = $(e.currentTarget).attr("clientName");
		me.ownerMobile = $(e.currentTarget).attr("clientMobile");
		me.orderId = $(e.currentTarget).attr("orderId");
		me.getServicesList();
		
		me.value = "1";
		
	},


	getServicesList:function(){


		var me = this;

		me.servicesCollection.url = CommonUtils.get("projectUrl")+"/rest/listServices?organisationId="+CommonUtils.getUser("organisationId");

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

			me.staffCollection.url = CommonUtils.get("projectUrl")+"/rest/branch/searchStaffNameList?organisationId="+CommonUtils.getUser("organisationId");

			me.staffCollection.fetch({
	  
							cache:false,
	   
							success: function (model, response, options) {			    	
	    	
									me.getLastBookingDate();
		
							 },error:function(model, xhr, options){
	  		
								 	me.renderUsersNotFoundTemplate(); 
								 	
							 }
							 
			});
			
	},


	getLastBookingDate : function(){
	
	   var me = this;
	   
	   me.lastBookingCollection.url =CommonUtils.get("projectUrl")+"/rest/booking/searchLastBookingDetails?clientId="+me.clientId;//+CommonUtils.getUser("clientId");
	   
	   /*console.log("in getLastBookingDate "+me.lastBookingCollection);*/
	   
	   me.lastBookingCollection.fetch({
		    					
		   						cache:false,
		   						
		   						success: function(model,response,option) {
		   							
		   							
		   								if(me.value=="0"){
		   						    	
		   										me.renderServicesAndStaffDetail();
    	
		   								}else if(me.value=="1"){
    	
		   										me.getAllTaxes();
		   										/*console.log("in fetch"+response);
												console.log("in 2 fetch"+response);*/
		   								}
		   							
		   							
		   						},error:function(model, xhr, options){
		   					  		
//									me.renderUsersNotFoundTemplate();  	
		   							
		   								if(me.value=="0"){
		   						    	
		   										me.renderServicesAndStaffDetail();
    	
		   								}else if(me.value=="1"){
    	
												me.getAllTaxes();
												/*console.log("in fetch"+response);
												console.log("in 2 fetch"+response);*/
										
		   								}
									
							    }
		   
			   });
		},
		
		
		renderServicesAndStaffDetail:function() {


				var me = this;
				
				var renderData = {					   		   
								
							//serviceDetailsList : me.servicesCollection.models,
							servicesList:me.servicesCollection.models,			
							staffList : me.staffCollection.models,				
							bookingOrderLastUpdateList : me.lastBookingCollection.models,
						
							cName :"" 
				}; 
		 
				var template = _.template(bookOrderTemplate);
		    
				$("#showADMain").html($(this.el).html(template(renderData)));
		   	 
				this.delegateEvents();
				
	},

	renderServicesAndStaffDetailThroughClient:function() {
		
		var me = this;
		/*console.log("in  renderServicesAndStaffDetailThroughClient"+me.lastBookingCollection);*/
		
		var renderData = {					   		   
		
					//serviceDetailsList : me.servicesCollection.models,
				    servicesList:me.servicesCollection.models,
					staffList : me.staffCollection.models,
	                clientId : me.clientId,
	                fname : me.fName,
	                ownermobile : me.ownerMobile,
	                orderId : me.orderId,
					bookingOrderLastUpdateList : me.lastBookingCollection.models,
					taxesList:me.taxesCollection.models,
					
					cName :"" 
					
		}; 
 
		var template = _.template(ClientsBookOrderTemplate);
    
		$("#showADMain").html($(this.el).html(template(renderData)));
   	    
		this.delegateEvents();
		
	},

	saveOrders: function () 
	{

			var me = this;
			console.log("saving data!!!");
		
			//console.log("save Cancel Reason");
		
			var formData = CommonUtils.getFormDataAsJSON("#bookorderform .input","input"); 
			var bookOrderModel = new CommonModel(formData);
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
		
			//var repeats = $("#repeats option:selected").val();
			var time = $("#time").val();
			//var bookingtype = $("input[name=bookingtype]:checked").val();
			
			var mobile = $("#mobile").text();
			mobile = mobile.trim();
			var clientName = $("#clientName").text();
			var splitClientName = clientName.split(" "); 
			console.log(bookOrderModel);
			bookOrderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/oldclient";
			//bookOrderModel.set("repeats",repeats);
			bookOrderModel.set("time",time);
			bookOrderModel.set("serviceAndStaffList",bookingServices);
			//bookOrderModel.set("clientId",me.clientId);
			bookOrderModel.set("mobile",mobile);
			bookOrderModel.set("clientFirstName",splitClientName[0]);
			bookOrderModel.set("clientLastName",splitClientName[1]);
			bookOrderModel.set("branchId",CommonUtils.getBranch("branchId"));
			bookOrderModel.set("organizationId",CommonUtils.getUser("organisationId"));
			//bookOrderModel.set("bookingType",bookingType);
		
			bookOrderModel.save(null,{
			
					success : function(model, response, options){
							
							console.log("Sucess---",response);
							
						CommonUtils.showSuccessMessage("Booking save sucessfully!!");
						me.bookOrder();
				
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

	getAllTaxes:function(){
		
		var me=this;
   
		me.taxesCollection.url = CommonUtils.get("projectUrl")+"/rest/masterdata/listTaxMasterData?userId="+CommonUtils.getUser("userId");

		me.taxesCollection.fetch({
   
					cache:false,
   
					success: function (model, response, options) {			    	
    	
								me.renderServicesAndStaffDetailThroughClient();
	
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
	
	//book order ends
	checkOut:function(ev){
		
		var me = this;
		
		me.orderId =  $(ev.currentTarget).attr("orderId");
		
    	var orderModel = new CommonModel();
    	var bookingId = $("#bookingId").text().trim();
    	if(bookingId !== ""){
    		orderModel.set("bookingId",bookingId);
    	}
    	else{
    		orderModel.set("bookingId",0);    		
    	}
    	orderModel.set("lastMinDiscountPer",$("#discountPercent").val());
    	orderModel.set("taxRate",$('#taxAdd option:selected').val());$
    	orderModel.set("organizationId",CommonUtils.getUser("organisationId"));
    	orderModel.set("bookingDate",new Date());
		orderModel.set("lastMinDiscount",$("#discountValue").val());
    	orderModel.set("orderStatus","CHECKOUT");
    	
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
	
		//var repeats = $("#repeats option:selected").val();
		var time = $("#time").val();
		//var bookingtype = $("input[name=bookingtype]:checked").val();
		
		var mobile = $("#clientMobile").text();
		mobile = mobile.trim();
		var clientName = $("#clientName").text();
		var splitClientName = clientName.split(" "); 
		console.log(orderModel);		
		orderModel.set("time","10:10");
		orderModel.set("serviceAndStaffList",bookingServices);
		orderModel.set("mobile",mobile);
		orderModel.set("branchId",CommonUtils.getBranch("branchId"));
		
    	
    	orderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/changeOrderStatus";
    	
    	console.log("changing order status!!!");
    	
    	orderModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Order Status changed sucessfully!!");
    			console.log("Sucess---",response);
    			console.log("orderId---",me.orderId);
    			
    			me.getOrderDetailsForInvoice();
    			
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
	} ,   
	
	
	getOrderDetailsForInvoice:function(ev){
    	
		var me = this;
	
		orderId = me.orderId ;
		
		me.OrderForInvoiceModel = new CommonModel();	

		me.OrderForInvoiceModel.url = CommonUtils.get("projectUrl")+"/rest/booking/getOrderDetails?orderId="+orderId;
         	
		me.OrderForInvoiceModel.save(null,{
	
					success : function(model, response, options){
	 			
						var OrderForInvoiceResModel = new CommonModel(response);
						
						me.OrderForInvoiceResModelCol = new CommonCollection(OrderForInvoiceResModel);
						
		    			me.renderInvoice();
		    	
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
	

    
	renderInvoice:function(){

		
		var me=this;
  		
		if(me.OrderForInvoiceResModelCol.length > 0){
	   
    		   		var renderData = {		
    		   				
    		   				OrderForInvoiceList : me.OrderForInvoiceResModelCol.models 		
    		   	
    		   		}; 
    	   
    		   		var template = _.template(invoiceTemplate);
    		     
    		   		$("#showADMain").html($(this.el).html(template(renderData))); 
    		   		me.delegateEvents();
  		}
  		else{
  			console.log("error");
  		}
  		
	},
	
	newClients:function(){
		var me = this;

		var renderData = {					   		   
				errorMsg:"Error Message"
		}; 
	 
		$("#showADMain").html($(this.el).html(_.template(newClientsTemplate)));
		this.delegateEvents();

	} ,  
	
saveNewClientsBtn:function(){
		
		var me = this;
		
		var formData = CommonUtils.getFormObj("newClients-form"); 
		/*console.log("formData"+formData);*/
		
		var formaddress = CommonUtils.getFormObj("newClientsAddress-form");
		/*console.log("formaddress"+formaddress);*/

		
		var clientModel = new CommonModel(formData);
//	    console.log("clientModel"+clientModel);

		
		var clientAddressModel = new CommonModel(formaddress);
//    	console.log("clientAddressModel"+clientAddressModel);
		

	    var notificationSendBy = $("#notificationSendBy option:selected").val();
			
		clientModel.url= CommonUtils.get("projectUrl")+"/rest/client/addNewClient";
	
		clientModel.set("userId",CommonUtils.getUser("userId"));
		 
		var gender = $("input[name=gender]:checked").val();
		clientModel.set("gender",gender);
		
		var maritalStatus = $("input[name=maritalStatus]:checked").val();
		clientModel.set("maritalStatus",maritalStatus);
		
		
		clientModel.set("notificationSendBy",notificationSendBy);

		console.log("clientModel"+clientModel);
    	if (clientAddressModel != null)
    	{
    		
    		clientModel.set("clientAddress",clientAddressModel.get('clientAddress'));
    		clientModel.set("ownercity",clientAddressModel.get('ownercity'));
    		clientModel.set("ownerstate",clientAddressModel.get('ownerstate'));
    		clientModel.set("ownercode",clientAddressModel.get('ownercode'));
    		
    	}
	    
	   
    	clientModel.save(null,{
		
    				success : function(model, response, options){
			            
    						CommonUtils.showSuccessMessage("Client details save sucessfully!!");
    					
    						me.bookOrder();

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

return BookOrderView;

});
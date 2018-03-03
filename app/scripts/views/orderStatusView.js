/*global define*/

define([
        'jquery',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/orderStatus/orderStatus.html',
        'text!../templates/orderStatus/orderDetailsView.html',
        'text!../templates/orderStatus/orderDetailsViewForClient.html',
        'text!../templates/orderStatus/dateWiseOrder.html',
        'text!../templates/orderStatus/weekWiseOrder.html',
        'text!../templates/orderStatus/monthWiseOrder.html'
        
], function ($,
		CommonModel,
		CommonCollection,
		orderStatusTemplate,
		OrderDetailsViewTemplate,
		OrderDetailsViewForClientTemplate,
		dateWiseOrderTemplate,
		weekWiseOrderTemplate,
		monthWiseOrderTemplate) {
	
  var OrderStatusView = Backbone.View.extend({
	  
    events: {
    	"click .getOrderDetails":"getOrderDetails",
    	"click .getOrderDetailsInClient":"getOrderDetailsInClient",
    	"click #confirmOrder":"confirmOrder",
    	"click #rejectOrder":"rejectOrder",
    	"click #rescheduleOrder":"rescheduleOrder"
    	
    },

    initialize: function () {
    	this.commonCollection = new CommonCollection();
    	this.orderStatusCollection = new CommonCollection();
    	this.dateWiseOrderCollection = new CommonCollection();
    	this.weekWiseOrderCollection = new CommonCollection();
    	this.monthWiseOrderCollection = new CommonCollection();
    	this.OredeResModelCol = new CommonCollection();
    	this.OrderModel = new CommonModel();
    },
    
 
    confirmOrder:function(){
    	var me = this;
    	var orderModel = new CommonModel();
    	orderModel.set("bookingId",$("#orderId").text().trim());
    	orderModel.set("orderStatus","CONFIRMED");    	   
    	orderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/changeOrderStatus";
    	
    	console.log("changing order status!!!");
    	
    	orderModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Order Status changed sucessfully!!");
    			console.log("Sucess---",response);
    			me.getOrderStatus();
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
    
    rejectOrder:function(){
    	var me = this;
    	var orderModel = new CommonModel();
    	orderModel.set("bookingId",$("#orderId").text().trim());
    	orderModel.set("orderStatus","REJECTED");    	   
    	orderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/changeOrderStatus";
    	
    	console.log("changing order status!!!");
    	
    	orderModel.save(null,{
    		
    		success : function(model, response, options){
    			
    			CommonUtils.showSuccessMessage("Order Status changed sucessfully!!");
    			console.log("Sucess---",response);
    			me.getOrderStatus();
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
    
    
    rescheduleOrder:function(){
    	
    	var me = this;
    
    	var formData = CommonUtils.getFormDataAsJSON("#rescheduleOrderform .input","input");
    	
    	var rescheduleOrderModel = new CommonModel(formData);
    	
    	console.log(rescheduleOrderModel);
    	
    	rescheduleOrderModel.set("bookingId",$("#orderId").text().trim());
    	
    	rescheduleOrderModel.url= CommonUtils.get("projectUrl")+"/rest/booking/rescheduleServiceAppoitment";
    	
    	console.log("reschedule order !!!");
    	
    	rescheduleOrderModel.save(null,{
    		
    		success : function(model, response, options){
    			
    					CommonUtils.showSuccessMessage("Order reschedule sucessfully!!");
    					
    					console.log("Sucess---",response);
    					
    					me.getOrderStatus();
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
    
    
    getOrderDetails:function(ev){
    	
		var me = this;
		var orderId =  $(ev.currentTarget).attr("orderId");
		me.OrderModel = new CommonModel();	

		me.OrderModel.url = CommonUtils.get("projectUrl")+"/rest/booking/getOrderDetails?orderId="+orderId;
         	
		me.OrderModel.save(null,{
	
					success : function(model, response, options){
	 			
							var OredeResModel = new CommonModel(response);
							
							me.OredeResModelCol = new CommonCollection(OredeResModel);
							
							me.renderOrderDetailsList();
	
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

    renderOrderDetailsList:function(){

  		var me=this;
  		console.log(me.OredeResModelCol.models);
  		if(me.OredeResModelCol.length > 0){
	   
    		   		var renderData = {					       				   
    		   				oredeResModelColList:me.OredeResModelCol.models,    		    		 
    		   				errorMsg:"Error Message"
    		   		}; 
    	   
    		   		var template = _.template(OrderDetailsViewTemplate);
    		     
    		   		$("#showADMain").html($(this.el).html(template(renderData))); 
    		   		me.delegateEvents();
  		}
  		else{
  			console.log("error");
  		}

	},
	
	getOrderDetailsInClient:function(ev){
	    	
			var me = this;
			var orderId =  $(ev.currentTarget).attr("orderId");
			me.OrderModel = new CommonModel();	

			me.OrderModel.url = CommonUtils.get("projectUrl")+"/rest/booking/getOrderDetails?orderId="+orderId;
	         	
			me.OrderModel.save(null,{
		
						success : function(model, response, options){
		 			
								var OredeResModel = new CommonModel(response);
								
								me.OredeResModelCol = new CommonCollection(OredeResModel);
								
								me.renderOrderDetailsListForClient();
		
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

	    renderOrderDetailsListForClient:function(){

	  		var me=this;
	  		console.log(me.OredeResModelCol.models);
	  		if(me.OredeResModelCol.length > 0){
		   
	    		   		var renderData = {					       				   
	    		   				oredeResModelColList:me.OredeResModelCol.models,    		    		 
	    		   				errorMsg:"Error Message"
	    		   		}; 
	    	   
	    		   		var template = _.template(OrderDetailsViewForClientTemplate);
	    		     
	    		   		$("#showADMain").html($(this.el).html(template(renderData))); 
	    		   		me.delegateEvents();
	  		}
	  		else{
	  			console.log("error");
	  		}

		},
    
    getOrderStatus:function(){

		var me=this;
		   
		me.orderStatusCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getOrderStatus/"+CommonUtils.getUser("userId")+"/"+CommonUtils.getBranch("branchId");
	   
	    me.orderStatusCollection.fetch({
		   
		      cache:false,
		   
		      success: function (model, response, options) {			    	
		    	
		    	                  me.renderOrderStatusList();
  		
  	          },error:function(model, xhr, options){
  		
  		                          me.renderUsersNotFoundTemplate();  
  		                          
  	          }
  	          
	    });
	    

    },
    
    renderOrderStatusList:function(){
    	
    	        var me = this;
       
   	            var renderData = {
   			               
   	            		OrderStatusList : me.orderStatusCollection.models,
    		            
   	            		errorMsg:"Error Message"
                
   	            }; 
   	 
   
   	            var template = _.template(orderStatusTemplate);
    
                $("#showADMain").html($(this.el).html(template(renderData)));
   	 
					/*datatable start*/
                	var responsiveHelper_dt_basic = undefined;
					var responsiveHelper_datatable_fixed_column = undefined;
					var responsiveHelper_datatable_col_reorder = undefined;
					var responsiveHelper_datatable_tabletools = undefined;
					var breakpointDefinition = {
							tablet : 1024,
							phone : 480
						};
				
					/* COLUMN FILTER  */
				    var otable = $('#datatable_fixed_column').DataTable({
				    	//"bFilter": false,
				    	//"bInfo": false,
				    	//"bLengthChange": false
				    	//"bAutoWidth": false,
				    	//"bPaginate": false,
				    	//"bStateSave": true // saves sort state using localStorage
						"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
								"t"+
								"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
						"autoWidth" : true,
						"preDrawCallback" : function() {
							// Initialize the responsive datatables helper once.
							if (!responsiveHelper_datatable_fixed_column) {
								responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
							}
						},
						"rowCallback" : function(nRow) {
							responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
						},
						"drawCallback" : function(oSettings) {
							responsiveHelper_datatable_fixed_column.respond();
						}		
					
				    });
				    
				    // custom toolbar
				    $("div.toolbar").html('<div class="text-right"></div>');
				    	   
				    // Apply the filter
				    $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {
				    	
				        otable
				            .column( $(this).parent().index()+':visible' )
				            .search( this.value )
				            .draw();
				            
				    } );
				    /* END COLUMN FILTER */  
				    
				    /*datatable end */
	    
     this.delegateEvents();

    },
    
  /* dateWiseOrder:function(){
    	var me = this;
    
   	 var renderData = {					   		   
    		 errorMsg:"Error Message"
      }; 
   	 
   	 var template = _.template(dateWiseOrderTemplate);
     
     $("#showADMain").html($(this.el).html(template(renderData)));
   	 
	 $("#showADMain").html($(this.el).html(_.template(dateWiseOrderTemplate)));
     this.delegateEvents();

    },*/
    
    
    dateWiseOrder:function(){
    	
    			var me = this;
    			 		
    			var filterDate = new Date().toISOString().substr(0,10);
    			                               
    			me.dateWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getDateWiseOrder?filterDate="+filterDate+"&branchId="+CommonUtils.getBranch("branchId");
    			
    			me.dateWiseOrderCollection.fetch({
    				   
    			      cache:false,
    			   
    			      success: function (model, response, options) {			    	
    			    	
    			    	                  me.renderDateWiseOrderList();
    	  		
    	  	          },error:function(model, xhr, options){
    	  		
    	  		                          me.renderUsersNotFoundTemplate();  
    	  		                          
    	  	          }
    	  	          
    		    });
    
    },
    
    renderDateWiseOrderList:function(){
    	
    			var me = this;
	
    			var renderData = {
			               
    						DateWiseOrderList : me.dateWiseOrderCollection.models,
		            
    						errorMsg:"Error Message"
	        
	           }; 
	
	
	           var template = _.template(dateWiseOrderTemplate);
	
	        $("#showADMain").html($(this.el).html(template(renderData)));
	
				/*datatable start*/
	        	var responsiveHelper_dt_basic = undefined;
				var responsiveHelper_datatable_fixed_column = undefined;
				var responsiveHelper_datatable_col_reorder = undefined;
				var responsiveHelper_datatable_tabletools = undefined;
				var breakpointDefinition = {
						tablet : 1024,
						phone : 480
					};
			
				/* COLUMN FILTER  */
			    var otable = $('#datatable_fixed_column').DataTable({
			    	//"bFilter": false,
			    	//"bInfo": false,
			    	//"bLengthChange": false
			    	//"bAutoWidth": false,
			    	//"bPaginate": false,
			    	//"bStateSave": true // saves sort state using localStorage
					"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
							"t"+
							"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
					"autoWidth" : true,
					"preDrawCallback" : function() {
						// Initialize the responsive datatables helper once.
						if (!responsiveHelper_datatable_fixed_column) {
							responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
						}
					},
					"rowCallback" : function(nRow) {
						responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
					},
					"drawCallback" : function(oSettings) {
						responsiveHelper_datatable_fixed_column.respond();
					}		
				
			    });
			    
			    // custom toolbar
			    $("div.toolbar").html('<div class="text-right"></div>');
			    	   
			    // Apply the filter
			    $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {
			    	
			        otable
			            .column( $(this).parent().index()+':visible' )
			            .search( this.value )
			            .draw();
			            
			    } );
			    /* END COLUMN FILTER */  
			    
			    /*datatable end */
	
	this.delegateEvents();
	
	},
	
	/* weekWiseOrder:function(){
	    	var me = this;
	    
	   	 var renderData = {					   		   
	    		 errorMsg:"Error Message"
	      }; 
	   	 
		 $("#showADMain").html($(this.el).html(_.template(weekWiseOrderTemplate)));
	     this.delegateEvents();

	    }  ,*/
    
	weekWiseOrder:function(){
    	
			var me = this;
			
			var filterDate = new Date().toISOString().substr(0,10);
			                               
			me.weekWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getWeekWiseOrder?filterDate="+filterDate+"&branchId="+CommonUtils.getBranch("branchId");
			
			me.weekWiseOrderCollection.fetch({
				   
			      cache:false,
			   
			      success: function (model, response, options) {			    	
			    	
			    	                  me.renderWeekWiseOrderList();
	  		
	  	          },error:function(model, xhr, options){
	  		
	  		                          me.renderUsersNotFoundTemplate();  
	  		                          
	  	          }
	  	          
		    });
	
	},
	
	renderWeekWiseOrderList:function(){
	
			var me = this;
	
			var renderData = {
		               
						WeekWiseOrderList : me.weekWiseOrderCollection.models,
	            
						errorMsg:"Error Message"
	    
	       }; 
	
	
	       var template = _.template(weekWiseOrderTemplate);
	
	    $("#showADMain").html($(this.el).html(template(renderData)));
	
			/*datatable start*/
	    	var responsiveHelper_dt_basic = undefined;
			var responsiveHelper_datatable_fixed_column = undefined;
			var responsiveHelper_datatable_col_reorder = undefined;
			var responsiveHelper_datatable_tabletools = undefined;
			var breakpointDefinition = {
					tablet : 1024,
					phone : 480
				};
		
			/* COLUMN FILTER  */
		    var otable = $('#datatable_fixed_column').DataTable({
		    	//"bFilter": false,
		    	//"bInfo": false,
		    	//"bLengthChange": false
		    	//"bAutoWidth": false,
		    	//"bPaginate": false,
		    	//"bStateSave": true // saves sort state using localStorage
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
						"t"+
						"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"autoWidth" : true,
				"preDrawCallback" : function() {
					// Initialize the responsive datatables helper once.
					if (!responsiveHelper_datatable_fixed_column) {
						responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
					}
				},
				"rowCallback" : function(nRow) {
					responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
				},
				"drawCallback" : function(oSettings) {
					responsiveHelper_datatable_fixed_column.respond();
				}		
			
		    });
		    
		    // custom toolbar
		    $("div.toolbar").html('<div class="text-right"></div>');
		    	   
		    // Apply the filter
		    $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {
		    	
		        otable
		            .column( $(this).parent().index()+':visible' )
		            .search( this.value )
		            .draw();
		            
		    } );
		    /* END COLUMN FILTER */  
		    
		    /*datatable end */
	
	this.delegateEvents();
	
	},
	
	/*monthWiseOrder:function(){
    	var me = this;
    
   	 var renderData = {					   		   
    		 errorMsg:"Error Message"
      }; 
   	 
	 $("#showADMain").html($(this.el).html(_.template(monthWiseOrderTemplate)));
     this.delegateEvents();

    },  */
	
	
	monthWiseOrder:function(){
    	
			var me = this;
			                               
			me.monthWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getMonthWiseOrder?branchId="+CommonUtils.getBranch("branchId");
			
			me.monthWiseOrderCollection.fetch({
				   
			      cache:false,
			   
			      success: function (model, response, options) {			    	
			    	
			    	                  me.renderMonthWiseOrderList();
	  		
	  	          },error:function(model, xhr, options){
	  		
	  		                          me.renderUsersNotFoundTemplate();  
	  		                          
	  	          }
	  	          
		    });
	
	},
	
	renderMonthWiseOrderList:function(){
	
			var me = this;
	
			var renderData = {
		               
						MonthWiseOrderList : me.monthWiseOrderCollection.models,
	            
						errorMsg:"Error Message"
	    
	       }; 
	
	
	       var template = _.template(monthWiseOrderTemplate);
	
	    $("#showADMain").html($(this.el).html(template(renderData)));
	
			/*datatable start*/
	    	var responsiveHelper_dt_basic = undefined;
			var responsiveHelper_datatable_fixed_column = undefined;
			var responsiveHelper_datatable_col_reorder = undefined;
			var responsiveHelper_datatable_tabletools = undefined;
			var breakpointDefinition = {
					tablet : 1024,
					phone : 480
				};
		
			/* COLUMN FILTER  */
		    var otable = $('#datatable_fixed_column').DataTable({
		    	//"bFilter": false,
		    	//"bInfo": false,
		    	//"bLengthChange": false
		    	//"bAutoWidth": false,
		    	//"bPaginate": false,
		    	//"bStateSave": true // saves sort state using localStorage
				"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
						"t"+
						"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
				"autoWidth" : true,
				"preDrawCallback" : function() {
					// Initialize the responsive datatables helper once.
					if (!responsiveHelper_datatable_fixed_column) {
						responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
					}
				},
				"rowCallback" : function(nRow) {
					responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
				},
				"drawCallback" : function(oSettings) {
					responsiveHelper_datatable_fixed_column.respond();
				}		
			
		    });
		    
		    // custom toolbar
		    $("div.toolbar").html('<div class="text-right"></div>');
		    	   
		    // Apply the filter
		    $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {
		    	
		        otable
		            .column( $(this).parent().index()+':visible' )
		            .search( this.value )
		            .draw();
		            
		    } );
		    /* END COLUMN FILTER */  
		    
		    /*datatable end */
	
	this.delegateEvents();
	
	}
	
  });
  return OrderStatusView;
});

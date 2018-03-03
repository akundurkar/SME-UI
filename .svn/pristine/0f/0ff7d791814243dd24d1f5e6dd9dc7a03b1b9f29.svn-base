/*global define*/

define([
        'jquery',
        'datatables', 
        'dataTablescolVis',
        'dataTablestableTools',
        'dataTablesbootstrap',
        'datatablesresponsive',
        '../models/commonModel',
        '../collections/commonCollection',  
        'views/orderStatusView',
        'text!../templates/sales.html'
        
], function ($,
		D1,D2,D3,D4,D5,
		CommonModel,
		CommonCollection,
		OrderStatusView,
		salesTemplate) {
	
  var SalesView = Backbone.View.extend({
	  
    events: {
    	
    	"click .getOrderDetailsInClient":"getOrderDetailsInClient"
    },

    initialize: function () {
    	this.commonCollection = new CommonCollection();
    	this.commonCollection = new CommonCollection();
    	this.dateWiseOrderCollection = new CommonCollection();
    	this.weekWiseOrderCollection = new CommonCollection();
    	this.monthWiseOrderCollection = new CommonCollection();
    },
    
    
 getSales:function(){
		
		var me = this;
		
		me.dateWiseOrder();
	
    },
    
    dateWiseOrder:function(){
    	
		var me = this;
		 		
		var filterDate = new Date().toISOString().substr(0,10);
		                               
		me.dateWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getDateWiseOrder?filterDate="+filterDate+"&branchId="+CommonUtils.getBranch("branchId");
		
		me.dateWiseOrderCollection.fetch({
			   
		      cache:false,
		   
		      success: function (model, response, options) {			    	
		    	
		    	                  me.monthWiseOrder();
  		
  	          },error:function(model, xhr, options){
  		
  		                          me.renderUsersNotFoundTemplate();  
  		                          
  	          }
  	          
	    });

    },
    
   /* weekWiseOrder:function(){
    	
		var me = this;
		
		var filterDate = new Date().toISOString().substr(0,10);
		                               
		me.weekWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getWeekWiseOrder?filterDate="+filterDate+"&branchId="+CommonUtils.getBranch("branchId");
		
		me.weekWiseOrderCollection.fetch({
			   
		      cache:false,
		   
		      success: function (model, response, options) {			    	
		    	
		    	                  me.monthWiseOrder();
  		
  	          },error:function(model, xhr, options){
  		
  		                          me.renderUsersNotFoundTemplate();  
  		                          
  	          }
  	          
	    });

    },*/
    
    monthWiseOrder:function(){
    	
		var me = this;
		
		me.monthWiseOrderCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getMonthWiseOrder?branchId="+CommonUtils.getBranch("branchId");
		
		me.monthWiseOrderCollection.fetch({
			   
		      cache:false,
		   
		      success: function (model, response, options) {			    	
		    	
		    	                  me.renderDateWeekMonthWiseOrderList();
  		
  	          },error:function(model, xhr, options){
  		
  		                          me.renderUsersNotFoundTemplate();  
  		                          
  	          }
  	          
	    });

    },
    
    renderDateWeekMonthWiseOrderList:function(){
    	
			var me = this;
	
			var renderData = {
		               
						DateWiseOrderList : me.dateWiseOrderCollection.models,
						
						MonthWiseOrderList : me.monthWiseOrderCollection.models,
	            
						errorMsg:"Error Message"
	    
	       }; 
	
	
	       var template = _.template(salesTemplate);
	
	    $("#showADMain").html($(this.el).html(template(renderData)));
	
	 var responsiveHelper_dt_basic = undefined;
		var responsiveHelper_datatable_fixed_column = undefined;
		var responsiveHelper_datatable_col_reorder = undefined;
		var responsiveHelper_datatable_tabletools = undefined;
		
		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};

		$('#dt_basic1').dataTable({
			"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
				"t"+
				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
			"autoWidth" : true,
			"preDrawCallback" : function() {
				// Initialize the responsive datatables helper once.
				if (!responsiveHelper_dt_basic) {
					responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_basic1'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_dt_basic.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_dt_basic.respond();
			}
		});
		
		
		$('#dt_basic2').dataTable({
			"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"+
				"t"+
				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
			"autoWidth" : true,
			"preDrawCallback" : function() {
				// Initialize the responsive datatables helper once.
				if (!responsiveHelper_dt_basic) {
					responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_basic2'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_dt_basic.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_dt_basic.respond();
			}
		});
		
		/*$('<label/>').appendTo('#add');
		//insert the select and some options
		$select = $('<select/>').appendTo('#add').addClass('form-control pull-right');
		$('<option/>').val('1').text('Todays').appendTo($select);
		//$('<option/>').val('2').text('Week').appendTo($select);
		$('<option/>').val('3').text('Month').appendTo($select);
		*/
		
			 
		$("#monthwise").hide();
		
		
		 $("select").change(function() {

				if ( this.value == '1')

				{

			
				$("#monthwise").hide();

				$("#datewise").show();
				

				}

				else if ( this.value == '2')

				{
					
					
					$("#datewise").hide();

					$("#monthwise").show();

				}

				

				});

		this.delegateEvents();

    },
    
    getOrderDetailsInClient:function(e){
	  		
	  		new OrderStatusView().getOrderDetailsInClient(e);
	  		
    }
        
  });
  return SalesView;
});

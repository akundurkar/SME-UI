/*global define*/

define([
        'jquery',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/DashBoard/dashBoard.html'
        
], function ($,
		CommonModel,
		CommonCollection,
		dashBoardTemplate) {
	
  var dashBoardView = Backbone.View.extend({
	
	  initialize: function () {
		  
		  this.dashBoardCollection = new CommonCollection();
		  this.topServicesCollection = new CommonCollection();
		  this.topStaffCollection = new CommonCollection();
		   
	  },
    /*dashBoard:function(){
    
   	 		var renderData = {	
   	 				
   	 					errorMsg:"Error Message"
   	 		}; 
   	 
   	 		$("#showADMain").html($(this.el).html(_.template(dashBoardTemplate)));
   	 		
   	 		this.delegateEvents();

    }    */
	
	  dashBoard:function(){
		  
		  	var me = this;
		  	
			me.dashBoardCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getDashBoardDetails?branchId="+CommonUtils.getBranch("branchId");
			
			/*console.log("DashBoard collection"+me.dashBoardCollection);*/
						
			me.dashBoardCollection.fetch({
				  
					cache:false,
			   
					success: function (model, response, options) {			    	
			    	
								me.renderDashBoardOrderDetail();
	  		
					},error:function(model, xhr, options){
	  		
								me.renderUsersNotFoundTemplate();  	
					}
					
			});
			
	  },
	  
	  getTopServices:function(){
		  
		  	var me = this;
		  	
			me.topServicesCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getTopServices?branchId="+CommonUtils.getBranch("branchId");
			
			console.log("top service  collection"+me.topServicesCollection);
						
			me.topServicesCollection.fetch({
				  
					cache:false,
			   
					success: function (model, response, options) {			    	
			    	
								me.renderDashBoardOrderDetail();
	  		
					},error:function(model, xhr, options){
	  		
								me.renderUsersNotFoundTemplate();  	
					}
					
			});
			
	  },
	  
	  getTopStaff:function(){
		  
		  	var me = this;
		  	
			me.topStaffCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getTopStaff?branchId="+CommonUtils.getBranch("branchId");
			
			console.log("top staff  collection"+me.topStaffCollection);
						
			me.topStaffCollection.fetch({
				  
					cache:false,
			   
					success: function (model, response, options) {			    	
			    	
								me.renderDashBoardOrderDetail();
	  		
					},error:function(model, xhr, options){
	  		
								me.renderUsersNotFoundTemplate();  	
					}
					
			});
			
	  },
	  
	  
  
	  renderDashBoardOrderDetail:function(){
			
				var me = this;
				
				var renderData = {	
						
						            dashBoardOrderDetailsList : me.dashBoardCollection.models,
						            
						            topServicesDetailsList : me.topServicesCollection.models,
						            
						            topStaffDetailsList : me.topStaffCollection.models,
						            
			    		         	
			    		         	errorMsg:"Error Message"
			    		         		
			    				}; 
				 
				var template = _.template(dashBoardTemplate);
				    
				$("#showADMain").html($(this.el).html(template(renderData)));
				   	 
			    this.delegateEvents();
		
	  }
	 
        
  });
  
  return dashBoardView;
  
});
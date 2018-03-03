/*global define*/

define([
        'jquery',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/bookOrder/bookingLink.html'
        
], function ($,
		CommonModel,
		CommonCollection,
		BookingLinkTemplate) {
	
  var onlineBookView = Backbone.View.extend({
	  
    events: {
    	
    		"click #onlineBook":"onlineBook"
    	
    },
    
    
    onlineBook:function(){
    
    		var renderData = {					   		   
    				
    				errorMsg:"Error Message"
    					
    		}; 
   	 
    		$("#showADMain").html($(this.el).html(_.template(BookingLinkTemplate)));
    		
    		this.delegateEvents();

    }  
        
  });
  
  return onlineBookView;
  
});
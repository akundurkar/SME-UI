/*global define*/

define([
        'jquery',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/blankScreen.html'
        
], function ($,
		CommonModel,
		CommonCollection,
		blankScreenTemplate) {
	
  var BlankScreenView = Backbone.View.extend({
	  
    events: {
    	
    	
    },

    initialize: function () {
    	this.commonCollection = new CommonCollection();
    },
    
    
    blank_screen:function(){
    	var me = this;
    
   	 var renderData = {					   		   
    		 errorMsg:"Error Message"
      }; 
   	 
	 $("#showADMain").html($(this.el).html(_.template(blankScreenTemplate)));
     this.delegateEvents();

    }    
        
  });
  return BlankScreenView;
});

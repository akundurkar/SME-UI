define([
  
  '../models/commonModel'
  
], function(CommonModel){
	
  var CommonCollection = Backbone.Collection.extend({
	
	 model:CommonModel,
     
	 url: function(){
		 return CommonUtils.get("projectUrl")+"/rest/campaign/checkscreenavailable";
     }
  
  });
  
  return CommonCollection;
  
});

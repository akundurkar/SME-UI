define([
  
  '../models/userModel'
  
], function(UserModel){
	
  var UserCollection = Backbone.Collection.extend({
	
	 model:UserModel,
     
	 url: function(){
    		return CommonUtils.get("projectUrl")+"/rest/user/list";
     }
  
  });
  
  return UserCollection;
  
});

define(
[
        
'jquery',

'gritter',

'models/commonModel'

], function($,gritter,CommonModel){
	
  var commonUtils = Backbone.Model.extend({
	  
    initialize: function(){ 
    	
    	
    	this.commonModel = new CommonModel();
    	
    	this.setProjectURL();
      
    },
    defaults: {
        baseUrl : "/services/rest"
    },
    showNotification:function(title,text,image,time){
        $.gritter.add({
            title: title,
            text: text,
            image:image,
            time:time
        });
	},
	showSuccessMessage:function(text){
		this.showNotification("Success", text, 'img/success.png',5000);
	},
	showErrorMessage:function(text){
		this.showNotification("Error", text, 'img/error.png',15000);
		
	},

    
    setProjectURL:function(){
        var port = window.location.port;
    	var protocol = window.location.protocol;
    	var host = window.location.host;
    	var path = window.location.pathname;
    	var URL = (typeof port != 'undefined' && port!=null && port!=undefined)? protocol + "//"+host+ "" +path : protocol+"//"+host+":"+port+""+path;
    	//Rest Server URL
    	URL = (typeof port != 'undefined' && port!=null && port!=undefined)? protocol + "//"+host+ "/services": protocol+"//"+host+":"+port+"/services";
    	
    	URL = "http://127.0.0.1:8080/services";
    	
    	// test server
    	//URL = "http://102.249.243.186:8080/services";  
    	
    	this.set("projectUrl",URL);
    },
   
    getFormDataAsJSON: function(formSelector,inputType){
    	
		var formData = {};
		
		$(formSelector).find(inputType).each(function(i,uiInputElement) {
		
			//console.log("ui element id "+uiInputElement.id);
			
			if($(uiInputElement).val() != '') { //get only not submitted values
				
					formData[uiInputElement.id] = $(uiInputElement).val().replace(/\s+/g, " ").trim();
	            }
		});
		return formData;
	 },
	 	 
	 
	 //input form
	 //convert to array of objects,with attribute name and attribute value [ {( atrribute name : name of input parameter): 
	 									//attribute value : value }, name]
	 //convert this array to object of attribute and value
	 //
	 getFormObj : function (formId) {
		 
		    var formObj = {}; //init empty object
		    
		    var inputs = $('#'+formId).serializeArray(); //read inputs in an array of objects
		    
		    //where each object is a name:value pair. Input parameter name and value 
		    //of that parameter
		    
		   // console.log("getFormObj"+inputs.toSource());
		    
		    $.each(inputs, function (i, input) {
		    	
		    	if(input.value != '') {
		    		formObj[input.name] = input.value; //setting attribute and value dynamically attribute name:value
		    	}
		    	
		       //console.log("Input "+input.name);
		       //console.log("Value"+input.value);		        
		       //console.log("Form OBje "+formObj.toSource());
		        
		    });
		 
	       	
	       	//var directors = new CommonCollection(directorArray);
	       	
	       	//orgDataModel.set("directors", directors); 
		    
		    return formObj; //get a JSON kind of string {attribute:value,attribute:value,...}
		},
		
	 		 
	    set:function(key, value){
	    	
	    	if(value==null){
	    		
	    		sessionStorage.removeItem(key);
	    		
	    	}else{
	    		
	    		sessionStorage.setItem(key, value);	
	    	}
	    	 
	    },
	    get:function(key){
	    	return sessionStorage.getItem(key);
	    },
    
    
    
    
    setUser : function(object){
  	   	user = object;
  	    this.set("UserObject", JSON.stringify(user) );
     },
     
     getUser : function(key){
    	 
    	 if(typeof user != "undefined"){
    	
    		 if(user[key]){
	    		 return user[key];
	    	 }
	    	 else {
	    		 return null;
	    	 }
    	 }else{
    		 var user=JSON.parse( CommonUtils.get('UserObject') );
    		 if(user!=null){
    			 return user[key];
    		 }
    		 
    	 }
     },
    

     setOffer : function(object){
   	   	offer = object;
   	    this.set("OfferObject", JSON.stringify(offer) );
      },
      
      getOffer : function(key){
     	 
     	 if(typeof offer != "undefined"){
     	
     		 if(offer[key]){
 	    		 return offer[key];
 	    	 }
 	    	 else {
 	    		 return null;
 	    	 }
     	 }else{
     		 var offer=JSON.parse( CommonUtils.get('OfferObject') );
     		 if(offer!=null){
     			 return offer[key];
     		 }
     		 
     	 }
      },
     

     
     setBranch : function(object){
   	   	branch = object;
   	    this.set("BranchObject", JSON.stringify(branch) );
      },
      
      getBranch : function(key){
     	 
     	 if(typeof branch != "undefined"){
     	
     		 if(branch[key]){
 	    		 return branch[key];
 	    	 }
 	    	 else {
 	    		 return null;
 	    	 }
     	 }else{
     		 var branch=JSON.parse( CommonUtils.get('BranchObject') );
     		 if(branch!=null){
     			 return branch[key];
     		 }
     		 
     	 }
      },
     

     
     
     setOrganization : function(object){
    	 organization = object;
   	    this.set("OrganizationObject", JSON.stringify(organization) );
      },
      
      getOrganization: function(key){
     	 
     	 if(typeof organization != "undefined"){
     	
     		 if(organization[key]){
 	    		 return organization[key];
 	    	 }
 	    	 else {
 	    		 return null;
 	    	 }
     	 }else{
     		 var organization = JSON.parse( CommonUtils.get('OrganizationObject') );
     		 if(organization!=null){
     			 return organization[key];
     		 }
     		 
     	 }
      },     
     
     setDataTransfer : function(object){
   	   	dataTransfer = object;
   	    this.set("DataTransferObject", JSON.stringify(dataTransfer) );
      },
      
      getDataTransfer : function(key){
     	 
     	 if(typeof dataTransfer != "undefined"){
     	
     		 if(dataTransfer[key]){
 	    		 return dataTransfer[key];
 	    	 }
 	    	 else {
 	    		 return null;
 	    	 }
     	 }else{
     		 var dataTransfer = JSON.parse( CommonUtils.get('DataTransferObject') );
     		 if(dataTransfer != null){
     			 return dataTransfer[key];
     		 }
     		 
     	 }
      },
     
      setUserInfo : function(key,value){
    		 user[key] = value;
    		 this.set("UserObject", JSON.stringify(user));
      }
          

  });
  CommonUtils = new commonUtils();
  return CommonUtils;
});







//jquery map
//jquery serializeobject...		

/* getSelectedMediaObj : function (formId) {
	 
	    var formObj = {};
	    
	    var inputs = $('#'+formId).serializeArray();
	    
	    //console.log("inputs "+inputs.toSource());
	    
	    var j = 1;
	      
	    $.each(inputs, function (i, input) {
	    	
	    	if(input.value != '') {
	    		j++;
	    		formObj[input.name] = input.value; //setting attribute and value dynamically attribute name:value
	    	}
	    	
	        //console.log("Input "+input.name);
	       // console.log("Value"+input.value);		        
	      //  console.log("Form OBje "+formObj.toSource());
	        
	    });
	    
	   
	    
	    var selectedContent = new CommonModel(formObj);
	    
	    //console.log("selectedContent"+selectedContent.toSource());
	    
       	var mediaArray = new Array();		       	
	       	
       	for (i = 0; i < j; i++) {		       		
       		
       		var media = "media_"+i;
       	    var seconds = "seconds_"+i;
       	    
       	    var selectedMedia = new Object();
       	    
       	    selectedMedia.media = selectedContent.get(media);
       	    selectedMedia.seconds = selectedContent.get(seconds);
       	    
       	    //var directorJSON = JSON.stringfy(director);
       	    var singleMediaDataModel=new CommonModel(selectedMedia);
       	    mediaArray.push(singleMediaDataModel);
       	    
       	}
       	
       	return mediaArray;	    

	},*/





//array of name: and value: object 

/*			    console.log("Inputs getMediaObj"+$("input[name='media']:checked").toSource());
			    
			    var array =  $("input[name='media']:checked").map(
			    		function(){
			    			return this.value;
			    		}
			    		).get()
			    
			    return array;*/

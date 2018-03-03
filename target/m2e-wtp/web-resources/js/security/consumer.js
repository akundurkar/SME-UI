var consumer = {};
//var oauthProviderDomain="http://127.0.0.1:8080";

var oauthProviderDomain="https://app.bookmyled.com";

consumer.providerInfo =
{ consumerKey   : "com.showad.net"
, consumerSecret: "9a62c7a97e834d3ea730a1cf33e6aa1c"
, serviceProvider:
  { signatureMethod     : "HMAC-SHA1"
  , requestTokenURL     : oauthProviderDomain+"/OAuthProvider/request_token"
  , userAuthorizationURL: oauthProviderDomain+"/OAuthProvider/authorize"
  , accessTokenURL      : oauthProviderDomain+"/OAuthProvider/access_token"
  , expireTokenURL 		: oauthProviderDomain+"/OAuthProvider/expire_token"
  , echoURL             : oauthProviderDomain+"/OAuthProvider/echo"
  }
};

consumer.initializeForm =
function initializeForm(form, etc, usage) {
    var selector = etc.elements[0];
    var selection = selector.options[selector.selectedIndex].value;
    var selected = consumer[selection];
    if (selected != null) {
        consumer.setInputs(etc, { URL           : selected.serviceProvider[usage + "URL"]
                                , consumerSecret: selected.consumerSecret
                                , tokenSecret   : selected[usage + "Secret"]
                                });
        consumer.setInputs(form, { oauth_signature_method: selected.serviceProvider.signatureMethod
                                 , oauth_consumer_key    : selected.consumerKey
                                 , oauth_token           : selected[usage]
                                 });
    }
    return true;
};

consumer.setInputs =
function setInputs(form, props) {
    for (p in props) {
        if (form[p] != null && props[p] != null) {
            form[p].value = props[p];
        }
    }
}

consumer.signForm =
function signForm(form, etc) {
    form.action = etc.URL.value;
    var accessor = { consumerSecret: etc.consumerSecret.value
                   , tokenSecret   : etc.tokenSecret.value};
    var message = { action: form.action
                  , method: form.method
                  , parameters: []
                  };
    for (var e = 0; e < form.elements.length; ++e) {
        var input = form.elements[e];
        if (input.name != null && input.name != "" && input.value != null
            && (!(input.type == "checkbox" || input.type == "radio") || input.checked))
        {
            message.parameters.push([input.name, input.value]);
        }
    }
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    for (var p in parameterMap) {
        if (p.substring(0, 6) == "oauth_"
         && form[p] != null && form[p].name != null && form[p].name != "")
        {
            form[p].value = parameterMap[p];
        }
    }
    return true;
};


function oauthAuthorization() {
    var accessor = consumer["providerInfo"];
    var message = {
        method: "post", action: accessor.serviceProvider.requestTokenURL
      , parameters: [["scope", "public"]]
    };
    var requestBody = OAuth.formEncode(message.parameters);
    OAuth.completeRequest(message, accessor);
    var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
    var requestToken = newXMLHttpRequest();
    requestToken.onreadystatechange = function receiveRequestToken() {
        if (requestToken.readyState == 4) {
            var dump = requestToken.status+" "+requestToken.statusText
                  +"\n"+requestToken.getAllResponseHeaders()
                  +"\n"+requestToken.responseText;
            if (true) {
                var results = OAuth.decodeForm(requestToken.responseText);
                message = {method: "post", action: accessor.serviceProvider.accessTokenURL};
                OAuth.completeRequest(message,
                    { consumerKey   : accessor.consumerKey
                    , consumerSecret: accessor.consumerSecret
                    , token         : OAuth.getParameter(results, "oauth_token")
                    , tokenSecret   : OAuth.getParameter(results, "oauth_token_secret")
                    });
                var requestAccess = newXMLHttpRequest();
                requestAccess.onreadystatechange = function receiveAccessToken() {
                    if (requestAccess.readyState == 4) {
                        var results = OAuth.decodeForm(requestAccess.responseText);
                        window.router.redirectFromOAuth(OAuth.getParameter(results, "oauth_token"),OAuth.getParameter(results, "oauth_token_secret"));
                    }
                };
                requestAccess.open(message.method, message.action, true); 
                requestAccess.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
                requestAccess.send();
            }
        }else{
        }
    };
    requestToken.open(message.method, message.action, true); 
    requestToken.setRequestHeader("Authorization", authorizationHeader);
    requestToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requestToken.send(requestBody);
};


function signOauthRequest(message,oauth_token,oauth_token_secret){
	    var accessor = consumer["providerInfo"]; 
	    OAuth.setParameter("oauth_version", "1.0");   
	    OAuth.setParameter("oauth_timestamp", OAuth.timestamp());
		OAuth.setParameter("oauth_nonce", OAuth.nonce(6));
		OAuth.setParameter("oauth_token", oauth_token);
		OAuth.setParameter("oauth_token_secret",oauth_token_secret);
		OAuth.SignatureMethod.sign(message, accessor);
}

function expireToken(oauth_token,oauth_token_secret){
	 var accessor = consumer["providerInfo"];
	  var expireToken = newXMLHttpRequest();
	  var message = {
		        method: "post", action: accessor.serviceProvider.expireTokenURL
		      , parameters: [["scope", "public"]]
		    };
	  var requestBody = OAuth.formEncode(message.parameters);
	  expireToken.onreadystatechange = function expiredToken() {
		  if (expireToken.readyState == 4) {
			  window.myRouter.logoutAndExpireToken();
		   }
		  };
	  expireToken.open(message.method, message.action, true); 
	  expireToken.setRequestHeader("oauth_token", oauth_token);
	  expireToken.setRequestHeader("oauth_token_secret",oauth_token_secret);
	  expireToken.send(requestBody);
}

function newXMLHttpRequest() {
    try{
        return new XMLHttpRequest();
    } catch(e) {
        try{
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try{
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                throw e;
            }
        }
    }
};
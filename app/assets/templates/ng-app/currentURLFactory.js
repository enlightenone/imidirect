// This factory is to strip url host from absolute url and return url path to be stored on statuses database
app.factory('currentUrl', [ function() {

  var service = {}; // Object with methods and variables available for access
  var current_url;

  //Assign input data to cache from form fields submitted by the user;
  service.path = function(){
    current_url = location.href ; //obtain the current url path
    return current_url.replace( location.protocol + "//" + location.host, "");
  };

 return service ;
}]);
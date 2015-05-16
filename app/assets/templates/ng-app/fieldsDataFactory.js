app.factory('fieldsData', function($cacheFactory) {
  var fetched_cache = $cacheFactory('myData').get('myData'); // Retrieve Cache
  var service = {}; // Object with methods and variables available for access
  var fields_data = {};  
  var previous_fields_cache ;

  //Assign input data to cache from form fields submitted by the user;
  service.catchData = function(name, form_data){
    fields_data[name] = form_data;
    console.log("name: " + name);
    console.log("data: " + form_data);

    if(fetched_cache) {
      previous_fields_cache = fetched_cache ;
      previous_fields_cache[name] = form_data ;
      $cacheFactory('myData').put('myData', previous_fields_cache);
      console.log("form 6: " + cache["form6"]["i765_date_of_previous_application"]);
    } else {
      $cacheFactory('myData').put('myData', fields_data);
    }
  };

 return service ;
});
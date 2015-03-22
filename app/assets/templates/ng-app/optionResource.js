app.factory("OptionResource", function($resource) {

  return function(options){

  
  var Resource = $resource('/apis/optiion/:id', {id: '@id'},
                    {
                      search: {
                            method: 'GET',
                            url: '/apis/option/:id',
                            params:{options: options},
                            headers : {'Content-Type' : 'application/json'},
                          } 
                    });

   return Resource;

 }
  });
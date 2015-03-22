app.factory("OptionResource", function($resource) {

  return function(options, case_id){
  var Resource = $resource('/apis/option/:id', {id: '@id'},
                    {
                      initiate: {
                              method: 'GET',
                              url: '/apis/option/:id',
                              params:{options: options, case_id: case_id},
                              headers : {'Content-Type' : 'application/json'},
                          } 
                    });
         return Resource;
      }
  });
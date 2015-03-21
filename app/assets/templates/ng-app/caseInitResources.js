app.factory("CaseInit", function($resource) {
  return function(case_id, category){ 
  var Resource = $resource('/api/ids/:id', {id: '@id'},
                    {
                      init: {
                            method: 'POST',
                            url: '/api/ids/:id',
                            params:{case_id: case_id, category: category},
                            headers : {'Content-Type' : 'application/json'},
                          } 
                    });

   return Resource;
 }
  });
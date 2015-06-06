app.factory("StatusResource", function($resource) {
  return function(status, case_id){
  var Resource = $resource('api/statuses/:id', {id: '@id'},
                    {
                      update: {
                              method: 'PUT',
                              url: 'api/statuses/:id',
                              params:{status: status, case_id: case_id},
                              headers : {'Content-Type' : 'application/json'},
                          }
                    });
         return Resource;
      }
  });
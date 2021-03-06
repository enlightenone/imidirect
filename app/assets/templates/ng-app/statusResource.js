//This resource is to fetch progress status per each cases
app.factory("StatusResource", function($resource) {
  return function(status, case_id, current_url){
  var Resource = $resource('/api/statuses/:id', {id: '@id'},
                    {
                      update: {
                              method: 'PUT',
                              url: '/api/statuses/:id',
                              params:{status: status, case_id: case_id, current_url: current_url},
                              headers : {'Content-Type' : 'application/json'}
                          },
                       get: {
                              method: 'GET', 
                              url: '/api/statuses/:id',
                              headers : {'Content-Type' : 'application/json'}
                          }
                    });
         return Resource;
      }
  });
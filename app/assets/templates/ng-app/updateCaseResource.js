app.factory("updateCaseResource", function($resource) {
  return function(new_app_id, case_id){
  var Resource = $resource('/api/ids/:id', {id:'@id'},
                    {
                      update: {
                              method: 'GET',
                              url: '/api/ids/:id/edit',
                              params:{new_app_id: new_app_id, case_id: case_id},
                              headers : {'Content-Type' : 'application/json'},
                          } 
                    });
         return Resource;
      }
  });
app.factory("updateCaseResource", function($resource) {
  return function(case_id){
  var Resource = $resource('/api/ids/:id', {id:'@id'},
                    {
                      initiate: {
                              method: 'GET',
                              url: '/api/ids/:id/edit',
                              params:{case_id: case_id},
                              headers : {'Content-Type' : 'application/json'}
                       },
                      applicationId: {
                              method: 'GET',
                              url: '/api/ids/:id',
                              params:{case_id: case_id},
                              headers : {'Content-Type' : 'application/json'}
                      } 

                    });
         return Resource;
      }
  });
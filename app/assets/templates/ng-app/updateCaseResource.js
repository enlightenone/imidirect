// This factory is specifically designed to update and fetch case application id
app.factory("updateCaseResource", function($resource) {
  return function(case_id){
  var Resource = $resource('/api/ids/:id', {id:'@id'},
                    {
                      initiate: { //  To update application id 
                              method: 'GET',
                              url: '/api/ids/:id/edit',
                              params:{case_id: case_id},
                              headers : {'Content-Type' : 'application/json'}
                       },
                      applicationId: { // To fetch application id
                              method: 'GET',
                              url: '/api/ids/:id',
                              params:{case_id: case_id},
                              headers : {'Content-Type' : 'application/json'}
                      } 

                    });
         return Resource;
      }
  });
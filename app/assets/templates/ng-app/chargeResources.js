app.factory("FeesResource", function($resource) {
   return $resource('/api/cases/:case_id/charges/:case_id', {id:'@case_id'},
                      {
                        'calculate': {method: 'get'}
                      })
           });
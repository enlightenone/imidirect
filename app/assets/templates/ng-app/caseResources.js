app.factory("Case", function($resource) {  
   return $resource('/api/cases/:id', null,
                      {
                        'update': {method: 'PUT'}
                      })
           });
app.factory("Case", function($resource) {  
   return $resource('/api/cases', null,
                      {
                        'save': {method: 'POST'}
                      })
           });
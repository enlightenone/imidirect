app.factory("CaseInit", function($resource) {  
   return $resource('/api/ids/:id', {id:'@id'},
                      {
                        'get': {method: 'get'}
                      })
           });
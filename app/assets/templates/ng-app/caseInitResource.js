app.factory("CaseInit", function($resource) {
   return $resource('/api/cases/:id', {id:'@id'},
                      {
                        'initiate': {method: 'put'}
                      })
           });
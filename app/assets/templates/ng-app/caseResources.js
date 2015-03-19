app.factory("Case", function($resource) {  
   return $resource('/api/cases/:id', {id:'@id'},
                      {
                        'save': {method: 'post'}
                      })
           });
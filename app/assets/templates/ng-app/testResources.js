app.factory("testResource", function($resource) {  
   return $resource('/apis/populate/:id', {id:'@id'},
                      {
                        'setting': {method: 'post'}
                      })
           });
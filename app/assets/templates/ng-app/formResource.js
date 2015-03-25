
app.factory("formsResource", function($resource) {  
   return $resource('/apis/populate/:id', {id:'@id'},
                      {
                        'setting': {method: 'post'}
                      })
           });
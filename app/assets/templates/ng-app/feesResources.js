app.factory("FeesSummary", function($resource) {  
   return $resource('/api/cases/1/charges/:id', {id:'@id'}) ;
});
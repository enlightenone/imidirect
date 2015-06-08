app.factory("ActiveCaseStatusResource", function($resource) {
   return $resource('/apis/active_status/:id', {id:'@id'});
});
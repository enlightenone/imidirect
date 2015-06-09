app.factory('progressStatus', ['StatusResource', function(StatusResource) {

  var service = {}; // Object with methods and variables available for access
  var progress_status; 
  var status_update_result ;
  var retrieved_status_result ;
  //Update progress status of each stage of the application
  service.update = function(status, current_case_id){
    progress_status = StatusResource(status, current_case_id );
    status_update_result = progress_status.update({id: current_case_id});  
    status_update_result.$promise.then(function(data) {
      console.log(data["status_update_message"]);
    });
  };

  //Retrieve progress status for requested case.
  service.retrieve = function(current_case_id){
    progress_status = StatusResource(status, current_case_id);
    retrieved_status_result = progress_status.retrieve({id: current_case_id}); 
    retrieved_status_result.$promise.then(function(data) {
      console.log("fetched data result: " + data.complete);
      return data.complete;
    }); 
  };
 return service ;
}]);
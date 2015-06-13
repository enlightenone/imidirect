app.factory('progressStatus', ['StatusResource', 'accessVerification',  function(StatusResource, accessVerification) {

  var service = {}; // Object with methods and variables available for access
  var progress_status; 
  var status_update_result ;
  var retrieved_status_result ;
  //Update progress status of each stage of the application
  service.update = function(status, current_case_id, current_url){
    progress_status = StatusResource(status, current_case_id, current_url );
    status_update_result = progress_status.update({id: current_case_id});  
    status_update_result.$promise.then(function(data) {
      console.log(data["status_update_message"]);
      accessVerification.check(status, current_case_id);
    });
  };

 return service ;
}]);
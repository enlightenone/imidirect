app.factory('i130AppId', ['updateCaseResource', function(updateCaseResource) {
  var service = {};

  service.compare = function(category, case_id, active_app_id){ 

    if(category === 'i130'){
      var current_case = updateCaseResource(case_id);
      var fetched_result = current_case.applicationId({id:case_id}) ; // The application retrieve initial application id.
      fetched_result.$promise.then(function(data){
        var initial_application_id = data['application_id'] ; 

        if (initial_application_id != active_app_id ){
          var updated_current_case = current_case.initiate({id: active_app_id );
          updated_current_case.$promise.then(function(data) {
            console.log(data['message']); // return successful update message
          });// end of updated_current_case.$promise method         
        }// end of initial app id and active app id comparison if statement
      }); // end of feteched_result.$promise metho
    } else {
      break;
    } // end of if i130 statement
  }; // end of service.compare method
 return service ;
}]);
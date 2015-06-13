app.factory('accessVerification', ['StatusResource', 'ActiveCaseStatusResource', function(StatusResource, ActiveCaseStatusResource) {
  var service = {}; // Object with methods and variables available for access
  var progress_status; 
  var retrieved_status_result ;
 //Authenticate the application is on right stage of the application or it will directo to home page
  service.check = function(status, current_case_id){
      //Check To see if access to the stage of the application is permissible.

      progress_status = StatusResource();
       retrieved_status_result = progress_status.get({id: current_case_id});
       retrieved_status_result.$promise.then(function(data){
          

          if (status == 'questionnaire'){
             if (!data['status'].questionnaire || 
                (data['status'].questionnaire && data['status'].filling && !data['status'].payment) || 
                (data['status'].questionnaire && data['status'].filling && data['status'].payment) ||
                (data['status'].questionnaire && data['status'].filling &&  data['status'].payment &&  data['status'].complete)
                ) {
                location.assign('/');
             }            
          } else if (status == 'filling'){
             if (!data['status'].filling|| 
                (!data['status'].questionnaire && !data['status'].filling && !data['status'].payment) || 
                (data['status'].questionnaire && data['status'].filling && data['status'].payment) ||
                (data['status'].questionnaire && data['status'].filling &&  data['status'].payment &&  data['status'].complete)
                ) {
                location.assign('/');
             }      

          } else if (status == 'payment') {
            if (!data['status'].payment ||
                (!data['status'].questionnaire && !data['status'].filling && !data['status'].payment) ||
                (data['status'].questionnaire && data['status'].filling && !data['status'].payment) ||
                (data['status'].questionnaire && data['status'].filling &&  data['status'].payment &&  data['status'].complete)
                ) {
                location.assign('/');
             }      
          }
       });
  };

 return service ;
}]);
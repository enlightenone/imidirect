app.controller("initCaseController", function($scope, $http, ActiveCaseStatusResource, generateCase) {
      //This method is to obtain most current user id.
   $scope.getCurrentUserId = function(current_user_id){
     $scope.current_user_id = current_user_id;
        ActiveCaseStatusResource.get({id: $scope.current_user_id }, function(data){ 
          $scope.case_active_status = data["active_case_status"];
           console.log("Case Active Status in InitCaseController: " + $scope.case_active_status);
          // if($scope.current_user_id && ($scope.case_active_status == false)){
          //   generateCase.initiate($scope.current_user_id, app_id)
          //   location.assign( '/users/' + $scope.current_user_id + '/apps/1#/main/option?case_id=' + generateCase.case_id() + '&app_id=' + app_id);
          // }else {
          //   console.log("Active Case Exist")
          // }
        });
   };

   // ActiveCaseStatusResource.get({id: $scope.current_user_id }, function(data){ 
   //        $scope.case_active_status = data["active_case_status"];

   //        // if($scope.current_user_id && ($scope.case_active_status == false)){
   //        //   generateCase.initiate($scope.current_user_id, app_id)
   //        //   location.assign( '/users/' + $scope.current_user_id + '/apps/1#/main/option?case_id=' + generateCase.case_id() + '&app_id=' + app_id);
   //        // }else {
   //        //   console.log("Active Case Exist")
   //        // }
   //      });
  



   $scope.caseStarts = function(app_id){
      alert($scope.case_active_status);
       // if(!$scope.current_user_id){
       //    location.assign('/sessions/new');
       // }

      // $http.get('/current_user').success(function(data){
      //   $scope.current_user_id = data['current_user'].id ;
      //   console.log("Current User Id in InitCaseController:" + $scope.current_user_id);
      //   ActiveCaseStatusResource.get({id: $scope.current_user_id }, function(data){ 
      //     $scope.case_active_status = data["active_case_status"];

      //     if($scope.current_user_id && ($scope.case_active_status == false)){
      //       generateCase.initiate($scope.current_user_id, app_id)
      //       location.assign( '/users/' + $scope.current_user_id + '/apps/1#/main/option?case_id=' + generateCase.case_id() + '&app_id=' + app_id);
      //     }else {
      //       console.log("Active Case Exist")
      //     }
      //   });
      // }).error(function(){
      //   location.assign('/sessions/new');// if not logged in, redirect to the login page
      // });

      };//end of CaseStarts function 


}); // end of initCaseController Controller
    
                                    
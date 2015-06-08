app.controller("initCaseController", function($scope, $http, ActiveCaseStatusResource, generateCase) {
      //This method is to obtain most current user id.

      $http.get('/current_user').success(function(data){
        $scope.current_user_id = data['current_user'].id ;
        console.log("Current User Id in InitCaseController:" + $scope.current_user_id);
        ActiveCaseStatusResource.get({id: $scope.current_user_id }, function(data){ 
          $scope.case_active_status = data["active_case_status"];

          if($scope.current_user_id && ($scope.case_active_status == false ){
            generateCase.initiate($scope.current_user_id, 3)

          }

        });
      }).error(function(){
        location.assign('/sessions/new');// if not logged in, redirect to the login page
      });

      // if($scope.current_user_id && !$scope.case_active_status ){

      // }



}); // end of initCaseController Controller
    
                                    
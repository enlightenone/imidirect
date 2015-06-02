app.controller("initCaseController", function($scope) {

   $scope.assignCaseId = function (new_case_id) {
      $scope.case_id = new_case_id;
      console.log("case id: " + $scope.case_id)

  };

}); // end of initCaseController Controller
    
                                    
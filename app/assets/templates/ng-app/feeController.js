app.controller("feeController", function($scope, $stateParams,$location) {
    $scope.$parent.transaction_status_flag = true ; // activate the transaction progress class.
    $scope.current_case_id = $stateParams['case_id']; // obtain current case id from params
    console.log("Fee Url Path: " + $location.path()); 
}); // end of feeController Controller
    
                                      
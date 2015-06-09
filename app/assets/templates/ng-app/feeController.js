app.controller("feeController", function($scope, $stateParams, progressStatus, currentUrl) {
    $scope.$parent.transaction_status_flag = true ; // activate the transaction progress class.
    $scope.current_case_id = $stateParams['case_id']; // obtain current case id from params

    progressStatus.update("payment", $scope.current_case_id, currentUrl.path());
}); // end of feeController Controller
    
                                      
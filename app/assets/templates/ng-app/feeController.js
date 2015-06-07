app.controller("feeController", function($scope, $stateParams) {
    $scope.$parent.transaction_status_flag = true ; // activate the transaction progress class.
    $scope.current_case_id = $stateParams['case_id']; // 
    console.log("IniCase Controller case id inside of feeController: " + $scope.case_id);
}); // end of feeController Controller
    
                                    
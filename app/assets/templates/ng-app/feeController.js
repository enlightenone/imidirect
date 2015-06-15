app.controller("feeController", function($scope, $sce, $stateParams, progressStatus, currentUrl) {
    $scope.$parent.forms_status_flag = true ;  //activate form progress bar
    $scope.$parent.transaction_status_flag = true ; // activate the transaction progress class.
    $scope.current_case_id = $stateParams['case_id']; // obtain current case id from params
    var url_path = '/api/cases/' + $scope.current_case_id + '/charges' // absult path to charge method
    $scope.urlPath = $sce.trustAsResourceUrl(url_path); // hack to resolve Strict Contextual Escaping issue


    progressStatus.update("payment", $scope.current_case_id, currentUrl.path());
}); // end of feeController Controller
    
                                      
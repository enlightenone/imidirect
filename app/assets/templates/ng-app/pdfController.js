app.controller("pdfController", function($scope, $stateParams, progressStatus, currentUrl) {
    $scope.$parent.forms_status_flag = true ;  //activate form progress bar
    $scope.$parent.transaction_status_flag = true ; // activate the transaction progress bar.
    $scope.$parent.complete_status_flag = true ; //activate the complete progress bar
    $scope.current_case_id = $stateParams['case_id']; // obtain current case id from params
    $scope.completed_pdf_package_url = "/generated_pdfs/" + $scope.current_case_id + "_combined.pdf" ; 
    progressStatus.update("complete", $scope.current_case_id, currentUrl.path());
    // This is to update the final status
    $scope.finalCaseStatusUpdate = function() {
      progressStatus.update("close", $scope.current_case_id, $scope.completed_pdf_package_url);
    };
}); // end of feeController Controller
    
                                      
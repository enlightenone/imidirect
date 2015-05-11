app.controller("statusController", function($scope,  $state, $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, formsResource, OptionResource, $resource) {
    $scope.questionnaire_status_flag = true;
    $scope.forms_status_flag = true;
    $scope.transaction_status_flag = true;

    console.log("Inside of statusController");
    console.log("Transaction status flag: " + $scope.transaction_status_flag );
    
});
    
                                    
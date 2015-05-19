app.directive('ngFeesSummary', function(){
// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope', '$stateParams',  '$cookieStore', 'FeesSummary' , function($scope, $stateParams, 
      $cookieStore, FeesSummary ){
      $scope.fees_calculation_flag = $stateParams['fees_calculation_flag'];
      // call fees calculation function when the calculation fee flag is activated.

      /*****************Total Fees Calculation Functions**********************/
     if ($scope.fees_calculation_flag == "true"){ 
        $cookieStore.put("current_case_id", $scope.current_case_id);
        FeesSummary.get({id: $scope.current_case_id }, function(data){
            $scope.total_fee = data['total_fee'];
            $scope.sub_total_fees = data['sub_total_fees'];
            $scope.converted_total_fee = $scope.total_fee + "00";
            //reset the fees calculation flag to null
            $scope.fees_calculation_flag = null ;
        });
    } // end of if statment
  /*****************End of Total Fees Calculation Functions***************/
    }],
    link: function($scope) {
        $scope.contentUrl = 'templates/fees/fees-summary-template.html'; //content url as scope to be rendered on the directive template
    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
app.controller("frmCntrl", function($attrs, $scope,  $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, formsResource, OptionResource, $resource) {

    $scope.frmOptions = {}; 

    /* testing scope functionality*/
    $scope.testVariable = "hello"

    /* Category Templates Section */
    /* default template */
    if (!$scope.formTemplate){
      $scope.formTemplate ='templates/i130/questionnaire/i130-status.html' ;
    }

    
    /* End of Category Templates Section */
    $scope.formFnc = function() {
        $scope.testVariable = "Nihao" ;
        console.log($scope.frmOptions.test);

    };
});



    
                                    
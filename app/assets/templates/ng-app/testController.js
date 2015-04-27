app.controller("frmCntrl", function($attrs, $scope,  $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, formsResource, OptionResource, $resource) {

     $scope.frmOptions= {};

    /* testing scope functionality*/
    $scope.testVariable = "hello"

    /* Category Templates Section */
    /* default template */
    if (!$scope.formTemplate){
      $scope.currentTemplate ='templates/i130/questionnaire/i130-status.html' ;
    }

    
    /* End of Category Templates Section */
    $scope.formFnc = function(category, option) {
        var categoryDirectory = 'templates/' + category '/questionnaire/' ;
        var formPartial = null ;


        switch (option) {
            case 'status':
                $scope.currentTemplate = 'templates/i130/questionnaire/i130-status.html';
                break;
            case 'pr';
                $scope.currentTemplate = 'templates/i130/questionnaire/i130-status.html';
            break;
            case 'pr':
            break;
            case 'citizen':
            break;
            default:



        }


        $scope.currentTemplate = option == "pr" ? 'templates/i130/questionnaire/i130-pr.html' : 'templates/i130/questionnaire/i130-citizen.html'; 
    };
});



    
                                    
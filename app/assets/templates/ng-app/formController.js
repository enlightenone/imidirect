app.controller("formController", function($scope, $stateParams, $cookies, 
                                          $cookieStore, myCache, Case, CaseInit, generateCase, fieldsData, formsResource, 
                                          OptionResource, $resource) {
   
    console.log("Outside of formController");

   $scope.current_case_id = $stateParams['case_id']; // 
    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    // To retain form options after the form has been submitted to determine button options.
    $scope.switchOptions = $stateParams ; 
    //Form Category
    $scope.formCategory = {}; 

    //remove cookie's content before form
    $scope.restCookie = function(){
        var cache = myCache.get('myData');
        if (cache){
            cache.removeAll();
        }
    };


    //************** Case form selections **********//

    $scope.formTmpSelection = function(selections) {
        $scope.application_type = selections['application_type'];
        $scope.form_templates = {};
        var key;
        for (i=1; i < 10 ; i++) {
            key = 'section' + i ;
            $scope.form_templates[key] = selections[key] ;
        }
    };

    // console.log("Case selection value passed from params: " + $scope.switchOptions  );

    $scope.formTmpSelection($scope.switchOptions);

     //********* End of Case form selections *******//

}); // end of formController Controller
    
                                    
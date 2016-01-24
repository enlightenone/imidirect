app.controller("formController", function($scope, $stateParams, $cookies, progressStatus, 
                                          $cookieStore, myCache, Case, CaseInit, generateCase, fieldsData, formsResource, 
                                          OptionResource, $resource, currentUrl) {

    $scope.$parent.forms_status_flag = true ; // update progress status for form
    $scope.current_case_id = $stateParams['case_id']; // obtain current case id from params

    // This update progress and assign url
    progressStatus.update("filling", $scope.current_case_id, currentUrl.path());
    console.log("Outside of formController");

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

    $scope.selectOptionsText = function(selection){
        var selectionText;
        switch(selection){
            case "i130-applicant":
                selectionText = "Applicant Information";
                break;
            case "i765-applicant":
                selectionText = "Applicant Information";
                break;
            case "i485-applicant":
                selectionText = "Applicant Information";
                break;
            case "i130-sponsor":
                selectionText = "Sponsor Information";
                break;
            case "i130-option":
                selectionText = "I-130 Form Information";
                break;
            case "i485-option":
                selectionText = "I-485 Form Information";
                break;
            case "i131-option":
                selectionText = "I-131 Form Information";
                break;
            case "i765-option":
                selectionText = "I-1765 Form Information";
                break;
            case "submit":
                selectionText = "Submit";
                break;
        } // End of switch block
        return selectionText; 
    } // End of $scope.selectOptionsTexts function

    $scope.formTmpSelection = function(selections) {
        $scope.filteredSelects = {};
        $scope.formSelections = [];
        var optionsTerms = {};

        for(var key in selections){
            if(selections[key] != "undefined" ){
              $scope.filteredSelects[key] = selections[key];
            }
        } //end of for loop block

        $scope.application_type = $scope.filteredSelects['application_type'];
        $scope.form_templates = {};
        var key, selection_txt, select_term;
        for (i=1; i < 10 ; i++) {
          key = 'section' + i ;
          $scope.form_templates[key] = $scope.filteredSelects[key] ;
          selection_txt = $scope.selectOptionsText($scope.filteredSelects[key]); 

          if(selection_txt != undefined){
            select_term = "." + key;
            $scope.formSelections.push({section: select_term, optionText: selection_txt});
          }
        } // End of for loop 
        console.log($scope.formSelections);
    };

    $scope.formTmpSelection($scope.switchOptions);

    //********* End of Case form selections *******//

}); // end of formController Controller
    
                                    
app.controller("frmCntrl", function($attrs, $scope,  $stateParams, $cookies, $cookieStore, myCache, CaseInit, formsResource, OptionResource, $resource) {

     $scope.frmOptions= {};

    /* Category Templates Section */
    /* default template */
    if (!$scope.currentTemplate){
      $scope.currentTemplate ='templates/i130/questionnaire/i130-status.html' ;
    }

    /* End of Category Templates Section */
    $scope.formFnc = function(category, option) {
        /* Determine the category directory*/
        var categoryDirectory = 'templates/' + category + '/questionnaire/' ;
        var formPartial ;

        /* Choose partial */
        switch (option) {
            case 'status':
                formPartial = category + '-status.html';
                break;
            case 'permanent':
                formPartial = category + '-permanent.html';
                break;
            case 'citizen':
                formPartial = category + '-citizen.html';
                break;
            default:
                formPartial = category + '-status.html';
        }
        $scope.currentTemplate = categoryDirectory + formPartial ;
    };


   /* I-130 Category Data */

   $scope.i130_category = {"i130-pr-category-1": {
                                           'question': "Permanent Resident Question 1",
                                           'quota': false,
                                           'qualification': false},
                    "i130-pr-category-2": {
                                           'question': "Permanent Resident Question 1",
                                           'quota': true,
                                           'qualification': false},
                    "i130-pr-category-3": {
                                           'question': "Permanent Resident Question 3",
                                           'quota': true,
                                           'qualification': false},
                    "i130-pr-category-4": {
                                           'question': "Permanent Resident Question 4",
                                           'quota': true,
                                           'qualification': false},
                    "i130-pr-category-5": {
                                           'question': "Permanent Resident Question 5",
                                           'quota': true,
                                           'qualification': false},
                    "i130-pr-category-6": {
                                           'question': "Permanent Resident Question 6",
                                           'quota': true,
                                           'qualification': false}, 
                    "i130-citizen-category-1": {
                                           'question': "Citizen Question 1",
                                           'quota': true,
                                           'qualification': false},
                    "i130-citizen-category-2": {
                                           'question': "Citizen Question 1",
                                           'quota': true,
                                           'qualification': false},
                    "i130-citizen-category-3": {
                                           'question': "Citizen Question 3",
                                           'quota': true,
                                           'qualification': false},
                    "i130-citizen-category-4": {
                                           'question': "Citizen Question 4",
                                           'quota': true,
                                           'qualification': false},
                    "i130-citizen-category-5": {
                                           'question': "Citizen Question 5",
                                           'quota': true,
                                           'qualification': false},
                    "i130-citizen-category-6": {
                                           'question': "Citizen Question 6",
                                           'quota': true,
                                           'qualification': false}
    };

    $scope.formFnc2 = function(option) {
        /* Qualification Statement */
        $scope.quota= $scope.i130_category[option]['quota'];

        /* Partial Template */
        $scope.currentTemplate ='templates/i130/questionnaire/i130-qualification.html' ;

    };

    $scope.formFnc3 = function(option){

        if ( option == "yes"){
            $scope.currentTemplate ='templates/i130/questionnaire/i130-options.html' ;
        }
        else if ( option == "no"){
            $scope.currentTemplate ='templates/disqualification.html' ;

        }


    };

});



    
                                    
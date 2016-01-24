app.directive('ngQuestionnaire', function(){

// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope','$stateParams','questionsOption', 'formFactory' ,  function($scope, $stateParams, questionsOption, formFactory){
      var app_id = $stateParams['app_id'];

      if (app_id == 1){
        $scope.option = 'i130-questionnaire-section1' ;
        $scope.app_type = 'i130';
        console.log("App id 1");
      } else if (app_id == 9 ){
        $scope.option = 'i765-questionnaire-section1' ;
        $scope.app_type = 'i765';
        console.log("App id 9");
      } else if (app_id == 10 ){
        $scope.option = 'i485-questionnaire-section1' ;
        $scope.app_type = 'i485';
        console.log("App id 10");
      } // End of app_id if conditional statment block

      $scope.contentUrl = '/templates/questionnaires/' + $scope.app_type  + '/' + $scope.option  + '.html';
      $scope.qualifications = {} ;
      //$scope.individualQualifications = [];
      $scope.category = "" ;
      $scope.formOptions = {} ; 
      console.log("Inside of questionnaire controller case id: " + $scope.current_case_id ) ;
      // Method to generate form
      $scope.chooseForm = function(category, active_app_id){
        if(category == "i765") {
          $scope.formOptions['i765-option'] = true;
        } else if (category == "i485") {
          $scope.formOptions['i485-option'] = true;
        } // End of i765 block
        formFactory.generate(category, $scope.formOptions, $scope.current_case_id, active_app_id);
      }

      $scope.categoryFnc =  function(template) {
        // Return conten url based on corresponding option being chosen.
        $scope.contentUrl = questionsOption.categoryFnc(template, $scope.app_type); 
      };

      $scope.qualificaitonIndividualFnc = function(option, app_type, active_app_id){

        if(option == "no"){
           $scope.contentUrl = '/templates/questionnaires/' + app_type + '/' + app_type + '-' +'disqualification.html' ; 
        } else {
           $scope.chooseForm(app_type, active_app_id);
        } //  End of if option conditional block
      } // End of  $scope.qualificaitonIndividualFnc  function

      $scope.qualificationFnc = function(results, category, active_app_id){
        // This function determine if the user is qualified for the chosen case.
        $scope.category = category;
        $scope.active_app_id = active_app_id ; // assign application id to corresponding application type specifically for I-130 application
        $scope.contentUrl = questionsOption.qualificationFnc(results, category ,$scope.app_type); 
      };

      $scope.quotaFnc = function(quota_status, category, active_app_id){
        if (quota_status == "yes"){
          $scope.contentUrl = questionsOption.quotaFnc(quota_status, category ,$scope.app_type);
        } else {
          $scope.chooseForm($scope.app_type, active_app_id);
        }
      };

      $scope.ageFnc = function(qualification){
        $scope.results = questionsOption.ageFnc(qualification , $scope.app_type);
        $scope.i765_hide = $scope.results['i765_hide'] ;
        $scope.contentUrl = $scope.results['contentUrl'];
      };
    }],
    link: function($scope) {  
    }, 
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
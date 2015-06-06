app.directive('ngQuestionnaire', function(){

// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope','questionsOption', 'formFactory' ,  function($scope, questionsOption, formFactory){
      $scope.option = 'i130-questionnaire-section1' ;
      $scope.app_type = 'i130';
      $scope.contentUrl = '/templates/questionnaires/' + $scope.app_type  + '/' + $scope.option  + '.html';
      $scope.qualifications = {} ;
      $scope.category = "" ;
      $scope.formOptions = {} ; 

      // Method to generate form
      $scope.chooseForm = function(category, active_app_id){
        formFactory.generate(category, $scope.formOptions, $scope.case_id, active_app_id);
      }

      $scope.categoryFnc =  function(template) {
        // Return conten url based on corresponding option being chosen.
        $scope.contentUrl = questionsOption.categoryFnc(template, $scope.app_type); 
      };

      $scope.qualificationFnc = function(results, category, active_app_id){
        // This function determine if the user is qualified for the chosen case.
        $scope.category = category;
        $scope.active_app_id = active_app_id ; // assign application id to corresponding application type specifically for I-130 application
        $scope.contentUrl = questionsOption.qualificationFnc(results, category ,$scope.app_type); 
      };

      $scope.quotaFnc = function(quota_status, category){
        $scope.contentUrl = questionsOption.quotaFnc(quota_status, category ,$scope.app_type);
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
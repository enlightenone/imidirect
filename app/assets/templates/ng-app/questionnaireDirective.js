app.directive('ngQuestionnaire', function(){

// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope', function($scope){
      $scope.option = 'i130-questionnaire-section1' ;
      $scope.app_type = 'i130';
      $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.option  + '.html';

      $scope.qualifications = {} ;
      $scope.category = "" ;

    }],
    link: function($scope) {

      $scope.categoryFnc = function(template) {
        $scope.option = template ; 
        $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.app_type + '-' + $scope.option  + '.html'
      };

      $scope.qualificationFnc = function(results, category){
          var disqualification_flag = false ; 
          $scope.category = category;

        for(var key in results){
           if (results[key] === 'yes'){
            disqualification_flag = true ;
           }
        };
 
          if ( disqualification_flag === true ){
              $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.app_type + '-' +'disqualification.html' ; 
          } else {
              if (category === 'citizen-spouse' ) {
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
              } else if ( (category == 'citizen-child-under-21') || (category == 'pr-child-under-21'))   {
                 $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'child-age.html' ;
              } else if ((category == 'citizen-married-child-any-age') || (category == 'citizen-child-over-21') 
                 || (category == 'citizen-sibling') || (category == 'citizen-sibling') || (category == 'citizen-parent')
                 || (category == 'pr-spouse') || (category == 'pr-child-over-21') ) {
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'quota.html' ;
              }
          }
        }
     
      $scope.quotaFnc = function(quota_status, category) {
        // Logic to Determine next section of which each option renders based upon different category
        if (quota_status == 'yes'){
          if ((category === "citizen-child-under-21") || (category === "citizen-married-child-any-age" ) 
            || (category === "pr-child-under-21") || (category == 'citizen-sibling')) {
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'child-age.html' ;
          } else {
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
          }
        } else {
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'dummy-form.html' ;
        }
       
      };

      $scope.ageFnc = function(qualification) {
        if (qualification == 'no') {
          $scope.i765_hide = true ;
          console.log("Age Flag in ageFnc Function: " +  $scope.i765_hide  );
        }
        $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
      };


    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
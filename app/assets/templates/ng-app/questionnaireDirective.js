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

      $scope.optionFnc = function(template) {
        $scope.option = template ; 
        $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.option  + '.html'
      };

      $scope.qualificationFnc = function(results, category){
        for(var key in results){
          if (results[key] == 'yes'){
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.app_type + '-' +'disqualification.html' ; 
          } else if (results[key] == 'no'){
              if (category == 'us-spouse' ) {
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
              } else if (category == 'citizen-married-child-any-age') {
                $scope.category = category;
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'quota.html' ;
              }
          }
        }
      };

      $scope.quotaFnc = function(quota_status, category) {
        if ((category === "citizen-unmarried-child-under-21") || (category === "citizen-married-child-any-age" ) || (category === "pr-unmarried-child-under-21")) {
          $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'child-age.html' ;
        } else {
          $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
        }
       
      };

      $scope.ageFnc = function(qualification) {

        $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
      };

    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
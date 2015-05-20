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
          var disqualification_flag = false ; 
          console.log("Category: " + category);
        for(var key in results){
           if (results[key] === 'yes'){
            disqualification_flag = true ;
           }
        };
 
          if ( disqualification_flag === true ){
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/' + $scope.app_type + '-' +'disqualification.html' ; 
          } else {
              if (category === 'us-spouse' ) {
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
              } else if (category === 'citizen-married-child-any-age') {
                $scope.category = category;
                $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'quota.html' ;
              }
          }
        }
     

      $scope.quotaFnc = function(quota_status, category) {

        if (quota_status == 'yes'){
          if ((category === "citizen-unmarried-child-under-21") || (category === "citizen-married-child-any-age" ) || (category === "pr-unmarried-child-under-21")) {
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'child-age.html' ;
          } else {
            $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
          }
        }
       
      };

      $scope.ageFnc = function(qualification) {
        console.log("Category inside of ageFnc:" + $scope.category);

        $scope.contentUrl = 'templates/questionnaires/' + $scope.app_type  + '/'   +  $scope.app_type + '-' + 'options.html' ;
      };

    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
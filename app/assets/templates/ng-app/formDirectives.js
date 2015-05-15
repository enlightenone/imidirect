app.directive('ngCaseForm', function(){
  // var test = "i130-applicant"; 
  return {
    restrict: "E",
    scope: {
      formTemplate: '='
    },
    link: function($scope) {
      $scope.$watch('formTemplate', function(formTemplate){
         $scope.contentUrl = 'cases/i130/' + formTemplate + '.html'
      });
    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
.directive('ngCaseFormButton', function(){
  return {
    restrict: "E",
    // templateUrl: 'cases/i130/template-button.html'
    templateUrl: function(elem, attrs) {
      return  'cases/i130/' + attrs.case + '.html'
    }    
  }
});
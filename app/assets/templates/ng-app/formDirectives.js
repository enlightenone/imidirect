app.directive('ngCaseForm', function(){
// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    scope: {
      formTemplate: '='
    },
    link: function($scope) {
      $scope.$watch('formTemplate', function(formTemplate){
         $scope.contentUrl = 'templates/forms/fields/i130/' + formTemplate + '-fields.html'
      });
    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})

// custom directive to dynamically assign form button
.directive('ngCaseFormButton', function(){
  return {
    restrict: "E",
    scope: {
      formTemplateButton: '='
    },
    link: function($scope) {
      $scope.$watch('formTemplateButton', function(formTemplateButton){

         console.log("Form Template Button: " + formTemplateButton);
         $scope.content_button_url = 'templates/forms/buttons/i130/' + formTemplateButton + '-button.html'
      });
    },
    template: '<ng-include src="content_button_url"></ng-include>'   
  } // end of return
});
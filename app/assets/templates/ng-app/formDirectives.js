app.directive('ngCaseForm', function(){
  var fields_template, app_type; 

// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    transclude: true,
    scope: {
      applicationType: '=',
      formTemplate: '='
    },
    controller: ['$scope', function($scope){
      $scope.formData = {};

      this.getData = function() { 
        return $scope.formData;
      };
    }],
    link: function($scope) {
      $scope.$watch('formTemplate', function(formTemplate){
        fields_template = formTemplate ;
      });
      $scope.$watch('applicationType', function(applicationType){ 
        app_type = applicationType ; 
        $scope.contentUrl = 'templates/forms/fields/' + app_type + '/' + fields_template + '-fields.html'
      });      
    },
    template: '<ng-include src="contentUrl"></ng-include><ng-transclude></ng-transclude>'   
  } // end of return
})

// custom directive to dynamically assign form button
.directive('ngCaseFormButton', function(){
  var fields_template, app_type; 

  return {
    restrict: "E",
    require: '^ngCaseForm',
    scope: {
      applicationTypeButton: '=', 
      formTemplateButton: '=',
      ngCatchData: '&'
    },
    controller: ['$scope', 'fieldsData',  function($scope, fieldsData){
      $scope.formData = {};
      // invoke fields data cache factory to form data into cache
      $scope.CatchData = function (name, form_data) {
        fieldsData.catchData(name, form_data); 
      };
    }],
    link: function($scope, elem, attrs, ngCaseFormCtrl) {
      $scope.formData = ngCaseFormCtrl.getData(); 
      console.log("Test data from Parent Controller: " + $scope.formData);
      $scope.$watch('formTemplateButton', function(formTemplateButton){
         fields_template = formTemplateButton;
      });
      $scope.$watch('applicationTypeButton', function(applicationTypeButton){
         app_type = applicationTypeButton
         $scope.content_button_url = 'templates/forms/buttons/' + app_type + '/' + fields_template + '-button.html'
         // $scope.content_button_url = 'templates/forms/buttons/' + 'i130' + '/' + 'i130-applicant' + '-button.html'
      });
    },
    template: '<ng-include src="content_button_url"></ng-include>'   
  } // end of return
});
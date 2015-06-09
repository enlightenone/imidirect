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
    controller: ['$scope','$stateParams',  'progressStatus', function($scope, $stateParams, progressStatus){
      $scope.formData = {}; // field data from the form

      // this factory function is to update form progress status for active case
      progressStatus.update("filling", $scope.current_case_id );

      this.getData = function() { // get function to pass fields data to child directive.
        return $scope.formData;   
      };
    }],
    link: function($scope) {
      $scope.$watch('formTemplate', function(formTemplate){ // determine form template being set in main controller
        fields_template = formTemplate ;
      });
      $scope.$watch('applicationType', function(applicationType){ // determine the application type from the option being set in main controller
        app_type = applicationType ; 
        $scope.contentUrl = '/templates/forms/fields/' + app_type + '/' + fields_template + '-fields.html' //content url as scope to be rendered on the directive template
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
      formTemplateButton: '='
    },
    controller: ['$scope', '$stateParams' ,'fieldsData', 'processForm', function($scope, $stateParams, fieldsData, processForm){
      $scope.formData = {}; //initiate the form field object
      $scope.switchOptions = $stateParams; //catch options to generate corresponding template forms
 
      // invoke fields data cache factory to form data into cache
      $scope.CatchData = function (name, form_data) { // to assign form fields data to cache.
        fieldsData.catchData(name, form_data); 
      };

      $scope.processForm = function() { 
          processForm.storeData($scope.current_case_id);
      };
    }],
    link: function($scope, elem, attrs, ngCaseFormCtrl) {
      $scope.formData = ngCaseFormCtrl.getData(); 
      $scope.$watch('formTemplateButton', function(formTemplateButton){// determine form button template being set in main controller
         fields_template = formTemplateButton;
      });
      $scope.$watch('applicationTypeButton', function(applicationTypeButton){ // determine the application type from the option being set in main controller
         app_type = applicationTypeButton
         $scope.content_button_url = '/templates/forms/buttons/' + app_type + '/' + fields_template + '-button.html'  //content url as scope to be rendered on the directive template
      });
    },
    template: '<ng-include src="content_button_url"></ng-include>'   
  } // end of return
});
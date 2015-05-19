app.directive('ngQuestionnaire', function(){
var app_type
// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope', function($scope){

      $scope.option = 'i130-questionnaire-section1' ;

    }],
    link: function($scope) {
        app_type = 'i130'
        $scope.contentUrl = 'templates/questionnaires/' + $scope.option  + '/' + fields_template + '-fields.html' //content url as scope to be rendered on the directive template
     
    },
    template: '<ng-include src="contentUrl"></ng-include>'   
  } // end of return
})
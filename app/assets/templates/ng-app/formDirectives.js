app.directive('ngCaseForm', function(){
  return {
    restrict: "E",
    transclude: true, 
    templateUrl: 'cases/i130/template.html'
  }
})
.directive('ngCaseFormButton', function(){
  return {
    restrict: "E",
    templateUrl: 'cases/i130/template-button.html'
  }
});
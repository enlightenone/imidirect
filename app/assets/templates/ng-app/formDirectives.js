app.directive('ngCaseForm', function(){
  return {
    restrict: "E",
    // templateUrl: 'cases/i130/template.html'
    templateUrl: function(elem, attrs){
      return 'cases/i130/' + attrs.case + '.html'
    }
  }
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
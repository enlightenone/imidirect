app.directive('ngProgressBar', function(){
// custom directive to dynamically assign form fields 
  return {
    restrict: "E",
    controller: ['$scope', function($scope){
  
    }],
    link: function($scope) {
    },
    templateUrl: 'states/progress/progress-bar-template.html'   
  } // end of return
})

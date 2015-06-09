app.controller("questionnaireController", function($scope, $stateParams, $location, myCache) {     
  console.log("Outside of questionnaireController");
  $scope.current_case_id = $stateParams['case_id']; // Current active case id assign from params of url
   console.log("Questionnaire Url Path: " + $location); 
  //remove cookie's content before form
  $scope.restCookie = function(){
      var cache = myCache.get('myData');
      if (cache){
          cache.removeAll();
      }
  };
}); // end of questionnaireController Controller
    
                                    
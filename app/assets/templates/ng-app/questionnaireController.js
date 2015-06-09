app.controller("questionnaireController", function($scope, $stateParams, myCache) {     
  console.log("Outside of questionnaireController");
  $scope.current_case_id = $stateParams['case_id']; // Current active case id assign from params of url
  //remove cookie's content before form
  $scope.restCookie = function(){
      var cache = myCache.get('myData');
      if (cache){
          cache.removeAll();
      }
  };
}); // end of questionnaireController Controller
    
                                    
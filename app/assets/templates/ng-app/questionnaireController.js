app.controller("questionnaireController", function($scope, $stateParams, myCache, progressStatus, currentUrl) {     
  console.log("Outside of questionnaireController");
  $scope.current_case_id = $stateParams['case_id']; // Current active case id assign from params of url

  progressStatus.update("questionnaire", $scope.current_case_id, currentUrl.path());
  //remove cookie's content before form
  $scope.restCookie = function(){
      var cache = myCache.get('myData');
      if (cache){
          cache.removeAll();
      }
  };
}); // end of questionnaireController Controller
    
                                    
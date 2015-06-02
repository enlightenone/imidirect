app.controller("questionnaireController", function($scope, $stateParams, $cookies, $location, 
                                          $cookieStore, myCache, generateCase) {

   $scope.user_id = $stateParams['user_id'] ;
   $scope.application_id = $stateParams['id'] ; 
   $scope.url = $location.absUrl();

   console.log("User id param:" + $scope.user_id);
   console.log("Case id param:" + $scope.application_id);
   console.log("Url: " + $scope.url);
  console.log("Outside of questionnaireController");
  //remove cookie's content before form
  $scope.restCookie = function(){
      var cache = myCache.get('myData');
      if (cache){
          cache.removeAll();
      }
  };

  // Initializing Case at the beginning of the case.
  $scope.initCase = function (user_id, app_id) {
     generateCase.initiate(user_id, app_id); // generateCase factory method
     $scope.case_id = generateCase.case_id(); 
  };
}); // end of questionnaireController Controller
    
                                    
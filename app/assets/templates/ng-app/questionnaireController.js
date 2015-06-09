app.controller("questionnaireController", function($scope, $stateParams, myCache) {     
  console.log("Outside of questionnaireController");
  //remove cookie's content before form
  $scope.restCookie = function(){
      var cache = myCache.get('myData');
      if (cache){
          cache.removeAll();
      }
  };
}); // end of questionnaireController Controller
    
                                    
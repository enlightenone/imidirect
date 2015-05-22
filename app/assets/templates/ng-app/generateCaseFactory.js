// This factory is to generate id per case and populate the case database.
app.factory('generateCase', ['CaseInit', function(CaseInit) {
  var case_id ;
  var service = {};

  // case id key generator
  function makeid()
     {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
 

 service.initiate = function(user_id, app_id) {
     console.log("Inside of initCase Function");
     //generate case id with random character
    case_id = makeid();

    // Method to return generated id to controller to be availabled for rest of views within the scope.
    service.case_id = function(){
      return case_id;
    };

    //Save the case info to database.
    var InitializeCase = new CaseInit();
        InitializeCase.case = {
            case_id: case_id,
            application_id: app_id,
            user_id: user_id
        }; 
    InitializeCase.$save(); 
 };

return service ;

}]);
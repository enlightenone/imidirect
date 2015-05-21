// This factory is to generate id per case and populate the case database.
app.factory('generateCase', [ 'CaseInit', function(CaseInit) {
  var case_id ;
  var service = {};

 service.initiate = function(user_id, app_id) {
     console.log("Inside of initCase Function");
     //generate case id with random character
  function makeid()
     {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    
    case_id = makeid();
    console.log("initiating case id: " + case_id);
    //populate cases table
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
app.factory('questionsOption', function() {
 var option ;  
 var service = {}; // Object with methods and variables available for access

  // Determine the template for category option
  service.categoryFnc = function(template,app_type) {
        option = template ; 
        return 'templates/questionnaires/' + app_type  + '/' + app_type + '-' + option  + '.html' ;
  };

  // Determin if the user is qualified for the case
  service.qualificationFnc = function(results, category, app_type){
    console.log("Inside of qualificationFnc in Factory");
    var disqualification_flag = false ; 
    for(var key in results){
      if (results[key] === 'yes'){
       disqualification_flag = true ;
      }
    }
       
    if ( disqualification_flag === true ){
      return 'templates/questionnaires/' + app_type  + '/' + app_type + '-' +'disqualification.html' ; 
    } else {
      if (category === 'citizen-spouse' ) {
        return 'templates/questionnaires/' + app_type  + '/'   +  app_type + '-' + 'options.html' ;
      } else if ( (category == 'citizen-child-under-21') || (category == 'pr-child-under-21'))   {
        return 'templates/questionnaires/' + app_type  + '/'   +  app_type + '-' + 'child-age.html' ;
      } else if ((category == 'citizen-married-child-any-age') || (category == 'citizen-child-over-21') 
           || (category == 'citizen-sibling') || (category == 'citizen-sibling') || (category == 'citizen-parent')
           || (category == 'pr-spouse') || (category == 'pr-child-over-21') ) {
        return 'templates/questionnaires/' + app_type  + '/'   +  app_type + '-' + 'quota.html' ;
      }
    }
  };   


  service.quotaFnc = function(quota_status, category, app_type) {
    // Logic to Determine next section of which each option renders based upon different category
    if (quota_status == 'yes'){
      if ((category === "citizen-child-under-21") || (category === "citizen-married-child-any-age" ) 
        || (category === "pr-child-under-21") || (category == 'citizen-sibling')) {
        return 'templates/questionnaires/' + app_type  + '/' + app_type + '-' + 'child-age.html' ;
      } else {
        return 'templates/questionnaires/' + app_type  + '/' + app_type + '-' + 'options.html' ;
      }
    } else {
        return 'templates/questionnaires/' + app_type  + '/' + app_type + '-' + 'dummy-form.html' ;
    }
   
  };

  service.ageFnc = function(qualification, app_type) {
    var results = {} ;
    if (qualification == 'no') {
      results['i765_hide'] = true ;
    }
    results['contentUrl'] = 'templates/questionnaires/' + app_type  + '/'   +  app_type + '-' + 'options.html' ;
    return results ;
  };

return service ;
});
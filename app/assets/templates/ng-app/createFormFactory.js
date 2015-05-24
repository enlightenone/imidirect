// This factory is to generate form based on options chosen on questionnaire section.
app.factory('formFactory', ['myCache', 'OptionResource', 'updateCaseResource', 'i130AppId',   
                            function(myCache, OptionResource, updateCaseResource, i130AppId)  {
  var service = {}; // Object with methods and variables available for access
  var app_id; 
 //function to choose forms
  service.generate = function(category, formOptions, case_id, active_app_id) {

    /********** Method to update application id *******************/
    i130AppId.compare(category, case_id, active_app_id); 

    /********** end of Method to application id update method *****/
 
    // Beginning Of the Option Block ///////////////////
    
    var settings = OptionResource(formOptions, case_id );
    var results = settings.initiate({id:case_id}); 
    results.$promise.then(function(data) {
    console.log(data);
    });

    // End of Option lock//////////////////////

    var switchButtons = {}; //Create object to arrange form/section combination.

    var i = 3; 

    // Choose required fields based of type of application.
    if (category == "i130"){
        switchButtons["application_type"] = "i130";
        switchButtons["section1"] = "i130-applicant";
        switchButtons["section2"] = "i130-sponsor";
        switchButtons["section3"] = "i130-option";
    } else if (category == "i765"){
        switchButtons["application_type"] = "i765";
        switchButtons["section1"] = "i765-applicant";
        switchButtons["section2"] = "i765-sponsor";
        switchButtons["section3"] = "i765-option";
    } else if (category == "i485"){
        switchButtons["application_type"] = "i485";
        switchButtons["section1"] = "i485-applicant";
        switchButtons["section2"] = "i485-sponsor";
        switchButtons["section3"] = "i485-option";
    } else if (category == "i131"){
        switchButtons["application_type"] = "i131";
        switchButtons["section1"] = "i131-applicant";
        switchButtons["section2"] = "i131-sponsor";
        switchButtons["section3"] = "i131-option";
    }

    // Loop through formOptions to assign form to specific switch button.
    for (key in formOptions){
        if(formOptions[key] == true){
            i++;
            switchButtons["section" + i] = key; 
        }
    }
    // Assign submit button to the last section.
    i++;
    switchButtons["section" + i] = "submit";

    location.assign('#form/section1?case_id=' + case_id + '&form_flag=true' + '&application_type='+ switchButtons["application_type"] + '&section1=' + switchButtons["section1"] + '&section2=' + switchButtons["section2"]
                + '&section3=' + switchButtons["section3"] + '&section4=' + switchButtons["section4"] + '&section5=' + switchButtons["section5"] 
                + '&section6=' + switchButtons["section6"] + '&section7=' + switchButtons["section7"] + '&section8=' + switchButtons["section8"] 
                + '&section9=' + switchButtons["section9"]
                );
  }; // end of service.generate method



 return service ;
}]);
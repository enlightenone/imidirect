// This factory is to generate form based on options chosen on questionnaire section.
app.factory('formFactory', ['myCache', 'OptionResource',  
                            function(myCache, OptionResource)  {
  var service = {}; // Object with methods and variables available for access
  var app_id; 
 //function to choose forms
    service.generate = function(category, formOptions, case_id) {
      console.log("formFactory: category: " + category);
      console.log("formFactory: formOptions: " + formOptions );
      console.log("formFactory: formOptions: " + formOptions['i485-option'] );
      console.log("formFactory: formOptions: " + formOptions['i765-option'] );
      console.log("formFactory: case id: " + case_id)

    //convert application code to app_id in order to assign specific application to the case
    switch (category) {
    case "f1us":
        app_id = 1;
        break;
    case "f2us":
        app_id = 2;
        break;
    case "f3us":
        app_id = 3;
        break;
    case "f4us":
        app_id = 4;
        break;
    case "f5us":
        app_id = 5;
        break;
    case "f1pr":
        app_id = 6;
        break;
    case "f2pr":
        app_id = 7;
        break;
    case "f3pr":
        app_id = 8;
        break;
    case "ead":
        app_id = 9;
        break;
    case "aos":
        app_id = 10;
        break;
    case "nat":
        app_id = 11;
        break;
    }
 
    // Beginning Of the Option Block ///////////////////
    
    var settings = OptionResource(formOptions, case_id );
    var results = settings.initiate({id:1}); 
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
            console.log("formFactory: switchButtons: " + switchButtons["section" + i] ); 
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
    }; // end of ChooseForm method



 return service ;
}]);
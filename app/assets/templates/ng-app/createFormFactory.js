// This factory is to generate form based on options chosen on questionnaire section.
app.factory('createFormFactory', ['myCache', function(myCache) {
  var service = {}; // Object with methods and variables available for access
  var app_id
 //function to choose forms
    service.chooseForm = function(category, formOptions) {

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
    
    var settings = OptionResource($scope.formOptions, $scope.case_id );
    $scope.results = settings.initiate({id:1}); 
    $scope.results.$promise.then(function(data) {
    console.log(data);
    });

    // End of Option lock//////////////////////

    $scope.switchButtons = {}; //Create object to arrange form/section combination.
    var i = 3; 

    // Choose required fields based of type of application.
    if (category == "i130"){
        $scope.switchButtons["application_type"] = "i130";
        $scope.switchButtons["section1"] = "i130-applicant";
        $scope.switchButtons["section2"] = "i130-sponsor";
        $scope.switchButtons["section3"] = "i130-option";
    } else if (category == "i765"){
        $scope.switchButtons["application_type"] = "i765";
        $scope.switchButtons["section1"] = "i765-applicant";
        $scope.switchButtons["section2"] = "i765-sponsor";
        $scope.switchButtons["section3"] = "i765-option";
    } else if (category == "i485"){
        $scope.switchButtons["application_type"] = "i485";
        $scope.switchButtons["section1"] = "i485-applicant";
        $scope.switchButtons["section2"] = "i485-sponsor";
        $scope.switchButtons["section3"] = "i485-option";
    } else if (category == "i131"){
        $scope.switchButtons["application_type"] = "i131";
        $scope.switchButtons["section1"] = "i131-applicant";
        $scope.switchButtons["section2"] = "i131-sponsor";
        $scope.switchButtons["section3"] = "i131-option";
    }


    // Loop through formOptions to assign form to specific switch button.
    for (key in $scope.formOptions){
        if($scope.formOptions[key] == true){
            i++;
            $scope.switchButtons["section" + i] = key;  
        }
    }
    // Assign submit button to the last section.
    i++;
    $scope.switchButtons["section" + i] = "submit";

    location.assign('#form/section1?case_id=' + $scope.case_id + '&form_flag=true' + '&application_type='+ $scope.switchButtons["application_type"] + '&section1=' + $scope.switchButtons["section1"] + '&section2=' + $scope.switchButtons["section2"]
                + '&section3=' + $scope.switchButtons["section3"] + '&section4=' + $scope.switchButtons["section4"] + '&section5=' + $scope.switchButtons["section5"] 
                + '&section6=' + $scope.switchButtons["section6"] + '&section7=' + $scope.switchButtons["section7"] + '&section8=' + $scope.switchButtons["section8"] 
                + '&section9=' + $scope.switchButtons["section9"]
                );
    };



 return service ;
}]);
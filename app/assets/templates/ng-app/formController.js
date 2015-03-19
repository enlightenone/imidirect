app.controller("formController", function($scope ,  $stateParams, $cookies, $cookieStore, Case) {



    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    $scope.switchOptions = $stateParams ; // To retain form options after the form has been submitted.

    //remove cookie's content before form
    $scope.restCookie = function(){
        angular.forEach($cookies, function (v, k) {
            $cookieStore.remove(k);
        });
    };

    //catch form fields data and assign to cookie
    $scope.catchData = function(name, form_data){
         $cookieStore.put(name, form_data);;
         var test = $cookieStore.get(name);
         console.log(test);
    };


    //function to choose forms
    $scope.chooseForm = function(category) {
    // $scope.formData = {};

    $scope.switchButtons = {}; //Create object to arrange form/section combination.
    var i = 3; 

    $scope.switchButtons["application_type"] = "i130";
    $scope.switchButtons["section1"] = "i130-applicant";
    $scope.switchButtons["section2"] = "i130-sponsor";
    $scope.switchButtons["section3"] = "i130-option";
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

    location.assign('#form/section1?application_type='+ $scope.switchButtons["application_type"] + '&section1=' + $scope.switchButtons["section1"] + '&section2=' + $scope.switchButtons["section2"]
                + '&section3=' + $scope.switchButtons["section3"] + '&section4=' + $scope.switchButtons["section4"] + '&section5=' + $scope.switchButtons["section5"] 
                + '&section6=' + $scope.switchButtons["section6"] + '&section7=' + $scope.switchButtons["section7"] + '&section8=' + $scope.switchButtons["section8"] 
                + '&section9=' + $scope.switchButtons["section9"]
                );
    };
    
    // function to process the form
    $scope.processForm = function() {
        var count = 1 ;
        var individualFieldData = $cookieStore.get('form' + '1') ;
        $scope.fieldData = {};


        while (individualFieldData) {
            for (var key in individualFieldData ) {
                $scope.fieldData[key] = individualFieldData[key] ;
             }
            count++ ;
            individualFieldData = $cookieStore.get('form' + count) ;
        }
        console.log($scope.fieldData);

    };


        new Case(
      {
         first_name: $scope.fieldData.first_name,
         last_name: $scope.fieldData.last_name,  
         pod: $scope.fieldData.pod,  
         dob: $scope.fieldData.dob,  
         sponsor_name: $scope.fieldData.sponsor_name,  
         nationality: $scope.fieldData.nationality,  
         country_of_destination: $scope.fieldData.country_of_destination,  
         date_of_return: $scope.fieldData.date_of_return,  
         counsol: $scope.fieldData.counsol,  
         spouse: $scope.fieldData.spouse,  
         previous_application: $scope.fieldData.previous_application,   
         office: $scope.fieldData.office
      }
    ).$save(function(data){
      console.log(data);
    });

    
});
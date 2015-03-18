app.controller("formController", function($scope ,  $stateParams, $cookies, $cookieStore) {



    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    $scope.switchOptions = $stateParams ; // To retain form options after the fomr has been submitted.


    //catch form fields data and assign to cookie
    $scope.catchData = function(name, form_data){
        // $cookieStore.put('myFavorite', 'oatmeal');
        $cookieStore.put(name, form_data);
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
        alert('awesome!');

       $scope.test = $cookieStore.getAll();
       console.log($scope.test);
    };
    
});
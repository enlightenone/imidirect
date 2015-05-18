app.controller("formController", function($scope, $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, fieldsData, formsResource, OptionResource, $resource) {
   
    console.log("Outside of formController");

   $scope.current_case_id = $stateParams['case_id']; // 
    //Object containing I-130 relative application options 
    $scope.formOptions = {} ; 
    // To retain form options after the form has been submitted to determine button options.
    $scope.switchOptions = $stateParams ; 
    //Form Category
    $scope.formCategory = {}; 

    //remove cookie's content before form
    $scope.restCookie = function(){
        var cache = myCache.get('myData');
        if (cache){
            cache.removeAll();
        }
    };

    //remove cookie's content before form
    // $scope.restCookie = function(){
    //     angular.forEach($cookies, function (v, k) {
    //         $cookieStore.remove(k);
    //     });
    // };

    //************** Case form selections **********//

    $scope.formTmpSelection = function(selections) {
        $scope.application_type = selections['application_type'];
        $scope.form_templates = {};
        var key;
        for (i=1; i < 10 ; i++) {
            key = 'section' + i ;
            $scope.form_templates[key] = selections[key] ;
        }
    };

    // console.log("Case selection value passed from params: " + $scope.switchOptions  );

    $scope.formTmpSelection($scope.switchOptions );

     //********* End of Case form selections *******//



    // Initializing Case at the beginning of the case.
    $scope.initCase = function() {

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
        $scope.case_id = makeid();
        console.log("initiating case id: " +$scope.case_id);
        //populate cases table
        var InitializeCase = new CaseInit();
            InitializeCase.case = {
                case_id: $scope.case_id,
                application_id: 1,
                user_id: 1
            }; 
        InitializeCase.$save(); 
    };
     

    //function to choose forms
    $scope.chooseForm = function(category) {
   $scope.$parent.forms_status_flag = false;


    //convert application code to app_id in order to assign specific application to the case
    switch (category) {
    case "f1us":
        $scope.app_id = 1;
        break;
    case "f2us":
        $scope.app_id = 2;
        break;
    case "f3us":
        $scope.app_id = 3;
        break;
    case "f4us":
        $scope.app_id = 4;
        break;
    case "f5us":
        $scope.app_id = 5;
        break;
    case "f1pr":
        $scope.app_id = 6;
        break;
    case "f2pr":
        $scope.app_id = 7;
        break;
    case "f3pr":
        $scope.app_id = 8;
        break;
    case "ead":
        $scope.app_id = 9;
        break;
    case "aos":
        $scope.app_id = 10;
        break;
    case "nat":
        $scope.app_id = 11;
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

    $scope.statusTestFnc = function() {
         // alert("hello");
         $scope.$parent.transaction_status_flag  = false;
         console.log("statusTestFnc is activated!");
    };
    

    /*****************Total Fees Calculation Functions**********************/

      $scope.fees_calculation_flag = $stateParams['fees_calculation_flag'];

      // call fees calculation function when the calculation fee flag is activated.

     if ($scope.fees_calculation_flag == "true"){ 

        $cookieStore.put("current_case_id", $scope.current_case_id);
     var Fee =  $resource('/api/cases/1/charges/:id', {id:'@id'}) ;

        Fee.get({id: $scope.current_case_id }, function(data){
            $scope.total_fee = data['total_fee'];
            $scope.sub_total_fees = data['sub_total_fees'];

            $scope.converted_total_fee = $scope.total_fee + "00";

            //reset the fees calculation flag to null
            $scope.fees_calculation_flag = null ;
        });
    }
    /*****************End of Total Fees Calculation Functions***************/


}); // end of formController Controller
    
                                    
app.controller("formController", function($scope, $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, formsResource, OptionResource, $resource) {
   
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
    $scope.restCookie = function(){
        angular.forEach($cookies, function (v, k) {
            $cookieStore.remove(k);
        });
    };

    //************** Case form selections **********//

    $scope.formTmpSelection = function(form_selection) {
        switch (form_selection) {
            case "i130-applicant":
                $scope.form_template = 'i130-applicant';
                break;
            case "f2us":
                $scope.form_template = 'i130-applicant';
                break;
        }

        console.log("Inside of FormTmpSelection Function");
        console.log("form_template variable: " + $scope.form_template );
    };

    var case_selection = $stateParams['section1'];

    console.log("Case selection value passed from params: " + case_selection );

    $scope.formTmpSelection(case_selection);

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
    //catch form fields data and assign to cookie
    $scope.catchData = function(name, form_data){         
        var cache = myCache.get('myData');
        var fieldsData = {} ;
            fieldsData[name] = form_data;
            console.log("name: " + name);
            console.log("data: " + form_data);
         if (cache){
            $scope.PreviousFieldsCache = cache;
            $scope.PreviousFieldsCache[name] = form_data;
            myCache.put('myData', $scope.PreFieldsCache);
            console.log("form 6: " + cache["form6"]["i765_date_of_previous_application"]);

         } else{
            myCache.put('myData', fieldsData);
         }
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
    
    // function to process the form
    $scope.processForm = function() {
        console.log("Inside of processForm Function");
        $scope.previousSavedCache = myCache.get('myData');
        var count = 1 ;
        var individualFieldData = $scope.previousSavedCache['form1'] ;
        $scope.fieldData = {};

        // // pull data from partial forms from cookie and combine into one object.
        while (individualFieldData) {
            for (var key in individualFieldData) {
                $scope.fieldData[key] = individualFieldData[key] ;
                console.log( key + ": " + $scope.fieldData[key] ); 
             }
            count++ ;
            individualFieldData = $scope.previousSavedCache['form' + count] ;
        }

      // $scope.restCookie();

      var formFieldData = new formsResource({id: $stateParams['case_id']});
      formFieldData.case = { general_information:
                                {          
                                    general_applicant_child_first_name_1: ($scope.fieldData["general_applicant_child_first_name_1"]? $scope.fieldData["general_applicant_child_first_name_1"] : "null"), 
                                    general_applicant_child_last_name_1:  ($scope.fieldData["general_applicant_child_last_name_1"]? $scope.fieldData["general_applicant_child_last_name_1"] : "null"), 
                                    general_applicant_child_middle_name_1: ($scope.fieldData["general_applicant_child_middle_name_1"] ? $scope.fieldData["general_applicant_child_middle_name_1"]  : "null"), 
                                    general_applicant_child_relationship_1:  ($scope.fieldData["general_applicant_child_relationship_1"] ? $scope.fieldData["general_applicant_child_relationship_1"] : "null"), 
                                    general_applicant_child_dob_1:  ($scope.fieldData["general_applicant_child_dob_1"] ? $scope.fieldData["general_applicant_child_dob_1"] : "null"), 
                                    general_applicant_child_cob_1:  ($scope.fieldData["general_applicant_child_cob_1"] ? $scope.fieldData["general_applicant_child_cob_1"] : "null"), 
                                    general_applicant_child_a_number_1:  ($scope.fieldData["general_applicant_child_a_number_1"] ? $scope.fieldData["general_applicant_child_a_number_1"] : "null"), 
                                    general_applicant_child_application_1:  ($scope.fieldData["general_applicant_child_application_1"] ?  $scope.fieldData["general_applicant_child_application_1"] : "null"), 
                                    general_applicant_child_first_name_2:  ($scope.fieldData["general_applicant_child_first_name_2"] ?  $scope.fieldData["general_applicant_child_first_name_2"] : "null"), 
                                    general_applicant_child_last_name_2:  ($scope.fieldData["general_applicant_child_last_name_2"] ? $scope.fieldData["general_applicant_child_last_name_2"] : "null"), 
                                    general_applicant_child_middle_name_2:  ($scope.fieldData["general_applicant_child_middle_name_2"] ? $scope.fieldData["general_applicant_child_middle_name_2"] : "null"), 
                                    general_applicant_child_relationship_2:  ($scope.fieldData["general_applicant_child_relationship_2"] ? $scope.fieldData["general_applicant_child_relationship_2"] : "null"), 
                                    general_applicant_child_cob_2:  ($scope.fieldData["general_applicant_child_cob_2"] ? $scope.fieldData["general_applicant_child_cob_2"]  : "null"),
                                    general_applicant_child_a_number_2:  ($scope.fieldData["general_applicant_child_a_number_2"] ?$scope.fieldData["general_applicant_child_a_number_2"] : "null"), 
                                    general_applicant_child_application_2:  ($scope.fieldData["general_applicant_child_application_2"] ?$scope.fieldData["general_applicant_child_application_2"] : "null"), 
                                    general_applicant_child_first_name_3:  ($scope.fieldData["general_applicant_child_first_name_3"] ? $scope.fieldData["general_applicant_child_first_name_3"] : "null"), 
                                    general_applicant_child_last_name_3:  ($scope.fieldData["general_applicant_child_last_name_3"] ? $scope.fieldData["general_applicant_child_last_name_3"]: "null"), 
                                    general_applicant_child_middle_name_3:  ($scope.fieldData["general_applicant_child_middle_name_3"] ? $scope.fieldData["general_applicant_child_last_name_3"] : "null"), 
                                    general_applicant_child_relationship_3:  ($scope.fieldData["general_applicant_child_relationship_3"] ? $scope.fieldData["general_applicant_child_relationship_3"] : "null"), 
                                    general_applicant_child_dob_3:  ($scope.fieldData["general_applicant_child_dob_3"] ? $scope.fieldData["general_applicant_child_dob_3"] : "null"), 
                                    general_applicant_child_cob_3:  ($scope.fieldData["general_applicant_child_cob_3"] ? $scope.fieldData["general_applicant_child_cob_3"] : "null"), 
                                    general_applicant_child_a_number_3:  ($scope.fieldData["general_applicant_child_a_number_3"] ? $scope.fieldData["general_applicant_child_a_number_3"] : "null"), 
                                    general_applicant_child_application_3:   ($scope.fieldData["general_applicant_child_application_3"] ? $scope.fieldData["general_applicant_child_application_3"]  : "null"),
                                    general_applicant_child_first_name_4:  ($scope.fieldData["general_applicant_child_first_name_4"] ? $scope.fieldData["general_applicant_child_first_name_4"]: "null"), 
                                    general_applicant_child_last_name_4:   ($scope.fieldData["general_applicant_child_last_name_4"] ? $scope.fieldData["general_applicant_child_last_name_4"]: "null"), 
                                    general_applicant_child_middle_name_4:  ($scope.fieldData["general_applicant_child_middle_name_4"] ? $scope.fieldData["general_applicant_child_middle_name_4"]  : "null"), 
                                    general_applicant_child_relationship_4:  ($scope.fieldData["general_applicant_child_relationship_4"] ? $scope.fieldData["general_applicant_child_relationship_4"]  : "null"), 
                                    general_applicant_child_dob_4:   ($scope.fieldData["general_applicant_child_dob_4"] ? $scope.fieldData["general_applicant_child_dob_4"] : "null"), 
                                    general_applicant_child_cob_4:  ($scope.fieldData["general_applicant_child_cob_4"] ? $scope.fieldData["general_applicant_child_cob_4"] : "null"), 
                                    general_applicant_child_a_number_4:  ($scope.fieldData["general_applicant_child_a_number_4"] ? $scope.fieldData["general_applicant_child_a_number_4"] : "null"),
                                    general_applicant_child_application_4:   ($scope.fieldData["general_applicant_child_application_4"] ? $scope.fieldData["general_applicant_child_application_4"] : "null"),
                                    general_applicant_child_first_name_5:  ($scope.fieldData["general_applicant_child_first_name_5"] ? $scope.fieldData["general_applicant_child_first_name_5"]  : "null"), 
                                    general_applicant_child_last_name_5:  ($scope.fieldData["general_applicant_child_last_name_5"] ? $scope.fieldData["general_applicant_child_last_name_5"] : "null"),
                                    general_applicant_child_middle_name_5:  ($scope.fieldData["general_applicant_child_middle_name_5"] ? $scope.fieldData["general_applicant_child_middle_name_5"] : "null"), 
                                    general_applicant_child_relationship_5:  ($scope.fieldData["general_applicant_child_relationship_5"] ? $scope.fieldData["general_applicant_child_relationship_5"] : "null"), 
                                    general_applicant_child_dob_5:  ($scope.fieldData["general_applicant_child_dob_5"] ? $scope.fieldData["general_applicant_child_dob_5"] : "null"), 
                                    general_applicant_child_cob_5:  ($scope.fieldData["general_applicant_child_cob_5"] ? $scope.fieldData["general_applicant_child_cob_5"]: "null"), 
                                    general_applicant_child_a_number_5:  ($scope.fieldData["general_applicant_child_a_number_5"] ? $scope.fieldData["general_applicant_child_a_number_5"] : "null"), 
                                    general_applicant_child_application_5:  ($scope.fieldData["general_applicant_child_application_5"] ? $scope.fieldData["general_applicant_child_application_5"]: "null"), 
                                    general_applicant_first_name:  ($scope.fieldData["general_applicant_first_name"] ? $scope.fieldData["general_applicant_first_name"] : "null"), 
                                    general_applicant_last_name:  ($scope.fieldData["general_applicant_last_name"] ? $scope.fieldData["general_applicant_last_name"] : "null"), 
                                    general_applicant_middle_name:   ($scope.fieldData["general_applicant_middle_name"] ? $scope.fieldData["general_applicant_middle_name"] : "null"), 
                                    general_applicant_other_name:  ($scope.fieldData["general_applicant_other_name"] ? $scope.fieldData["general_applicant_other_name"]  : "null"), 
                                    general_applicant_street:   ($scope.fieldData["general_applicant_street"] ? $scope.fieldData["general_applicant_street"]  : "null"), 
                                    general_applicant_apt_suit:    ($scope.fieldData["general_applicant_apt_suit"] ? $scope.fieldData["general_applicant_apt_suit"]: "null"), 
                                    general_applicant_city:  ($scope.fieldData["general_applicant_city"] ? $scope.fieldData["general_applicant_city"]: "null"), 
                                    general_applicant_state:  ($scope.fieldData["general_applicant_state"] ? $scope.fieldData["general_applicant_state"]: "null"), 
                                    general_applicant_country:  ($scope.fieldData["general_applicant_country"] ? $scope.fieldData["general_applicant_country"]: "null"),
                                    general_applicant_zip_code:  ($scope.fieldData["general_applicant_zip_code"] ? $scope.fieldData["general_applicant_zip_code"] : "null"), 
                                    general_applicant_co:  ($scope.fieldData["general_applicant_co"] ? $scope.fieldData["general_applicant_co"] : "null"), 
                                    general_applicant_phone:  ($scope.fieldData["general_applicant_phone"] ? $scope.fieldData["general_applicant_phone"]  : "null"), 
                                    general_applicant_dob:  ($scope.fieldData["general_applicant_dob"] ? $scope.fieldData["general_applicant_dob"]: "null"), 
                                    general_applicant_pob_town:  ($scope.fieldData["general_applicant_pob_town"] ? $scope.fieldData["general_applicant_pob_town"]: "null"), 
                                    general_applicant_pob_state:  ($scope.fieldData["general_applicant_pob_state"] ? $scope.fieldData["general_applicant_pob_state"]: "null"), 
                                    general_applicant_pob_country:  ($scope.fieldData["general_applicant_pob_country"] ? $scope.fieldData["general_applicant_pob_country"]: "null"), 
                                    general_applicant_nationality:  ($scope.fieldData["general_applicant_nationality"] ? $scope.fieldData["general_applicant_nationality"]: "null"), 
                                    general_applicant_gender_male:   ($scope.fieldData["general_applicant_gender_male"] ? $scope.fieldData["general_applicant_gender_male"]: "null"), 
                                    general_applicant_gender_female:   ($scope.fieldData["general_applicant_gender_female"] ? $scope.fieldData["general_applicant_gender_female"]: "null"), 
                                    general_applicant_marital_status_married:   ($scope.fieldData["general_applicant_marital_status_married"] ? $scope.fieldData["general_applicant_marital_status_married"] : "null"), 
                                    general_applicant_ssn:  ($scope.fieldData["general_applicant_ssn"] ? $scope.fieldData["general_applicant_ssn"]: "null"), 
                                    general_applicant_alien_number:  ($scope.fieldData["general_applicant_alien_number"] ? $scope.fieldData["general_applicant_alien_number"]: "null"),
                                    general_applicant_i_94:  ($scope.fieldData["general_applicant_i_94"] ? $scope.fieldData["general_applicant_i_94"]: "null"), 
                                    general_applicant_date_of_last_arrival:  ($scope.fieldData["general_applicant_date_of_last_arrival"] ? $scope.fieldData["general_applicant_date_of_last_arrival"]: "null"), 
                                    general_applicant_uscis_status:  ($scope.fieldData["general_applicant_uscis_status"] ? $scope.fieldData["general_applicant_uscis_status"]: "null"),
                                    general_applicant_status_expiration_date:  ($scope.fieldData["general_applicant_status_expiration_date"] ? $scope.fieldData["general_applicant_status_expiration_date"] : "null"), 
                                    general_applicant_visa_number:  ($scope.fieldData["general_applicant_visa_number"] ? $scope.fieldData["general_applicant_visa_number"]  : "null"), 
                                    general_applicant_last_entry:  ($scope.fieldData["general_applicant_last_entry"] ? $scope.fieldData["general_applicant_last_entry"] : "null"), 
                                    general_applicant_place_of_last_entry:   ($scope.fieldData["general_applicant_place_of_last_entry"] ? $scope.fieldData["general_applicant_place_of_last_entry"]: "null"),
                                    general_applicant_consulate:  ($scope.fieldData["general_applicant_consulate"] ? $scope.fieldData["general_applicant_consulate"]: "null"), 
                                    general_applicant_entry_inspection:  ($scope.fieldData["general_applicant_entry_inspection"] ? $scope.fieldData["general_applicant_entry_inspection"]: "null"),
                                    general_applicant_date_present_marriage:  ($scope.fieldData["general_applicant_date_present_marriage"] ? $scope.fieldData["general_applicant_date_present_marriage"]  : "null"),
                                    general_applicant_place_present_marriage:  ($scope.fieldData["general_applicant_place_present_marriage"] ? $scope.fieldData["general_applicant_place_present_marriage"]: "null"),
                                    general_applicant_spouse_first_name:  ($scope.fieldData["general_applicant_spouse_first_name"] ? $scope.fieldData["general_applicant_spouse_first_name"] : "null"), 
                                    general_applicant_spouse_last_name:  ($scope.fieldData["general_applicant_spouse_last_name"] ? $scope.fieldData["general_applicant_spouse_last_name"]: "null"), 
                                    general_applicant_spouse_middle_name:   ($scope.fieldData["general_applicant_spouse_middle_name"] ?$scope.fieldData["general_applicant_spouse_middle_name"] : "null"), 
                                    general_applicant_spouse_relationship:  ($scope.fieldData["general_applicant_spouse_relationship"] ? $scope.fieldData["general_applicant_spouse_relationship"]: "null"), 
                                    general_applicant_spouse_dob:   ($scope.fieldData["general_applicant_spouse_dob"] ? $scope.fieldData["general_applicant_spouse_dob"]: "null"), 
                                    general_applicant_spouse_cob:   ($scope.fieldData["general_applicant_spouse_cob"] ? $scope.fieldData["general_applicant_spouse_cob"] : "null"), 
                                    general_applicant_spouse_a_number:  ($scope.fieldData["general_applicant_spouse_a_number"] ? $scope.fieldData["general_applicant_spouse_a_number"] : "null"), 
                                    general_applicant_spouse_application:  ($scope.fieldData["general_applicant_spouse_application"] ? $scope.fieldData["general_applicant_spouse_application"]: "null"), 
                                    general_applicant_marital_status_single:   ($scope.fieldData["general_applicant_marital_status_single"] ? $scope.fieldData["general_applicant_marital_status_single"]: "null"),
                                    general_applicant_marital_status_widowed:  ($scope.fieldData["general_applicant_marital_status_widowed"] ? $scope.fieldData["general_applicant_marital_status_widowed"]: "null"), 
                                    general_applicant_marital_status_divorced: ($scope.fieldData["general_applicant_marital_status_divorced"] ? $scope.fieldData["general_applicant_marital_status_divorced"] : "null")
                              },

                            i130: 
                              {
                                    i130_adoption: ($scope.fieldData["i130_adoption"]? $scope.fieldData["i130_adoption"]: "null"),
                                    i130_residence_through_adoption: ($scope.fieldData["i130_residence_through_adoption"]? $scope.fieldData["i130_residence_through_adoption"]: "null"),
                                    i130_sponsor_first_name: ($scope.fieldData["i130_sponsor_first_name"]? $scope.fieldData["i130_sponsor_first_name"]: "null"),
                                    i130_sponsor_last_name: ($scope.fieldData["i130_sponsor_last_name"]? $scope.fieldData["i130_sponsor_last_name"]: "null"),
                                    i130_sponsor_middle_name: ($scope.fieldData["i130_sponsor_middle_name"]? $scope.fieldData["i130_sponsor_middle_name"]: "null"),
                                    i130_sponsor_other_name: ($scope.fieldData["i130_sponsor_other_name"]? $scope.fieldData["i130_sponsor_other_name"]: "null"),
                                    i130_sponsor_street: ($scope.fieldData["i130_sponsor_street"]? $scope.fieldData["i130_sponsor_street"]: "null"),
                                    i130_sponsor_apt_suit:  ($scope.fieldData["i130_sponsor_apt_suit"]? $scope.fieldData["i130_sponsor_apt_suit"]: "null"),
                                    i130_sponsor_city: ($scope.fieldData["i130_sponsor_city"]? $scope.fieldData["i130_sponsor_city"]: "null"),
                                    i130_sponsor_state: ($scope.fieldData["i130_sponsor_state"]? $scope.fieldData["i130_sponsor_state"]: "null"),
                                    i130_sponsor_country: ($scope.fieldData["i130_sponsor_country"]? $scope.fieldData["i130_sponsor_country"] : "null"),
                                    i130_sponsor_zip_code:  ($scope.fieldData["i130_sponsor_zip_code"]? $scope.fieldData["i130_sponsor_zip_code"]: "null"),
                                    i130_sponsor_co: ($scope.fieldData["i130_sponsor_co"]? $scope.fieldData["i130_sponsor_co"]: "null"),
                                    i130_sponsor_phone: ($scope.fieldData["i130_sponsor_phone"]? $scope.fieldData["i130_sponsor_phone"]: "null"),
                                    i130_sponsor_dob:  ($scope.fieldData["i130_sponsor_dob"]? $scope.fieldData["i130_sponsor_dob"]: "null"),
                                    i130_sponsor_pob_town:  ($scope.fieldData["i130_sponsor_pob_town"]? $scope.fieldData["i130_sponsor_pob_town"]: "null"),
                                    i130_sponsor_pob_state: ($scope.fieldData["i130_sponsor_pob_state"]? $scope.fieldData["i130_sponsor_pob_state"]: "null"),
                                    i130_sponsor_pob_country: ($scope.fieldData["i130_sponsor_pob_country"]? $scope.fieldData["i130_sponsor_pob_country"]: "null"),
                                    i130_sponsor_nationality:  ($scope.fieldData["i130_sponsor_nationality"]? $scope.fieldData["i130_sponsor_nationality"]: "null"),
                                    i130_sponsor_gender_male: ($scope.fieldData["i130_sponsor_gender_male"]? $scope.fieldData["i130_sponsor_gender_male"]: "null"),
                                    i130_sponsor_gender_female: ($scope.fieldData["i130_sponsor_gender_female"]? $scope.fieldData["i130_sponsor_gender_female"]: "null"),
                                    i130_sponsor_marital_status_married: ($scope.fieldData["i130_sponsor_marital_status_married"]? $scope.fieldData["i130_sponsor_marital_status_married"]: "null"),
                                    i130_sponsor_marital_status_widowed: ($scope.fieldData["i130_sponsor_marital_status_widowed"]? $scope.fieldData["i130_sponsor_marital_status_widowed"]: "null"),
                                    i130_sponsor_marital_status_single:  ($scope.fieldData["i130_sponsor_marital_status_single"]? $scope.fieldData["i130_sponsor_marital_status_single"]: "null"),
                                    i130_sponsor_marital_status_divorced: ($scope.fieldData["i130_sponsor_marital_status_divorced"]? $scope.fieldData["i130_sponsor_marital_status_divorced"]: "null"),
                                    i130_sponsor_ssn: ($scope.fieldData["i130_sponsor_ssn"]? $scope.fieldData["i130_sponsor_ssn"]: "null"),
                                    i130_sponsor_a_registration_number: ($scope.fieldData["i130_sponsor_a_registration_number"]? $scope.fieldData["i130_sponsor_a_registration_number"]: "null"),
                                    i130_sponsor_date_of_present_marriage:  ($scope.fieldData["i130_sponsor_date_of_present_marriage"]? $scope.fieldData["i130_sponsor_date_of_present_marriage"]: "null"),
                                    i130_sponsor_place_of_present_marriage: ($scope.fieldData["i130_sponsor_place_of_present_marriage"]? $scope.fieldData["i130_sponsor_place_of_present_marriage"]: "null"),
                                    i130_sponsor_name_of_prior_spouse: ($scope.fieldData["i130_sponsor_name_of_prior_spouse"]? $scope.fieldData["i130_sponsor_name_of_prior_spouse"]: "null"),
                                    i130_sponsor_date_of_end_of_prior_marriage: ($scope.fieldData["i130_sponsor_date_of_end_of_prior_marriage"]? $scope.fieldData["i130_sponsor_date_of_end_of_prior_marriage"]: "null"),
                                    i130_sponsor_citizenship_birth:($scope.fieldData["i130_sponsor_citizenship_birth"]? $scope.fieldData["i130_sponsor_citizenship_birth"]: "null"),
                                    i130_sponsor_citizenship_naturalization: ($scope.fieldData["i130_sponsor_citizenship_naturalization"]? $scope.fieldData["i130_sponsor_citizenship_naturalization"]: "null"),
                                    i130_sponsor_naturalization_number: ($scope.fieldData["i130_sponsor_naturalization_number"]? $scope.fieldData["i130_sponsor_naturalization_number"]: "null"),
                                    i130_sponsor_naturalization_place_of_issuance: ($scope.fieldData["i130_sponsor_naturalization_place_of_issuance"]? $scope.fieldData["i130_sponsor_naturalization_place_of_issuance"]: "null"),
                                    i130_sponsor_pr_date_of_admission:  ($scope.fieldData["i130_sponsor_pr_date_of_admission"]? $scope.fieldData["i130_sponsor_pr_date_of_admission"] : "null"),
                                    i130_sponsor_pr_place_of_admission: ($scope.fieldData["i130_sponsor_pr_place_of_admission"]? $scope.fieldData["i130_sponsor_pr_place_of_admission"]: "null"),
                                    i130_sponsor_pr_class_of_admission: ($scope.fieldData["i130_sponsor_pr_class_of_admission"]? $scope.fieldData["i130_sponsor_pr_class_of_admission"]: "null"),
                                    i130_sponsored_intended_residence_adddress: ($scope.fieldData["i130_sponsored_intended_residence_adddress"]? $scope.fieldData["i130_sponsored_intended_residence_adddress"]: "null"),
                                    i130_sponsored_intended_residence_city: ($scope.fieldData["i130_sponsored_intended_residence_city"]? $scope.fieldData["i130_sponsored_intended_residence_city"] : "null"),
                                    i130_sponsored_intended_residence_state: ($scope.fieldData["i130_sponsored_intended_residence_state"]? $scope.fieldData["i130_sponsored_intended_residence_state"]: "null"),
                                    i130_sponsored_full_address_abroad:  ($scope.fieldData["i130_sponsored_full_address_abroad"]? $scope.fieldData["i130_sponsored_full_address_abroad"]: "null"),
                                    i130_sponsored_full_address_native_language: ($scope.fieldData["i130_sponsored_full_address_native_language"]? $scope.fieldData["i130_sponsored_full_address_native_language"]: "null"),
                                    i130_sponsored_name_native_language: ($scope.fieldData["i130_sponsored_name_native_language"]? $scope.fieldData["i130_sponsored_name_native_language"] : "null"),
                                    i130_spouse: ($scope.fieldData["i130_spouse"]? $scope.fieldData["i130_spouse"]: "null"),
                                    i130_parent: ($scope.fieldData['i130_parent']? $scope.fieldData['i130_parent']: "null"),
                                    i130_BrotherSister: ($scope.fieldData['i130_BrotherSister']? $scope.fieldData['i130_BrotherSister'] : "null"),
                                    i130_child: ($scope.fieldData['i130_child'] ? $scope.fieldData['i130_child']  : "null")
                            },

                            i765: {
                                    i765_previous_application: ($scope.fieldData["i765_previous_application"]? $scope.fieldData["i765_previous_application"]: "null"),
                                    i765_office: ($scope.fieldData["i765_office"]? $scope.fieldData["i765_office"]: "null"),
                                    i765_date_of_previous_application: ($scope.fieldData["i765_date_of_previous_application"]? $scope.fieldData["i765_date_of_previous_application"] : "null"), 
                                    i765_result_of_previous_application: ($scope.fieldData["i765_result_of_previous_application"]? $scope.fieldData["i765_result_of_previous_application"]: "null"),
                                    i765_application_employment: ($scope.fieldData["i765_application_employment"]? $scope.fieldData["i765_application_employment"]: "null"),
                                    i765_application_replacement:  ($scope.fieldData["i765_application_replacement"]? $scope.fieldData["i765_application_replacement"]: "null"),
                                    i765_application_renewal:  ($scope.fieldData["i765_application_renewal"]? $scope.fieldData["i765_application_renewal"]: "null")
                            },

                            i485: {
                                    i485_applicant_visa_number_availability: ($scope.fieldData["i485_applicant_visa_number_availability"]? $scope.fieldData["i485_applicant_visa_number_availability"] : "null"),
                                    i485_applicant_visa_derivative_status: ($scope.fieldData["i485_applicant_visa_derivative_status"]? $scope.fieldData["i485_applicant_visa_derivative_status"] : "null"),
                                    i485_applicant_current_occupation: ($scope.fieldData["i485_applicant_current_occupation"]? $scope.fieldData["i485_applicant_current_occupation"] : "null"),
                                    i485_applicant_mother_first_name: ($scope.fieldData["i485_applicant_mother_first_name"]? $scope.fieldData["i485_applicant_mother_first_name"] : "null"),
                                    i485_applicant_father_first_name: ($scope.fieldData["i485_applicant_father_first_name"]? $scope.fieldData["i485_applicant_father_first_name"] : "null"),
                                    i485_applicant_i94_exact_name: ($scope.fieldData["i485_applicant_i94_exact_name"]? $scope.fieldData["i485_applicant_i94_exact_name"] : "null"),
                                    i485_applicant_previous_application: ($scope.fieldData["i485_applicant_previous_application"]? $scope.fieldData["i485_applicant_previous_application"] : "null"),
                                    i485_previous_filing_deposition: ($scope.fieldData["i485_previous_filing_deposition"]? $scope.fieldData["i485_previous_filing_deposition"] : "null")
                            }



                         };

                         formFieldData.$save();  


     };//end of ProcessForm functions

    /*****************Total Fees Calculation Functions**********************/

      $scope.fees_calculation_flag = $stateParams['fees_calculation_flag'];

      // call fees calculation function when the calculation fee flag is activated.

     if ($scope.fees_calculation_flag == "true"){ 

        $cookieStore.put("current_case_id", $scope.current_case_id);

     var Fee =  $resource('/api/cases/1/charges/:id', {id:'@id'}) ;

        Fee.get({id: $scope.current_case_id }, function(data){
            console.log(data);
            $scope.total_fee = data['total_fee'];
            $scope.sub_total_fees = data['sub_total_fees'];

            $scope.converted_total_fee = $scope.total_fee + "00";

            //reset the fees calculation flag to null
            $scopefees_calculation_flag = null ;
        });
    }
    /*****************End of Total Fees Calculation Functions***************/


});
    
                                    
app.controller("formController", function($scope,  $stateParams, $cookies, $cookieStore, myCache, Case, CaseInit, formsResource, OptionResource, $resource) {

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

    //catch form fields data and assign to cookie
    $scope.catchData = function(name, form_data){         
        var cache = myCache.get('myData');
        var fieldsData = {} ;
            fieldsData[name] = form_data;

         if (cache){
            $scope.PreviousFieldsCache = cache;
            $scope.PreviousFieldsCache[name] = form_data;
            myCache.put('myData', $scope.PreFieldsCache);

         } else{
            myCache.put('myData', fieldsData);
         }
    };

    //function to choose forms
    $scope.chooseForm = function(category) {



    //generate case id with random characters
    function makeid()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 10; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }

    $scope.case_id = makeid();

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
}


    //populate cases table
    var InitializeCase = new CaseInit();
            InitializeCase.case = {
             case_id: $scope.case_id,
             application_id: 1,
             user_id: 1
            }; 

    InitializeCase.$save();  


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

    location.assign('#form/section1?case_id=' + $scope.case_id +'&application_type='+ $scope.switchButtons["application_type"] + '&section1=' + $scope.switchButtons["section1"] + '&section2=' + $scope.switchButtons["section2"]
                + '&section3=' + $scope.switchButtons["section3"] + '&section4=' + $scope.switchButtons["section4"] + '&section5=' + $scope.switchButtons["section5"] 
                + '&section6=' + $scope.switchButtons["section6"] + '&section7=' + $scope.switchButtons["section7"] + '&section8=' + $scope.switchButtons["section8"] 
                + '&section9=' + $scope.switchButtons["section9"]
                );
    };
    
    // function to process the form
    $scope.processForm = function() {

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
      console.log("hello hello");

      var formFieldData = new formsResource({id: $stateParams['case_id']});

           //  formFieldData.i130test = {
           //   first_name: "hello" ,
           //   last_name: "hello",  
           //   pod: "hello",  
           //   dob: "hello",  
           //   sponsor_name: "hello",  
           //   nationality: "hello",  
           //   country_of_destination: "hello",  
           //   date_of_return: "hello",  
           //   counsol: "hello",  
           //   spouse: "hello",  
           //   previous_application: "hello",   
           //   office: "hello"
           // }; 

           //  formFieldData.optiontest = {
           //   name: $scope.current_case_id,
           //   age: $scope.current_case_id
           //  }; 

       

      formFieldData.case = { general_information:
                                {
                                                     general_applicant_child_first_name_1: "hello", 
                                                     general_applicant_child_last_name_1: "hello", 
                                                     general_applicant_child_middle_name_1: "hello", 
                                                     general_applicant_child_relationship_1: "hello", 
                                                     general_applicant_child_dob_1: "hello", 
                                                     general_applicant_child_cob_1: "hello", 
                                                     general_applicant_child_a_number_1: "hello", 
                                                     general_applicant_child_application_1: "hello", 
                                                     general_applicant_child_first_name_2: "hello", 
                                                     general_applicant_child_last_name_2: "hello", 
                                                     general_applicant_child_middle_name_2: "hello", 
                                                     general_applicant_child_relationship_2: "hello", 
                                                     general_applicant_child_dob_2: "hello", 
                                                     general_applicant_child_cob_2: "hello", 
                                                     general_applicant_child_a_number_2: "hello", 
                                                     general_applicant_child_application_2: "hello", 
                                                     general_applicant_child_first_name_3: "hello", 
                                                     general_applicant_child_last_name_3: "hello", 
                                                     general_applicant_child_middle_name_3: "hello", 
                                                     general_applicant_child_relationship_3: "hello", 
                                                     general_applicant_child_dob_3: "hello", 
                                                     general_applicant_child_cob_3: "hello", 
                                                     general_applicant_child_a_number_3: "hello", 
                                                     general_applicant_child_application_3: "hello", 
                                                     general_applicant_child_first_name_4: "hello", 
                                                     general_applicant_child_last_name_4: "hello", 
                                                     general_applicant_child_middle_name_4: "hello", 
                                                     general_applicant_child_relationship_4: "hello", 
                                                     general_applicant_child_dob_4: "hello", 
                                                     general_applicant_child_cob_4: "hello", 
                                                     general_applicant_child_a_number_4: "hello", 
                                                     general_applicant_child_application_4: "hello", 
                                                     general_applicant_child_first_name_5: "hello", 
                                                     general_applicant_child_last_name_5: "hello", 
                                                     general_applicant_child_middle_name_5: "hello", 
                                                     general_applicant_child_relationship_5: "hello", 
                                                     general_applicant_child_dob_5: "hello", 
                                                     general_applicant_child_cob_5: "hello", 
                                                     general_applicant_child_a_number_5: "hello", 
                                                     general_applicant_child_application_5: "hello", 
                                                     general_applicant_first_name: "hello", 
                                                     general_applicant_last_name: "hello", 
                                                     general_applicant_middle_name: "hello", 
                                                     general_applicant_other_name: "hello", 
                                                     general_applicant_street: "hello", 
                                                     general_applicant_apt_suit: "hello", 
                                                     general_applicant_city: "hello", 
                                                     general_applicant_state: "hello", 
                                                     general_applicant_country: "hello", 
                                                     general_applicant_zip_code: "hello", 
                                                     general_applicant_co: "hello", 
                                                     general_applicant_phone: "hello", 
                                                     general_applicant_dob: "hello", 
                                                     general_applicant_pob_town: "hello", 
                                                     general_applicant_pob_state: "hello", 
                                                     general_applicant_pob_country: "hello", 
                                                     general_applicant_nationality: "hello", 
                                                     general_applicant_gender_male: "hello", 
                                                     general_applicant_gender_female: "hello", 
                                                     general_applicant_marital_status_married: "hello", 
                                                     general_applicant_ssn: "hello", 
                                                     general_applicant_alien_number: "hello", 
                                                     general_applicant_i_94: "hello", 
                                                     general_applicant_date_of_last_arrival: "hello", 
                                                     general_applicant_uscis_status: "hello", 
                                                     general_applicant_status_expiration_date: "hello", 
                                                     general_applicant_visa_number: "hello", 
                                                     general_applicant_last_entry: "hello", 
                                                     general_applicant_place_of_last_entry: "hello", 
                                                     general_applicant_consulate: "hello", 
                                                     general_applicant_entry_inspection: "hello", 
                                                     general_applicant_date_present_marriage: "hello", 
                                                     general_applicant_place_present_marriage: "hello", 
                                                     general_applicant_spouse_first_name: "hello", 
                                                     general_applicant_spouse_last_name: "hello", 
                                                     general_applicant_spouse_middle_name: "hello", 
                                                     general_applicant_spouse_relationship: "hello", 
                                                     general_applicant_spouse_dob: "hello", 
                                                     general_applicant_spouse_cob: "hello", 
                                                     general_applicant_spouse_a_number: "hello", 
                                                     general_applicant_spouse_application: "hello", 
                                                     general_applicant_marital_status_single: "hello", 
                                                     general_applicant_marital_status_widowed: "hello", 
                                                     general_applicant_marital_status_divorced: "hello"





                                    // general_applicant_child_first_name_1: $scope.fieldData["general_applicant_child_first_name_1"], 
                                    // general_applicant_child_last_name_1:  $scope.fieldData["general_applicant_child_last_name_1"], 
                                    // general_applicant_child_middle_name_1: $scope.fieldData["general_applicant_child_middle_name_1"], 
                                    // general_applicant_child_relationship_1:  $scope.fieldData["general_applicant_child_relationship_1"], 
                                    // general_applicant_child_dob_1:  $scope.fieldData["general_applicant_child_dob_1"], 
                                    // general_applicant_child_cob_1:  $scope.fieldData["general_applicant_child_cob_1"], 
                                    // general_applicant_child_a_number_1:  $scope.fieldData["general_applicant_child_a_number_1"], 
                                    // general_applicant_child_application_1:  $scope.fieldData["general_applicant_child_application_1"], 
                                    // general_applicant_child_first_name_2:  $scope.fieldData["general_applicant_child_first_name_2"], 
                                    // general_applicant_child_last_name_2:  $scope.fieldData["general_applicant_child_last_name_2"], 
                                    // general_applicant_child_middle_name_2:  $scope.fieldData["general_applicant_child_middle_name_2"], 
                                    // general_applicant_child_relationship_2:  $scope.fieldData["general_applicant_child_relationship_2"], 
                                    // general_applicant_child_dob_2:  $scope.fieldData["general_applicant_child_dob_2"], 
                                    // general_applicant_child_cob_2:  $scope.fieldData["general_applicant_child_cob_2"],
                                    // general_applicant_child_a_number_2:  $scope.fieldData["general_applicant_child_a_number_2"], 
                                    // general_applicant_child_application_2:  $scope.fieldData["general_applicant_child_application_2"], 
                                    // general_applicant_child_first_name_3:  $scope.fieldData["general_applicant_child_first_name_3"], 
                                    // general_applicant_child_last_name_3:  $scope.fieldData["general_applicant_child_last_name_3"], 
                                    // general_applicant_child_middle_name_3:  $scope.fieldData["general_applicant_child_middle_name_3"], 
                                    // general_applicant_child_relationship_3:  $scope.fieldData["general_applicant_child_relationship_3"], 
                                    // general_applicant_child_dob_3:  $scope.fieldData["general_applicant_child_dob_3"], 
                                    // general_applicant_child_cob_3:  $scope.fieldData["general_applicant_child_cob_3"], 
                                    // general_applicant_child_a_number_3:  $scope.fieldData["general_applicant_child_a_number_3"], 
                                    // general_applicant_child_application_3:   $scope.fieldData["general_applicant_child_application_3"],
                                    // general_applicant_child_first_name_4:  $scope.fieldData["general_applicant_child_first_name_4"], 
                                    // general_applicant_child_last_name_4:   $scope.fieldData["general_applicant_child_last_name_4"], 
                                    // general_applicant_child_middle_name_4:  $scope.fieldData["general_applicant_child_middle_name_4"], 
                                    // general_applicant_child_relationship_4:  $scope.fieldData["general_applicant_child_relationship_4"], 
                                    // general_applicant_child_dob_4:   $scope.fieldData["general_applicant_child_dob_4"], 
                                    // general_applicant_child_cob_4:  $scope.fieldData["general_applicant_child_cob_4"], 
                                    // general_applicant_child_a_number_4:  $scope.fieldData["general_applicant_child_a_number_4"],
                                    // general_applicant_child_application_4:   $scope.fieldData["general_applicant_child_application_4"],
                                    // general_applicant_child_first_name_5:  $scope.fieldData["general_applicant_child_first_name_5"], 
                                    // general_applicant_child_last_name_5:  $scope.fieldData["general_applicant_child_last_name_5"],
                                    // general_applicant_child_middle_name_5:  $scope.fieldData["general_applicant_child_middle_name_5"], 
                                    // general_applicant_child_relationship_5:  $scope.fieldData["general_applicant_child_relationship_5"], 
                                    // general_applicant_child_dob_5:  $scope.fieldData["general_applicant_child_dob_5"], 
                                    // general_applicant_child_cob_5:  $scope.fieldData["general_applicant_child_cob_5"], 
                                    // general_applicant_child_a_number_5:  $scope.fieldData["general_applicant_child_a_number_5"], 
                                    // general_applicant_child_application_5:  $scope.fieldData["general_applicant_child_application_5"], 
                                    // general_applicant_first_name:  $scope.fieldData["general_applicant_first_name"], 
                                    // general_applicant_last_name:  $scope.fieldData["general_applicant_last_name"], 
                                    // general_applicant_middle_name:   $scope.fieldData["general_applicant_middle_name"], 
                                    // general_applicant_other_name:  $scope.fieldData["general_applicant_other_name"], 
                                    // general_applicant_street:   $scope.fieldData["general_applicant_street"], 
                                    // general_applicant_apt_suit:    $scope.fieldData["general_applicant_apt_suit"], 
                                    // general_applicant_city:  $scope.fieldData["general_applicant_city"], 
                                    // general_applicant_state:  $scope.fieldData["general_applicant_state"], 
                                    // general_applicant_country:  $scope.fieldData["general_applicant_country"],
                                    // general_applicant_zip_code:  $scope.fieldData["general_applicant_zip_code"], 
                                    // general_applicant_co:  $scope.fieldData["general_applicant_co"], 
                                    // general_applicant_phone:  $scope.fieldData["general_applicant_phone"], 
                                    // general_applicant_dob:  $scope.fieldData["general_applicant_dob"], 
                                    // general_applicant_pob_town:  $scope.fieldData["general_applicant_pob_town"], 
                                    // general_applicant_pob_state:  $scope.fieldData["general_applicant_pob_state"], 
                                    // general_applicant_pob_country:  $scope.fieldData["general_applicant_pob_country"], 
                                    // general_applicant_nationality:  $scope.fieldData["general_applicant_nationality"], 
                                    // general_applicant_gender_male:   $scope.fieldData["general_applicant_gender_male"], 
                                    // general_applicant_gender_female:   $scope.fieldData["general_applicant_gender_female"], 
                                    // general_applicant_marital_status_married:   $scope.fieldData["general_applicant_marital_status_married"], 
                                    // general_applicant_ssn:  $scope.fieldData["general_applicant_ssn"], 
                                    // general_applicant_alien_number:  $scope.fieldData["general_applicant_alien_number"],
                                    // general_applicant_i_94:  $scope.fieldData["general_applicant_i_94"], 
                                    // general_applicant_date_of_last_arrival:  $scope.fieldData["general_applicant_date_of_last_arrival"], 
                                    // general_applicant_uscis_status:  $scope.fieldData["general_applicant_uscis_status"],
                                    // general_applicant_status_expiration_date:  $scope.fieldData["general_applicant_status_expiration_date"], 
                                    // general_applicant_visa_number:  $scope.fieldData["general_applicant_visa_number"], 
                                    // general_applicant_last_entry:  $scope.fieldData["general_applicant_last_entry"], 
                                    // general_applicant_place_of_last_entry:   $scope.fieldData["general_applicant_place_of_last_entry"],
                                    // general_applicant_consulate:  $scope.fieldData["general_applicant_consulate"], 
                                    // general_applicant_entry_inspection:  $scope.fieldData["general_applicant_entry_inspection"],
                                    // general_applicant_date_present_marriage:  $scope.fieldData["general_applicant_date_present_marriage"],
                                    // general_applicant_place_present_marriage:  $scope.fieldData["general_applicant_place_present_marriage"],
                                    // general_applicant_spouse_first_name:  $scope.fieldData["general_applicant_spouse_first_name"], 
                                    // general_applicant_spouse_last_name:  $scope.fieldData["general_applicant_spouse_last_name"], 
                                    // general_applicant_spouse_middle_name:   $scope.fieldData["general_applicant_spouse_middle_name"], 
                                    // general_applicant_spouse_relationship:  $scope.fieldData["general_applicant_spouse_relationship"], 
                                    // general_applicant_spouse_dob:   $scope.fieldData["general_applicant_spouse_dob"], 
                                    // general_applicant_spouse_cob:   $scope.fieldData["general_applicant_spouse_cob"], 
                                    // general_applicant_spouse_a_number:  $scope.fieldData["general_applicant_spouse_a_number"], 
                                    // general_applicant_spouse_application:  $scope.fieldData["general_applicant_spouse_application"], 
                                    // general_applicant_marital_status_single:   $scope.fieldData["general_applicant_marital_status_single"],
                                    // general_applicant_marital_status_widowed:  $scope.fieldData["general_applicant_marital_status_widowed"], 
                                    // general_applicant_marital_status_divorced: $scope.fieldData["general_applicant_marital_status_divorced"]
                              }

                            // i130: 
                            //   {
                            //         i130_adoption: $scope.fieldData["i130_adoption"],
                            //         i130_residence_through_adoption: $scope.fieldData["i130_residence_through_adoption"],
                            //         i130_sponsor_first_name: $scope.fieldData["i130_sponsor_first_name"],
                            //         i130_sponsor_last_name: $scope.fieldData["i130_sponsor_last_name"],
                            //         i130_sponsor_middle_name: $scope.fieldData["i130_sponsor_middle_name"],
                            //         i130_sponsor_other_name: $scope.fieldData["i130_sponsor_other_name"],
                            //         i130_sponsor_street: $scope.fieldData["i130_sponsor_street"],
                            //         i130_sponsor_apt_suit:  $scope.fieldData["i130_sponsor_apt_suit"],
                            //         i130_sponsor_city: $scope.fieldData["i130_sponsor_city"],
                            //         i130_sponsor_state: $scope.fieldData["i130_sponsor_state"],
                            //         i130_sponsor_country: $scope.fieldData["i130_sponsor_country"],
                            //         i130_sponsor_zip_code:  $scope.fieldData["i130_sponsor_zip_code"],
                            //         i130_sponsor_co: $scope.fieldData["i130_sponsor_co"],
                            //         i130_sponsor_phone: $scope.fieldData["i130_sponsor_phone"],
                            //         i130_sponsor_dob:  $scope.fieldData["i130_sponsor_dob"],
                            //         i130_sponsor_pob_town:  $scope.fieldData["i130_sponsor_pob_town"],
                            //         i130_sponsor_pob_state: $scope.fieldData["i130_sponsor_pob_state"],
                            //         i130_sponsor_pob_country: $scope.fieldData["i130_sponsor_pob_country"],
                            //         i130_sponsor_nationality:  $scope.fieldData["i130_sponsor_nationality"],
                            //         i130_sponsor_gender_male: $scope.fieldData["i130_sponsor_gender_male"],
                            //         i130_sponsor_gender_female: $scope.fieldData["i130_sponsor_gender_female"],
                            //         i130_sponsor_marital_status_married: $scope.fieldData["i130_sponsor_marital_status_married"],
                            //         i130_sponsor_marital_status_widowed: $scope.fieldData["i130_sponsor_marital_status_widowed"],
                            //         i130_sponsor_marital_status_single:  $scope.fieldData["i130_sponsor_marital_status_single"],
                            //         i130_sponsor_marital_status_divorced: $scope.fieldData["i130_sponsor_marital_status_divorced"],
                            //         i130_sponsor_ssn: $scope.fieldData["i130_sponsor_ssn"],
                            //         i130_sponsor_a_registration_number: $scope.fieldData["i130_sponsor_a_registration_number"],
                            //         i130_sponsor_date_of_present_marriage:  $scope.fieldData["i130_sponsor_date_of_present_marriage"],
                            //         i130_sponsor_place_of_present_marriage: $scope.fieldData["i130_sponsor_place_of_present_marriage"],
                            //         i130_sponsor_name_of_prior_spouse: $scope.fieldData["i130_sponsor_name_of_prior_spouse"],
                            //         i130_sponsor_date_of_end_of_prior_marriage: $scope.fieldData["i130_sponsor_date_of_end_of_prior_marriage"],
                            //         i130_sponsor_citizenship_birth:$scope.fieldData["i130_sponsor_citizenship_birth"],
                            //         i130_sponsor_citizenship_naturalization: $scope.fieldData["i130_sponsor_citizenship_naturalization"],
                            //         i130_sponsor_naturalization_number: $scope.fieldData["i130_sponsor_naturalization_number"],
                            //         i130_sponsor_naturalization_place_of_issuance: $scope.fieldData["i130_sponsor_naturalization_place_of_issuance"],
                            //         i130_sponsor_pr_date_of_admission:  $scope.fieldData["i130_sponsor_pr_date_of_admission"],
                            //         i130_sponsor_pr_place_of_admission: $scope.fieldData["i130_sponsor_pr_place_of_admission"],
                            //         i130_sponsor_pr_class_of_admission: $scope.fieldData["i130_sponsor_pr_class_of_admission"],
                            //         i130_sponsored_intended_residence_adddress: $scope.fieldData["i130_sponsored_intended_residence_adddress"],
                            //         i130_sponsored_intended_residence_city: $scope.fieldData["i130_sponsored_intended_residence_city"],
                            //         i130_sponsored_intended_residence_state: $scope.fieldData["i130_sponsored_intended_residence_state"],
                            //         i130_sponsored_full_address_abroad:  $scope.fieldData["i130_sponsored_full_address_abroad"],
                            //         i130_sponsored_full_address_native_language: $scope.fieldData["i130_sponsored_full_address_native_language"],
                            //         i130_sponsored_name_native_language: $scope.fieldData["i130_sponsored_name_native_language"],
                            //         i130_spouse: $scope.fieldData["i130_spouse"],
                            //         i130_parent: $scope.fieldData['i130_parent'],
                            //         i130_BrotherSister: $scope.fieldData['i130_BrotherSister'],
                            //         i130_child: $scope.fieldData['i130_child']
                            // },
                            // i765: {
                            //         i765_previous_application: $scope.fieldData["i765_previous_application"],
                            //         i765_office: $scope.fieldData["i765_office"],
                            //         i765_result_of_previous_application: $scope.fieldData["i765_date_of_previous_application"],
                            //         i765_application_employment: $scope.fieldData["i765_application_employment"],
                            //         i765_application_replacement:  $scope.fieldData["i765_application_replacement"],
                            //         i765_application_renewal:  $scope.fieldData["i765_application_renewal"]
                            // }

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
    
                                    
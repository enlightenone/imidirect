app.factory('processForm', ['myCache', 'formsResource', function(myCache, formsResource) {
var service = {};

service.storeData = function(case_id){
  console.log("Inside of storeData function ");
  var previousSavedCache = myCache.get('myData');

  console.log("Cache Content Inside of the StoreData: " + previousSavedCache);
  var count = 1 ; 
  var individualFieldData = previousSavedCache['form1'];
  var fieldData = {};

  // // pull data from partial forms from cookie and combine into one object.
  while (individualFieldData) {
      for (var key in individualFieldData) {
          fieldData[key] = individualFieldData[key] ;
          console.log( key + ": " + fieldData[key] ); 
       }
      count++ ;
      individualFieldData = previousSavedCache['form' + count] ;
  }

      var formFieldData = new formsResource({id: case_id });
      formFieldData.case = { general_information:
                                {          
                                    general_applicant_child_first_name_1: (fieldData["general_applicant_child_first_name_1"]? fieldData["general_applicant_child_first_name_1"] : "null"), 
                                    general_applicant_child_last_name_1:  (fieldData["general_applicant_child_last_name_1"]? fieldData["general_applicant_child_last_name_1"] : "null"), 
                                    general_applicant_child_middle_name_1: (fieldData["general_applicant_child_middle_name_1"] ? fieldData["general_applicant_child_middle_name_1"]  : "null"), 
                                    general_applicant_child_relationship_1:  (fieldData["general_applicant_child_relationship_1"] ? fieldData["general_applicant_child_relationship_1"] : "null"), 
                                    general_applicant_child_dob_1:  (fieldData["general_applicant_child_dob_1"] ? fieldData["general_applicant_child_dob_1"] : "null"), 
                                    general_applicant_child_cob_1:  (fieldData["general_applicant_child_cob_1"] ? fieldData["general_applicant_child_cob_1"] : "null"), 
                                    general_applicant_child_a_number_1:  (fieldData["general_applicant_child_a_number_1"] ? fieldData["general_applicant_child_a_number_1"] : "null"), 
                                    general_applicant_child_application_1:  (fieldData["general_applicant_child_application_1"] ?  fieldData["general_applicant_child_application_1"] : "null"), 
                                    general_applicant_child_first_name_2:  (fieldData["general_applicant_child_first_name_2"] ?  fieldData["general_applicant_child_first_name_2"] : "null"), 
                                    general_applicant_child_last_name_2:  (fieldData["general_applicant_child_last_name_2"] ? fieldData["general_applicant_child_last_name_2"] : "null"), 
                                    general_applicant_child_middle_name_2:  (fieldData["general_applicant_child_middle_name_2"] ? fieldData["general_applicant_child_middle_name_2"] : "null"), 
                                    general_applicant_child_relationship_2:  (fieldData["general_applicant_child_relationship_2"] ? fieldData["general_applicant_child_relationship_2"] : "null"), 
                                    general_applicant_child_cob_2:  (fieldData["general_applicant_child_cob_2"] ? fieldData["general_applicant_child_cob_2"]  : "null"),
                                    general_applicant_child_a_number_2:  (fieldData["general_applicant_child_a_number_2"] ?fieldData["general_applicant_child_a_number_2"] : "null"), 
                                    general_applicant_child_application_2:  (fieldData["general_applicant_child_application_2"] ?fieldData["general_applicant_child_application_2"] : "null"), 
                                    general_applicant_child_first_name_3:  (fieldData["general_applicant_child_first_name_3"] ? fieldData["general_applicant_child_first_name_3"] : "null"), 
                                    general_applicant_child_last_name_3:  (fieldData["general_applicant_child_last_name_3"] ? fieldData["general_applicant_child_last_name_3"]: "null"), 
                                    general_applicant_child_middle_name_3:  (fieldData["general_applicant_child_middle_name_3"] ? fieldData["general_applicant_child_last_name_3"] : "null"), 
                                    general_applicant_child_relationship_3:  (fieldData["general_applicant_child_relationship_3"] ? fieldData["general_applicant_child_relationship_3"] : "null"), 
                                    general_applicant_child_dob_3:  (fieldData["general_applicant_child_dob_3"] ? fieldData["general_applicant_child_dob_3"] : "null"), 
                                    general_applicant_child_cob_3:  (fieldData["general_applicant_child_cob_3"] ? fieldData["general_applicant_child_cob_3"] : "null"), 
                                    general_applicant_child_a_number_3:  (fieldData["general_applicant_child_a_number_3"] ? fieldData["general_applicant_child_a_number_3"] : "null"), 
                                    general_applicant_child_application_3:   (fieldData["general_applicant_child_application_3"] ? fieldData["general_applicant_child_application_3"]  : "null"),
                                    general_applicant_child_first_name_4:  (fieldData["general_applicant_child_first_name_4"] ? fieldData["general_applicant_child_first_name_4"]: "null"), 
                                    general_applicant_child_last_name_4:   (fieldData["general_applicant_child_last_name_4"] ? fieldData["general_applicant_child_last_name_4"]: "null"), 
                                    general_applicant_child_middle_name_4:  (fieldData["general_applicant_child_middle_name_4"] ? fieldData["general_applicant_child_middle_name_4"]  : "null"), 
                                    general_applicant_child_relationship_4:  (fieldData["general_applicant_child_relationship_4"] ? fieldData["general_applicant_child_relationship_4"]  : "null"), 
                                    general_applicant_child_dob_4:   (fieldData["general_applicant_child_dob_4"] ? fieldData["general_applicant_child_dob_4"] : "null"), 
                                    general_applicant_child_cob_4:  (fieldData["general_applicant_child_cob_4"] ? fieldData["general_applicant_child_cob_4"] : "null"), 
                                    general_applicant_child_a_number_4:  (fieldData["general_applicant_child_a_number_4"] ? fieldData["general_applicant_child_a_number_4"] : "null"),
                                    general_applicant_child_application_4:   (fieldData["general_applicant_child_application_4"] ? fieldData["general_applicant_child_application_4"] : "null"),
                                    general_applicant_child_first_name_5:  (fieldData["general_applicant_child_first_name_5"] ? fieldData["general_applicant_child_first_name_5"]  : "null"), 
                                    general_applicant_child_last_name_5:  (fieldData["general_applicant_child_last_name_5"] ? fieldData["general_applicant_child_last_name_5"] : "null"),
                                    general_applicant_child_middle_name_5:  (fieldData["general_applicant_child_middle_name_5"] ? fieldData["general_applicant_child_middle_name_5"] : "null"), 
                                    general_applicant_child_relationship_5:  (fieldData["general_applicant_child_relationship_5"] ? fieldData["general_applicant_child_relationship_5"] : "null"), 
                                    general_applicant_child_dob_5:  (fieldData["general_applicant_child_dob_5"] ? fieldData["general_applicant_child_dob_5"] : "null"), 
                                    general_applicant_child_cob_5:  (fieldData["general_applicant_child_cob_5"] ? fieldData["general_applicant_child_cob_5"]: "null"), 
                                    general_applicant_child_a_number_5:  (fieldData["general_applicant_child_a_number_5"] ? fieldData["general_applicant_child_a_number_5"] : "null"), 
                                    general_applicant_child_application_5:  (fieldData["general_applicant_child_application_5"] ? fieldData["general_applicant_child_application_5"]: "null"), 
                                    general_applicant_first_name:  (fieldData["general_applicant_first_name"] ? fieldData["general_applicant_first_name"] : "null"), 
                                    general_applicant_last_name:  (fieldData["general_applicant_last_name"] ? fieldData["general_applicant_last_name"] : "null"), 
                                    general_applicant_middle_name:   (fieldData["general_applicant_middle_name"] ? fieldData["general_applicant_middle_name"] : "null"), 
                                    general_applicant_other_name:  (fieldData["general_applicant_other_name"] ? fieldData["general_applicant_other_name"]  : "null"), 
                                    general_applicant_street:   (fieldData["general_applicant_street"] ? fieldData["general_applicant_street"]  : "null"), 
                                    general_applicant_apt_suit:    (fieldData["general_applicant_apt_suit"] ? fieldData["general_applicant_apt_suit"]: "null"), 
                                    general_applicant_city:  (fieldData["general_applicant_city"] ? fieldData["general_applicant_city"]: "null"), 
                                    general_applicant_state:  (fieldData["general_applicant_state"] ? fieldData["general_applicant_state"]: "null"), 
                                    general_applicant_country:  (fieldData["general_applicant_country"] ? fieldData["general_applicant_country"]: "null"),
                                    general_applicant_zip_code:  (fieldData["general_applicant_zip_code"] ? fieldData["general_applicant_zip_code"] : "null"), 
                                    general_applicant_co:  (fieldData["general_applicant_co"] ? fieldData["general_applicant_co"] : "null"), 
                                    general_applicant_phone:  (fieldData["general_applicant_phone"] ? fieldData["general_applicant_phone"]  : "null"), 
                                    general_applicant_dob:  (fieldData["general_applicant_dob"] ? fieldData["general_applicant_dob"]: "null"), 
                                    general_applicant_pob_town:  (fieldData["general_applicant_pob_town"] ? fieldData["general_applicant_pob_town"]: "null"), 
                                    general_applicant_pob_state:  (fieldData["general_applicant_pob_state"] ? fieldData["general_applicant_pob_state"]: "null"), 
                                    general_applicant_pob_country:  (fieldData["general_applicant_pob_country"] ? fieldData["general_applicant_pob_country"]: "null"), 
                                    general_applicant_nationality:  (fieldData["general_applicant_nationality"] ? fieldData["general_applicant_nationality"]: "null"), 
                                    general_applicant_gender_male:   (fieldData["general_applicant_gender_male"] ? fieldData["general_applicant_gender_male"]: "null"), 
                                    general_applicant_gender_female:   (fieldData["general_applicant_gender_female"] ? fieldData["general_applicant_gender_female"]: "null"), 
                                    general_applicant_marital_status_married:   (fieldData["general_applicant_marital_status_married"] ? fieldData["general_applicant_marital_status_married"] : "null"), 
                                    general_applicant_ssn:  (fieldData["general_applicant_ssn"] ? fieldData["general_applicant_ssn"]: "null"), 
                                    general_applicant_alien_number:  (fieldData["general_applicant_alien_number"] ? fieldData["general_applicant_alien_number"]: "null"),
                                    general_applicant_i_94:  (fieldData["general_applicant_i_94"] ? fieldData["general_applicant_i_94"]: "null"), 
                                    general_applicant_date_of_last_arrival:  (fieldData["general_applicant_date_of_last_arrival"] ? fieldData["general_applicant_date_of_last_arrival"]: "null"), 
                                    general_applicant_uscis_status:  (fieldData["general_applicant_uscis_status"] ? fieldData["general_applicant_uscis_status"]: "null"),
                                    general_applicant_status_expiration_date:  (fieldData["general_applicant_status_expiration_date"] ? fieldData["general_applicant_status_expiration_date"] : "null"), 
                                    general_applicant_visa_number:  (fieldData["general_applicant_visa_number"] ? fieldData["general_applicant_visa_number"]  : "null"), 
                                    general_applicant_last_entry:  (fieldData["general_applicant_last_entry"] ? fieldData["general_applicant_last_entry"] : "null"), 
                                    general_applicant_place_of_last_entry:   (fieldData["general_applicant_place_of_last_entry"] ? fieldData["general_applicant_place_of_last_entry"]: "null"),
                                    general_applicant_consulate:  (fieldData["general_applicant_consulate"] ? fieldData["general_applicant_consulate"]: "null"), 
                                    general_applicant_entry_inspection:  (fieldData["general_applicant_entry_inspection"] ? fieldData["general_applicant_entry_inspection"]: "null"),
                                    general_applicant_date_present_marriage:  (fieldData["general_applicant_date_present_marriage"] ? fieldData["general_applicant_date_present_marriage"]  : "null"),
                                    general_applicant_place_present_marriage:  (fieldData["general_applicant_place_present_marriage"] ? fieldData["general_applicant_place_present_marriage"]: "null"),
                                    general_applicant_spouse_first_name:  (fieldData["general_applicant_spouse_first_name"] ? fieldData["general_applicant_spouse_first_name"] : "null"), 
                                    general_applicant_spouse_last_name:  (fieldData["general_applicant_spouse_last_name"] ? fieldData["general_applicant_spouse_last_name"]: "null"), 
                                    general_applicant_spouse_middle_name:   (fieldData["general_applicant_spouse_middle_name"] ?fieldData["general_applicant_spouse_middle_name"] : "null"), 
                                    general_applicant_spouse_relationship:  (fieldData["general_applicant_spouse_relationship"] ? fieldData["general_applicant_spouse_relationship"]: "null"), 
                                    general_applicant_spouse_dob:   (fieldData["general_applicant_spouse_dob"] ? fieldData["general_applicant_spouse_dob"]: "null"), 
                                    general_applicant_spouse_cob:   (fieldData["general_applicant_spouse_cob"] ? fieldData["general_applicant_spouse_cob"] : "null"), 
                                    general_applicant_spouse_a_number:  (fieldData["general_applicant_spouse_a_number"] ? fieldData["general_applicant_spouse_a_number"] : "null"), 
                                    general_applicant_spouse_application:  (fieldData["general_applicant_spouse_application"] ? fieldData["general_applicant_spouse_application"]: "null"), 
                                    general_applicant_marital_status_single:   (fieldData["general_applicant_marital_status_single"] ? fieldData["general_applicant_marital_status_single"]: "null"),
                                    general_applicant_marital_status_widowed:  (fieldData["general_applicant_marital_status_widowed"] ? fieldData["general_applicant_marital_status_widowed"]: "null"), 
                                    general_applicant_marital_status_divorced: (fieldData["general_applicant_marital_status_divorced"] ? fieldData["general_applicant_marital_status_divorced"] : "null")
                              },

                            i130: 
                              {
                                    i130_adoption: (fieldData["i130_adoption"]? fieldData["i130_adoption"]: "null"),
                                    i130_residence_through_adoption: (fieldData["i130_residence_through_adoption"]? fieldData["i130_residence_through_adoption"]: "null"),
                                    i130_sponsor_first_name: (fieldData["i130_sponsor_first_name"]? fieldData["i130_sponsor_first_name"]: "null"),
                                    i130_sponsor_last_name: (fieldData["i130_sponsor_last_name"]? fieldData["i130_sponsor_last_name"]: "null"),
                                    i130_sponsor_middle_name: (fieldData["i130_sponsor_middle_name"]? fieldData["i130_sponsor_middle_name"]: "null"),
                                    i130_sponsor_other_name: (fieldData["i130_sponsor_other_name"]? fieldData["i130_sponsor_other_name"]: "null"),
                                    i130_sponsor_street: (fieldData["i130_sponsor_street"]? fieldData["i130_sponsor_street"]: "null"),
                                    i130_sponsor_apt_suit:  (fieldData["i130_sponsor_apt_suit"]? fieldData["i130_sponsor_apt_suit"]: "null"),
                                    i130_sponsor_city: (fieldData["i130_sponsor_city"]? fieldData["i130_sponsor_city"]: "null"),
                                    i130_sponsor_state: (fieldData["i130_sponsor_state"]? fieldData["i130_sponsor_state"]: "null"),
                                    i130_sponsor_country: (fieldData["i130_sponsor_country"]? fieldData["i130_sponsor_country"] : "null"),
                                    i130_sponsor_zip_code:  (fieldData["i130_sponsor_zip_code"]? fieldData["i130_sponsor_zip_code"]: "null"),
                                    i130_sponsor_co: (fieldData["i130_sponsor_co"]? fieldData["i130_sponsor_co"]: "null"),
                                    i130_sponsor_phone: (fieldData["i130_sponsor_phone"]? fieldData["i130_sponsor_phone"]: "null"),
                                    i130_sponsor_dob:  (fieldData["i130_sponsor_dob"]? fieldData["i130_sponsor_dob"]: "null"),
                                    i130_sponsor_pob_town:  (fieldData["i130_sponsor_pob_town"]? fieldData["i130_sponsor_pob_town"]: "null"),
                                    i130_sponsor_pob_state: (fieldData["i130_sponsor_pob_state"]? fieldData["i130_sponsor_pob_state"]: "null"),
                                    i130_sponsor_pob_country: (fieldData["i130_sponsor_pob_country"]? fieldData["i130_sponsor_pob_country"]: "null"),
                                    i130_sponsor_nationality:  (fieldData["i130_sponsor_nationality"]? fieldData["i130_sponsor_nationality"]: "null"),
                                    i130_sponsor_gender_male: (fieldData["i130_sponsor_gender_male"]? fieldData["i130_sponsor_gender_male"]: "null"),
                                    i130_sponsor_gender_female: (fieldData["i130_sponsor_gender_female"]? fieldData["i130_sponsor_gender_female"]: "null"),
                                    i130_sponsor_marital_status_married: (fieldData["i130_sponsor_marital_status_married"]? fieldData["i130_sponsor_marital_status_married"]: "null"),
                                    i130_sponsor_marital_status_widowed: (fieldData["i130_sponsor_marital_status_widowed"]? fieldData["i130_sponsor_marital_status_widowed"]: "null"),
                                    i130_sponsor_marital_status_single:  (fieldData["i130_sponsor_marital_status_single"]? fieldData["i130_sponsor_marital_status_single"]: "null"),
                                    i130_sponsor_marital_status_divorced: (fieldData["i130_sponsor_marital_status_divorced"]? fieldData["i130_sponsor_marital_status_divorced"]: "null"),
                                    i130_sponsor_ssn: (fieldData["i130_sponsor_ssn"]? fieldData["i130_sponsor_ssn"]: "null"),
                                    i130_sponsor_a_registration_number: (fieldData["i130_sponsor_a_registration_number"]? fieldData["i130_sponsor_a_registration_number"]: "null"),
                                    i130_sponsor_date_of_present_marriage:  (fieldData["i130_sponsor_date_of_present_marriage"]? fieldData["i130_sponsor_date_of_present_marriage"]: "null"),
                                    i130_sponsor_place_of_present_marriage: (fieldData["i130_sponsor_place_of_present_marriage"]? fieldData["i130_sponsor_place_of_present_marriage"]: "null"),
                                    i130_sponsor_name_of_prior_spouse: (fieldData["i130_sponsor_name_of_prior_spouse"]? fieldData["i130_sponsor_name_of_prior_spouse"]: "null"),
                                    i130_sponsor_date_of_end_of_prior_marriage: (fieldData["i130_sponsor_date_of_end_of_prior_marriage"]? fieldData["i130_sponsor_date_of_end_of_prior_marriage"]: "null"),
                                    i130_sponsor_citizenship_birth:(fieldData["i130_sponsor_citizenship_birth"]? fieldData["i130_sponsor_citizenship_birth"]: "null"),
                                    i130_sponsor_citizenship_naturalization: (fieldData["i130_sponsor_citizenship_naturalization"]? fieldData["i130_sponsor_citizenship_naturalization"]: "null"),
                                    i130_sponsor_naturalization_number: (fieldData["i130_sponsor_naturalization_number"]? fieldData["i130_sponsor_naturalization_number"]: "null"),
                                    i130_sponsor_naturalization_place_of_issuance: (fieldData["i130_sponsor_naturalization_place_of_issuance"]? fieldData["i130_sponsor_naturalization_place_of_issuance"]: "null"),
                                    i130_sponsor_pr_date_of_admission:  (fieldData["i130_sponsor_pr_date_of_admission"]? fieldData["i130_sponsor_pr_date_of_admission"] : "null"),
                                    i130_sponsor_pr_place_of_admission: (fieldData["i130_sponsor_pr_place_of_admission"]? fieldData["i130_sponsor_pr_place_of_admission"]: "null"),
                                    i130_sponsor_pr_class_of_admission: (fieldData["i130_sponsor_pr_class_of_admission"]? fieldData["i130_sponsor_pr_class_of_admission"]: "null"),
                                    i130_sponsored_intended_residence_adddress: (fieldData["i130_sponsored_intended_residence_adddress"]? fieldData["i130_sponsored_intended_residence_adddress"]: "null"),
                                    i130_sponsored_intended_residence_city: (fieldData["i130_sponsored_intended_residence_city"]? fieldData["i130_sponsored_intended_residence_city"] : "null"),
                                    i130_sponsored_intended_residence_state: (fieldData["i130_sponsored_intended_residence_state"]? fieldData["i130_sponsored_intended_residence_state"]: "null"),
                                    i130_sponsored_full_address_abroad:  (fieldData["i130_sponsored_full_address_abroad"]? fieldData["i130_sponsored_full_address_abroad"]: "null"),
                                    i130_sponsored_full_address_native_language: (fieldData["i130_sponsored_full_address_native_language"]? fieldData["i130_sponsored_full_address_native_language"]: "null"),
                                    i130_sponsored_name_native_language: (fieldData["i130_sponsored_name_native_language"]? fieldData["i130_sponsored_name_native_language"] : "null"),
                                    i130_spouse: (fieldData["i130_spouse"]? fieldData["i130_spouse"]: "null"),
                                    i130_parent: (fieldData['i130_parent']? fieldData['i130_parent']: "null"),
                                    i130_BrotherSister: (fieldData['i130_BrotherSister']? fieldData['i130_BrotherSister'] : "null"),
                                    i130_child: (fieldData['i130_child'] ? fieldData['i130_child']  : "null")
                            },

                            i765: {
                                    i765_previous_application: (fieldData["i765_previous_application"]? fieldData["i765_previous_application"]: "null"),
                                    i765_office: (fieldData["i765_office"]? fieldData["i765_office"]: "null"),
                                    i765_date_of_previous_application: (fieldData["i765_date_of_previous_application"]? fieldData["i765_date_of_previous_application"] : "null"), 
                                    i765_result_of_previous_application: (fieldData["i765_result_of_previous_application"]? fieldData["i765_result_of_previous_application"]: "null"),
                                    i765_application_employment: (fieldData["i765_application_employment"]? fieldData["i765_application_employment"]: "null"),
                                    i765_application_replacement:  (fieldData["i765_application_replacement"]? fieldData["i765_application_replacement"]: "null"),
                                    i765_application_renewal:  (fieldData["i765_application_renewal"]? fieldData["i765_application_renewal"]: "null")
                            },

                            i485: {
                                    i485_applicant_visa_number_availability: (fieldData["i485_applicant_visa_number_availability"]? fieldData["i485_applicant_visa_number_availability"] : "null"),
                                    i485_applicant_visa_derivative_status: (fieldData["i485_applicant_visa_derivative_status"]? fieldData["i485_applicant_visa_derivative_status"] : "null"),
                                    i485_applicant_current_occupation: (fieldData["i485_applicant_current_occupation"]? fieldData["i485_applicant_current_occupation"] : "null"),
                                    i485_applicant_mother_first_name: (fieldData["i485_applicant_mother_first_name"]? fieldData["i485_applicant_mother_first_name"] : "null"),
                                    i485_applicant_father_first_name: (fieldData["i485_applicant_father_first_name"]? fieldData["i485_applicant_father_first_name"] : "null"),
                                    i485_applicant_i94_exact_name: (fieldData["i485_applicant_i94_exact_name"]? fieldData["i485_applicant_i94_exact_name"] : "null"),
                                    i485_applicant_previous_application: (fieldData["i485_applicant_previous_application"]? fieldData["i485_applicant_previous_application"] : "null"),
                                    i485_previous_filing_deposition: (fieldData["i485_previous_filing_deposition"]? fieldData["i485_previous_filing_deposition"] : "null")
                            }

                         };

                         formFieldData.$save();  

  }; // end of service.getData function

  return service;

}]); // End of ProcessForm Factory 
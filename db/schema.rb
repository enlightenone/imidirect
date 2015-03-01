# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150301004825) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "app_forms", force: :cascade do |t|
    t.integer  "form_id"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "app_forms", ["application_id"], name: "index_app_forms_on_application_id", using: :btree
  add_index "app_forms", ["form_id"], name: "index_app_forms_on_form_id", using: :btree

  create_table "applications", force: :cascade do |t|
    t.string   "app_id"
    t.string   "description"
    t.float    "fee"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "cases", force: :cascade do |t|
    t.string   "case_id"
    t.string   "description"
    t.float    "total"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "application_id"
  end

  add_index "cases", ["application_id"], name: "index_cases_on_application_id", using: :btree
  add_index "cases", ["user_id"], name: "index_cases_on_user_id", using: :btree

  create_table "documents", force: :cascade do |t|
    t.string   "description"
    t.integer  "form_id"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "documents", ["application_id"], name: "index_documents_on_application_id", using: :btree
  add_index "documents", ["form_id"], name: "index_documents_on_form_id", using: :btree

  create_table "forms", force: :cascade do |t|
    t.string   "form_id"
    t.string   "form_name"
    t.string   "description"
    t.float    "fee"
    t.string   "path"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "general_informations", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "general_applicant_child_first_name_1"
    t.string   "general_applicant_child_last_name_1"
    t.string   "general_applicant_child_middle_name_1"
    t.string   "general_applicant_child_relationship_1"
    t.string   "general_applicant_child_dob_1"
    t.string   "general_applicant_child_cob_1"
    t.string   "general_applicant_child_a_number_1"
    t.string   "general_applicant_child_application_1"
    t.string   "general_applicant_child_first_name_2"
    t.string   "general_applicant_child_last_name_2"
    t.string   "general_applicant_child_middle_name_2"
    t.string   "general_applicant_child_relationship_2"
    t.string   "general_applicant_child_dob_2"
    t.string   "general_applicant_child_cob_2"
    t.string   "general_applicant_child_a_number_2"
    t.string   "general_applicant_child_application_2"
    t.string   "general_applicant_child_first_name_3"
    t.string   "general_applicant_child_last_name_3"
    t.string   "general_applicant_child_middle_name_3"
    t.string   "general_applicant_child_relationship_3"
    t.string   "general_applicant_child_dob_3"
    t.string   "general_applicant_child_cob_3"
    t.string   "general_applicant_child_a_number_3"
    t.string   "general_applicant_child_application_3"
    t.string   "general_applicant_child_first_name_4"
    t.string   "general_applicant_child_last_name_4"
    t.string   "general_applicant_child_middle_name_4"
    t.string   "general_applicant_child_relationship_4"
    t.string   "general_applicant_child_dob_4"
    t.string   "general_applicant_child_cob_4"
    t.string   "general_applicant_child_a_number_4"
    t.string   "general_applicant_child_application_4"
    t.string   "general_applicant_child_first_name_5"
    t.string   "general_applicant_child_last_name_5"
    t.string   "general_applicant_child_middle_name_5"
    t.string   "general_applicant_child_relationship_5"
    t.string   "general_applicant_child_dob_5"
    t.string   "general_applicant_child_cob_5"
    t.string   "general_applicant_child_a_number_5"
    t.string   "general_applicant_child_application_5"
  end

  add_index "general_informations", ["case_id"], name: "index_general_informations_on_case_id", using: :btree

  create_table "i130s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "i130_my_relative"
    t.string   "i130_adoption"
    t.string   "i130_residence_through_adoption"
    t.string   "i130_sponsor_first_name"
    t.string   "i130_sponsor_last_name"
    t.string   "i130_sponsor_middle_name"
    t.string   "i130_sponsor_other_name"
    t.string   "i130_sponsor_street"
    t.string   "i130_sponsor_apt_suit"
    t.string   "i130_sponsor_city"
    t.string   "i130_sponsor_state"
    t.string   "i130_sponsor_country"
    t.string   "i130_sponsor_zip_code"
    t.string   "i130_sponsor_co"
    t.string   "i130_sponsor_phone"
    t.string   "i130_sponsor_dob"
    t.string   "i130_sponsor_pob_town"
    t.string   "i130_sponsor_pob_state"
    t.string   "i130_sponsor_pob_country"
    t.string   "i130_sponsor_nationality"
    t.string   "i130_sponsor_gender_male"
    t.string   "i130_sponsor_gender_female"
    t.string   "i130_sponsor_marital_status_married"
    t.string   "i130_sponsor_marital_status_widowed"
    t.string   "i130_sponsor_marital_status_single"
    t.string   "i130_sponsor_marital_status_divorced"
    t.string   "i130_sponsor_ssn"
    t.string   "i130_sponsor_a_registration_number"
    t.string   "i130_sponsor_date_of_present_marriage"
    t.string   "i130_sponsor_place_of_present_marriage"
    t.string   "i130_sponsor_name_of_prior_spouse"
    t.string   "i130_sponsor_date_of_end_of_prior_marriage"
    t.string   "i130_sponsor_citizenship_birth"
    t.string   "i130_sponsor_citizenship_naturalization"
    t.string   "i130_sponsor_naturalization_number"
    t.string   "i130_sponsor_naturalization_place_of_issuance"
    t.string   "i130_sponsor_pr_date_of_admission"
    t.string   "i130_sponsor_pr_place_of_admission"
    t.string   "i130_sponsor_pr_class_of_admission"
    t.string   "i130_sponsored_intended_residence_adddress"
    t.string   "i130_sponsored_intended_residence_city"
    t.string   "i130_sponsored_intended_residence_state"
    t.string   "i130_sponsored_full_address_abroad"
    t.string   "i130_sponsored_full_address_native_language"
    t.string   "i130_sponsored_name_native_language"
  end

  add_index "i130s", ["case_id"], name: "index_i130s_on_case_id", using: :btree

  create_table "i131s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "i131s", ["case_id"], name: "index_i131s_on_case_id", using: :btree

  create_table "i485s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "i485_application_type"
    t.string   "i485_applicant_current_occupation"
    t.string   "i485_applicant_mother_first_name"
    t.string   "i485_applicant_father_first_name"
    t.string   "i485_applicant_i94_exact_name"
  end

  add_index "i485s", ["case_id"], name: "index_i485s_on_case_id", using: :btree

  create_table "i765s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "i765_application_type"
    t.string   "i765_previous_application"
    t.string   "i765_office"
    t.string   "i765_date_of_previous_application"
    t.string   "i765_result_of_previous_application"
  end

  add_index "i765s", ["case_id"], name: "index_i765s_on_case_id", using: :btree

  create_table "options", force: :cascade do |t|
    t.string   "form_id"
    t.string   "form"
    t.boolean  "include"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "options", ["case_id"], name: "index_options_on_case_id", using: :btree

  create_table "statuses", force: :cascade do |t|
    t.boolean  "filling"
    t.boolean  "payment"
    t.boolean  "complete"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "statuses", ["case_id"], name: "index_statuses_on_case_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "app_forms", "applications"
  add_foreign_key "app_forms", "forms"
  add_foreign_key "cases", "applications"
  add_foreign_key "cases", "users"
  add_foreign_key "documents", "applications"
  add_foreign_key "documents", "forms"
  add_foreign_key "general_informations", "cases"
  add_foreign_key "i130s", "cases"
  add_foreign_key "i131s", "cases"
  add_foreign_key "i485s", "cases"
  add_foreign_key "i765s", "cases"
  add_foreign_key "options", "cases"
  add_foreign_key "statuses", "cases"
end

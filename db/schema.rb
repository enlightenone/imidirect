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

ActiveRecord::Schema.define(version: 20150227013618) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cases", force: :cascade do |t|
    t.string   "case_id"
    t.string   "description"
    t.float    "total"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "cases", ["user_id"], name: "index_cases_on_user_id", using: :btree

  create_table "form_informations", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "form_informations", ["case_id"], name: "index_form_informations_on_case_id", using: :btree

  create_table "general_informations", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "general_informations", ["case_id"], name: "index_general_informations_on_case_id", using: :btree

  create_table "i130s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "i485s", ["case_id"], name: "index_i485s_on_case_id", using: :btree

  create_table "i765s", force: :cascade do |t|
    t.string   "address"
    t.integer  "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  add_foreign_key "cases", "users"
  add_foreign_key "form_informations", "cases"
  add_foreign_key "general_informations", "cases"
  add_foreign_key "i130s", "cases"
  add_foreign_key "i131s", "cases"
  add_foreign_key "i485s", "cases"
  add_foreign_key "i765s", "cases"
  add_foreign_key "options", "cases"
  add_foreign_key "statuses", "cases"
end

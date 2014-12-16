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

ActiveRecord::Schema.define(version: 20141216001518) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "divetype_taggings", force: true do |t|
    t.integer  "entry_id",    null: false
    t.integer  "divetype_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "divetype_taggings", ["divetype_id"], name: "index_divetype_taggings_on_divetype_id", using: :btree
  add_index "divetype_taggings", ["entry_id", "divetype_id"], name: "index_divetype_taggings_on_entry_id_and_divetype_id", unique: true, using: :btree
  add_index "divetype_taggings", ["entry_id"], name: "index_divetype_taggings_on_entry_id", using: :btree

  create_table "divetypes", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "divetypes", ["name"], name: "index_divetypes_on_name", unique: true, using: :btree

  create_table "entries", force: true do |t|
    t.integer  "user_id",       null: false
    t.string   "title",         null: false
    t.text     "body",          null: false
    t.integer  "divenum"
    t.string   "location_name"
    t.string   "longitude"
    t.string   "latitude"
    t.integer  "vis"
    t.integer  "watertemp"
    t.integer  "airtemp"
    t.integer  "divetime"
    t.integer  "maxdepth"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "current"
    t.string   "weather"
    t.integer  "avgdepth"
    t.string   "surface"
    t.datetime "entrytime"
  end

  add_index "entries", ["user_id"], name: "index_entries_on_user_id", using: :btree

  create_table "images", force: true do |t|
    t.string   "filename"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.string   "mimetype"
    t.integer  "size"
    t.string   "key"
    t.boolean  "isWritable"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "primary",        default: false
    t.string   "l_url"
    t.string   "m_url"
    t.string   "s_url"
  end

  add_index "images", ["imageable_id"], name: "index_images_on_imageable_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",         null: false
    t.string   "pwdigest",      null: false
    t.string   "session_token", null: false
    t.string   "location"
    t.integer  "age"
    t.string   "exp"
    t.integer  "numdives"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "fname"
    t.string   "lname"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end

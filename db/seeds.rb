# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

divetypes = Divetype.create([{ name: "Fun" }, { name: "Night" }, { name: "Drift" }, { name: "Cave" },
  { name: "Photography" }, { name: "Ice" }, { name: "Research" }, { name: "Search"}, { name: "Rescue" },
  { name: "Retrieval" }, { name: "Instruction" }, { name: "Exploration" } ])
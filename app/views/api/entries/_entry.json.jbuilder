json.(entry, :id, :title, :body, :divenum, :location_name, :longitude, :latitude, :vis, :watertemp, :airtemp, :divetime, :maxdepth, :divetype, :current, :weather, :avgdepth, :entrytime, :entrydate)

user ||= nil
unless user.nil?
	json.user(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname)
end
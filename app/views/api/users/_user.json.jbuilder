json.(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname)

json.image user.images.last

json.entries user.entries, :title, :body, :divenum, :location_name, :longitude, :latitude, :vis, :watertemp, :airtemp, :divetime, :maxdepth, :divetype, :current, :weather, :avgdepth, :entrytime, :entrydate, :surface
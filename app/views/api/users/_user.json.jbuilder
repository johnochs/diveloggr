json.(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname, :guest, :created_at)

json.image user.images.last

json.entries user.entries, :id, :title, :body, :divenum, :location_name, :longitude, :latitude, :vis, :watertemp, :airtemp, :divetime, :maxdepth, :divetype_ids, :current, :weather, :avgdepth, :entrytime, :surface
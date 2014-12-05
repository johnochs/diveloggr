json.(entry, :id, :user_id, :title, :body, :divenum, :location_name, :longitude, :latitude, :vis, :watertemp, :airtemp, :divetime, :maxdepth, :divetype, :current, :weather, :avgdepth, :entrytime, :entrydate, :surface)

json.user entry.user, :id, :fname, :lname

json.images entry.images, :id, :filename, :s_url, :m_url, :l_url, :imageable_id, :primary
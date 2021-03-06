json.(entry, :id, :user_id, :title, :body, :divenum, :location_name, :longitude, :latitude, :vis, :watertemp, :airtemp, :divetime, :maxdepth, :current, :weather, :avgdepth, :entrytime, :surface)

json.divetype_ids entry.divetype_ids

json.user entry.user, :id, :fname, :lname, :location, :age, :exp, :numdives, :created_at, :updated_at, :s_url, :m_url

json.images entry.images, :id, :filename, :s_url, :m_url, :l_url, :imageable_id, :primary
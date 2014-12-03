json.(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname)

json.images user.images, :id, :filename, :url, :imageable_id, :primary
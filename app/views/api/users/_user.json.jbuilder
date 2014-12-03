json.(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname)

if user.images != []
	json.image(user.images.last, :id, :filename, :url, :imageable_id, :primary)
end
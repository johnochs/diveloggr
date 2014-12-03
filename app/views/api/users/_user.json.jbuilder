json.(user, :id, :email, :location, :age, :exp, :numdives, :fname, :lname)

unless user.images.empty?
	json.image_url user.images.last.m_url
end
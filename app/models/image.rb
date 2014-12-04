class Image < ActiveRecord::Base
  
  validates :imageable_id, :imageable_type, :l_url, presence: true
  
  belongs_to :imageable, polymorphic: true
  
end

class Image < ActiveRecord::Base
  
  validates :filename, :imageable_id, :imageable_type, :url, 
                presence: true
  
  belongs_to :imageable, polymorphic: true
end

class Entry < ActiveRecord::Base
  validates :user_id, :title, :body, :entrydate, presence: true
  
  belongs_to :user
  
  has_many :images, as: :imageable
end

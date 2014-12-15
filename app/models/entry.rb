class Entry < ActiveRecord::Base
  validates :user_id, :title, :body, :entrytime, presence: true
  
  belongs_to :user
  
  has_many :images, as: :imageable, dependent: :destroy
  
  has_many :divetype_taggings, dependent: :destroy
  
  has_many :divetypes, through: :divetype_taggings
end

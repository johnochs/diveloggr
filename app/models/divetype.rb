class Divetype < ActiveRecord::Base
  has_many :divetype_taggings, dependent: :destroy
  has_many :entries, through: :divetype_taggings
  
  validates :name, presence: true
  validates :name, uniqueness: true
end
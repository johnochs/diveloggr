class Divetype_Tagging < ActiveRecord::Base
  belongs_to :divetype
  belongs_to :entry
  
  validates :entry_id, :divetype_id, presence: true
  validates :divetype_id, uniqueness: { scope: :entry_id }
end
class DivetypeTagging < ActiveRecord::Base
  belongs_to :divetype
  belongs_to :entry
  
  validates :entry, :divetype_id, presence: true
  validates :divetype_id, uniqueness: { scope: :entry_id }
end
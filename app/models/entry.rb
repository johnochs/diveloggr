class Entry < ActiveRecord::Base
  validates :user_id, :title, :body, :logdate, presence: true
  
  belongs_to :user
end

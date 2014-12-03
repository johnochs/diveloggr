# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  fname         :string(255)      not null
#  lname         :string(255)      not null
#  email         :string(255)      not null
#  pwdigest      :string(255)      not null
#  session_token :string(255)      not null
#  location      :string(255)
#  age           :integer
#  exp           :integer
#  numdives      :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class User < ActiveRecord::Base
  validates :email, :pwdigest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  attr_reader :password
  
  after_initialize :ensure_token
  
  has_many :entries
  
  has_many :images, as: :imageable  #has_many association for possible later "tagging"
  
  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.valid_password?(password) ? user : nil
  end
  
  def reset_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save
    self.session_token
  end
  
  def password=(password)
    @password = password
    self.pwdigest = BCrypt::Password.create(password)
  end
  
  def valid_password?(password)
    BCrypt::Password.new(self.pwdigest).is_password?(password)
  end
  
  private
  
  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end

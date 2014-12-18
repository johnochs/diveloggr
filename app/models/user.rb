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
  validates :email, :pwdigest, presence: true, unless: :guest?
  validates :session_token, presence: true
  validates :email, uniqueness: true, unless: :guest?
  validates :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  attr_reader :password
  
  after_initialize :ensure_token
  
  has_many :entries, dependent: :destroy
  
  has_many :images, as: :imageable, dependent: :destroy  #has_many association for possible later "tagging"
  
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
  
  def s_url
    if self.images.last
      return self.images.last.s_url
    end
    "https://s3-us-west-1.amazonaws.com/diveloggrimagable/default-profile.jpg"
  end
  
  def m_url
    if self.images.last
      return self.images.last.m_url
    end
    "https://s3-us-west-1.amazonaws.com/diveloggrimagable/default-profile.jpg"
  end
  
  def self.new_guest
    new { |u| u.guest = true; u.fname = "Guest"; u.lname = "User" }
  end
  
  private
  
  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end

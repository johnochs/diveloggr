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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

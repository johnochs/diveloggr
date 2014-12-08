class ChangeExpToString < ActiveRecord::Migration
  def up
    change_column :users, :exp, :string
  end
  
  def down
    change_column :users, :exp, :integer
  end
end

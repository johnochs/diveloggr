class ChangeUsers < ActiveRecord::Migration
  def up
    remove_column :users, :fname
    remove_column :users, :lname
    add_column :users, :fname, :string
    add_column :users, :lname, :string
  end
  
  def down
    remove_column :users, :fname
    remove_column :users, :lname
    add_column :users, :fname, :string, null: false
    add_column :users, :lname, :string, null: false
  end
end

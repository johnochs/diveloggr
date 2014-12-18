class RemoveNullConstraintFromUsersPwdigest < ActiveRecord::Migration
  def change
    change_column :users, :pwdigest, :string, :null => true
  end
end

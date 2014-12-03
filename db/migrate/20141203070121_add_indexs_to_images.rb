class AddIndexsToImages < ActiveRecord::Migration
  def change
    add_index :images, :imagable_id
  end
end

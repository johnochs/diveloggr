class AddSurfaceToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :surface, :string
  end
end

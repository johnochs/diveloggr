class EntriesChangeLatLong < ActiveRecord::Migration
  def up
    change_column :entries, :latitude, :string
    change_column :entries, :longitude, :string
  end
  
  def down
    change_column :entries, :latitude, :decimal
    change_column :entries, :longitude, :decimal
  end
end

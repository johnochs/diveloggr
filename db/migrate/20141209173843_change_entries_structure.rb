class ChangeEntriesStructure < ActiveRecord::Migration
  def up
    remove_column :entries, :entrytime
    remove_column :entries, :entrydate
    add_column :entries, :entrytime, :datetime
  end
  
  def down
    remove_column :entries, :entrytime
    add_column :entries, :entrydate, :date
    add_column :entries, :entrytime, :time
  end
end

class ChangeEntries < ActiveRecord::Migration
  def change
    remove_column :entries, :logdate
    
    add_column :entries, :divetype, :string
    add_column :entries, :current, :string
    add_column :entries, :weather, :string
    add_column :entries, :avgdepth, :integer
    add_column :entries, :entrytime, :time
    add_column :entries, :entrydate, :date
  end
end

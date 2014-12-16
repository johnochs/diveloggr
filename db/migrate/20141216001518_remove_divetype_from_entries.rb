class RemoveDivetypeFromEntries < ActiveRecord::Migration
  def up
    remove_column :entries, :divetype
  end
  
  def down
    add_column :entries, :divetype, :string
  end
end

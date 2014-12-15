class ChangeDivetypeTaggings < ActiveRecord::Migration
  def up
    drop_table :divetype_tagging
    
    create_table :divetype_taggings do |t|
      t.integer :entry_id, null: false
      t.integer :divetype_id, null: false
      t.timestamps
    end
    
    add_index :divetype_taggings, :entry_id
    add_index :divetype_taggings, :divetype_id
    add_index :divetype_taggings, [:entry_id, :divetype_id], unique: true
    
  end
  
  def down
    drop_table :divetype_taggings
    
    create_table :divetype_tagging do |t|
      t.integer :user_id, null: false
      t.integer :divetype_id, null: false
      t.timestamps
    end
    
    add_index :divetype_tagging, :user_id
    add_index :divetype_tagging, :divetype_id
    add_index :divetype_tagging, [:user_id, :divetype_id], unique: true
  end
end

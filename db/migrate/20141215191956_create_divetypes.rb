class CreateDivetypes < ActiveRecord::Migration
  def change
    create_table :divetypes do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :divetypes, :name, unique: true
    
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

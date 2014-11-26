class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.integer :user_id, null: false
      
      t.string :title, null: false
      t.text :body, null: false
      
      t.datetime :logdate, null: false
      t.integer :divenum

      t.string :location_name
      t.decimal :longitude
      t.decimal :latitude
      
      t.integer :vis
      t.integer :watertemp
      t.integer :airtemp
      
      t.integer :divetime
      t.integer :maxdepth

      t.timestamps
    end
    add_index :entries, :user_id
  end
end

class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :filename
      t.integer :imagable_id
      t.string :imageable_type
      t.string :url
      t.string :mimetype
      t.integer :size
      t.string :key
      t.boolean :isWritable
      
      t.timestamps
    end
  end
end

class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.integer :imagable_id
      t.string :imageable_type
      t.string :image_url
      t.timestamps
    end
  end
end

class SpelledImageableWrong < ActiveRecord::Migration
  def change
    rename_column :images, :imagable_id, :imageable_id
  end
end

class ChangeImageableColumns < ActiveRecord::Migration
  def up
    remove_column :images, :url
    add_column :images, :l_url, :string
    add_column :images, :m_url, :string
    add_column :images, :s_url, :string
  end
  
  def down
    remove_column :images, :l_url
    remove_column :images, :m_url
    remove_column :images, :s_url
    add_column :images, :url, :string
  end
end

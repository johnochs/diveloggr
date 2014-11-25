class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, null: false, unique: true
      
      t.string :pwdigest, null: false
      t.string :session_token, null: false
      
      t.string :location
      t.integer :age
      t.integer :exp
      t.integer :numdives

      t.timestamps
    end
    add_index :users, :session_token
    add_index :users, :email
  end
end

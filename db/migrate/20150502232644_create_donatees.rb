class CreateDonatees < ActiveRecord::Migration
  def change
    create_table :donatees do |t|
      t.string :first_name
      t.string :last_name
      t.string :cell_phone
      t.string :email
      t.string :address1
      t.string :address2
      t.string :city
      t.string :state
      t.string :postal_code

      t.timestamps null: false
    end
  end
end

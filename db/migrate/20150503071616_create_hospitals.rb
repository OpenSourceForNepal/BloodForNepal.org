class CreateHospitals < ActiveRecord::Migration
  def change
    create_table :hospitals do |t|
      t.string :name
      t.string :address
      t.float :lat
      t.float :long
      t.string :phone
      t.string :category
      t.string :contact_person_name
      t.string :contact_person_type
      t.string :contact_person_email
      t.string :contact_person_phone

      t.timestamps null: false
    end
  end
end

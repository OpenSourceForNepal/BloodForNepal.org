class ChangeCommuteRadiusToFloat < ActiveRecord::Migration
  def change
    change_column :donors, :commute_radius, :float
  end
end

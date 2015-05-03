# == Schema Information
#
# Table name: donors
#
#  id          :integer          not null, primary key
#  first_name  :string
#  last_name   :string
#  cell_phone  :string
#  email       :string
#  street      :string
#  city        :string
#  state       :string
#  postal_code :string
#  lat         :float
#  long        :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Donor < ActiveRecord::Base
  geocoded_by :address, :latitude  => :lat, :longitude => :long
  after_validation :geocode

  def address
    [street, city, state, 'Nepal'].compact.join(', ')
  end
end

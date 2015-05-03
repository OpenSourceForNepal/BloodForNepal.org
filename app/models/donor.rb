# == Schema Information
#
# Table name: donors
#
#  id             :integer          not null, primary key
#  first_name     :string
#  last_name      :string
#  cell_phone     :string
#  email          :string
#  street         :string
#  city           :string
#  state          :string
#  postal_code    :string
#  country        :string           default("Nepal")
#  lat            :float
#  long           :float
#  commute_radius :integer          default(5)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Donor < ActiveRecord::Base
  geocoded_by :address, :latitude  => :lat, :longitude => :long
  after_validation :geocode
  has_one :blood_type

  def address
    [street, city, state, country].compact.join(', ')
  end
end

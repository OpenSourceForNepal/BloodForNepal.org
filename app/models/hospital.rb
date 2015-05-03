# == Schema Information
#
# Table name: hospitals
#
#  id                   :integer          not null, primary key
#  name                 :string
#  street               :string
#  city                 :string
#  state                :string
#  postal_code          :string
#  country              :string           default("Nepal")
#  lat                  :string
#  long                 :string
#  contact_person_name  :string
#  contact_person_email :string
#  contact_person_phone :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Hospital < ActiveRecord::Base
  geocoded_by :address, :latitude  => :lat, :longitude => :long
  after_validation :geocode
  has_and_belongs_to_many :blood_types

  def address
    [street, city, state, country].compact.join(', ')
  end
end

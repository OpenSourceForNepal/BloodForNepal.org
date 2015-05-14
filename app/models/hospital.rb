# == Schema Information
#
# Table name: hospitals
#
#  id                   :integer          not null, primary key
#  name                 :string
#  address              :string
#  lat                  :float
#  long                 :float
#  phone                :string
#  category             :string
#  contact_person_name  :string
#  contact_person_type  :string
#  contact_person_email :string
#  contact_person_phone :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Hospital < ActiveRecord::Base
  extend Enumerize
  geocoded_by :address, :latitude  => :lat, :longitude => :long
  before_validation :normalize_data
  after_validation :geo_code, if: ->(obj){ obj.address.present? and obj.address_changed? }
  has_and_belongs_to_many :blood_types

  enumerize :category, in: [:red_cross_society, :emergency_blood_transfusion, :hospital_based, :other]
  enumerize :contact_person_type, in: [:doctor, :nurse, :hospital_staff, :volunteer, :intern, :other]

  validates :name, presence: { :message => 'Name of the Hospital cannot be blank!' }
  validates :address, presence: { :message => 'Please provide the valid address.' }
  validates :category, presence: true

  def geo_code
    geocode if (self.lat.nil? || self.long.nil?)
  end

  def normalize_data
    self.name = self.name.try(:titleize)
    self.address = self.address.squish.try(:titleize) if self.address.present?
    self.contact_person_name = self.contact_person_name.squish.try(:titleize) if self.contact_person_name.present?
    self.contact_person_email = self.contact_person_email.squish.try(:downcase) if self.contact_person_email.present?
  end
end

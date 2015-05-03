# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do
  Donor.delay.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    cell_phone: Faker::Number.number(10),
    email: Faker::Internet.email,
    city: 'Kathmandu',
    state: 'Bagmati',
  )
end

blood_types = %i(o_positive o_negative a_positive a_negative b_positive b_negative ab_positive ab_negative)
blood_types.each do |blood_type|
  BloodType.create(
    blood_type: blood_type
  )
end

# 10.times do |n|
#   Hospital.create(
#     name: 'Bir Hospital' + n.to_s,
#     address: 'Kathmandu, Nepal',
#     category: [:private_hospital, :public_hospital, :blood_bank, :other].sample
#   )
# end
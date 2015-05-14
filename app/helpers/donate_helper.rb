module DonateHelper
  def category_icon(hospital)
    case hospital.category
    when 'red_cross_society' then '<i class="fa fa-plus"></i>'.html_safe
    when 'hospital_based' then '<i class="fa fa-tint"></i>'.html_safe
    when 'emergency_blood_transfusion' then '<i class="fa fa-h-square"></i>'.html_safe
    when 'other' then '<i class="fa fa-bed"></i>'.html_safe
    end
  end
end

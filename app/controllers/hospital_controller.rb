class HospitalController < ApplicationController
  before_action :get_hospital, only: [:show, :edit, :update]
  def index
  end

  def new
    @hospital = Hospital.new
    @hospitals = Hospital.all.map(&:name)
  end

  def create
    @hospital = Hospital.where(name: hospital_params[:name]).first_or_initialize(hospital_params)

    if @hospital.id.present?
      flash[:success] = "We already have #{@hospital.name} on our list, please update the blood status."
      redirect_to hospital_blood_status_path(@hospital)
    elsif @hospital.save
      flash[:success] = "Thanks for registering #{@hospital.name}, please update the blood status."
      redirect_to hospital_blood_status_path(@hospital)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  private
  def hospital_params
    params.require(:hospital).permit(:name, :address, :lat, :long, :phone, :category, :contact_person_name, :contact_person_phone, :contact_person_type, :contact_person_email)
  end

  def get_hospital
    @hospital = Hospital.find(params[:id])
  end
end

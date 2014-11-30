class Api::EntriesController < ApplicationController
  
  def index
    @entries = Entry.all
    render "index"
  end
  
  def create
    @entry = Entry.new(entry_params)
    @entry.user_id = current_user.id
    
    if @entry.save
      render json: @entry
    else
      render json: @entry.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
    @entry = Entry.find(params[:id])
    @user = @entry.user
    render "show"
  end
  
  private
  
  def entry_params
    params.require(:entry).permit(
      :title, :body, :divenum, :location_name, :longitude, :latitude, :vis,
      :watertemp, :airtemp, :divetime, :maxdepth, :divetype, :current, :weather,
      :avgdepth, :entrytime, :entrydate
    )
  end
  
end

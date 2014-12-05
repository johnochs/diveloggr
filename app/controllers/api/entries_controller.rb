class Api::EntriesController < ApplicationController
  
  before_action :render_error_json
  
  def index
    @entries = Entry.all
    render "index"
  end
  
  def create
    @entry = Entry.new(entry_params)
    @entry.user_id = current_user.id.to_i
    
    if @entry.save
      render json: @entry
    else
      render json: @entry.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @entry = Entry.find(params[:id])
    
    if @entry.update(entry_params)
      render "show"
    else
      render json: @entry.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy!
    render json: @entry, status: :ok
  end
  
  def show
    @entry = Entry.find(params[:id])
    @user = @entry.user
    @images = @entry.images
    render "show"
  end
  
  private
  
  def entry_params
    params.require(:entry).permit(
      :title, :body, :divenum, :location_name, :longitude, :latitude, :vis,
      :watertemp, :airtemp, :divetime, :maxdepth, :divetype, :current, :weather,
      :avgdepth, :entrytime, :entrydate, :surface
    )
  end
  
end

class Api::EntriesController < ApplicationController
  
  def index
    @entries = Entry.all
    render json: @entries
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
    render json: @entry
  end
  
  private
  
  def entry_params
    params.require(:entry).permit(
      :title, :body, :airtemp, :divenum, :location_name, :logdate, :maxdepth, :vis, :watertemp
    )
  end
  
end

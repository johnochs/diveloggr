class Api::EntriesController < ApplicationController
  
  
  def index
    @entries = Entry.all
    render json: @entries
  end
  
  def create
    @entry = Entry.new(entry_params)
    
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
end

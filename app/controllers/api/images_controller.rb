class Api::ImagesController < ApplicationController
  
  before_action :render_error_json
  
  def index
    @images = Image.all
    render json: @images
  end
  
  def create
    @image = Image.new(image_params)
    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  
  def show
    @image = Image.find(params[:id])
    render json: @image
  end
  
  def update
    @image = Image.find(params[:id])
    if @image
      @image.update(image_params)
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @image = Image.find(params[:id])
    @image.destroy!
  end
  
  private
  
  def image_params
    params.require(:image).permit(:filename, :imageable_id, :imageable_type, 
                                  :s_url, :m_url, :l_url, :mimetype, :size,
                                  :key, :isWritable, :primary
                                  )
  end
  
end
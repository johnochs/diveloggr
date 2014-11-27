class Api::PostsController < ApplicationController
  
  def index
    @posts = Post.all
    render json: @posts
  end
  
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
    @post = Post.find(params[:id])
    render json: @post
  end
  
  private
  
  def post_params
    params.require(:entry).permit(
      :title, :body, :airtemp, :divenum, :location_name, :logdate, :maxdepth, :vis, :watertemp
    )
  end
  
end
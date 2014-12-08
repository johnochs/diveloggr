class Api::UsersController < ApplicationController
  
  before_action :render_error_json
  
  def index
    @users = User.all
    render "index", status: :ok
  end
  
  
  def show
    @user = User.find(params[:id])
    render "show", status: :ok
  end
  
  def destroy
    @user = User.find(params[:id])
    
    render json: @user, status: :ok
  end
  
  def update
    if params[:id].to_i != current_user.id
      render json: ["You don't have permission to do this."], status: :forbidden
    else
      @user = User.find(params[:id])
    
      if @user.update(user_params)
        render json: @user, status: :ok
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:location, :age, :exp, :numdives, :fname, :lname)
  end
  
end
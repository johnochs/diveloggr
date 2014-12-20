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
    puts "O HAI! : "  
    puts params
    
    if params[:id].to_i != current_user.id
      render json: ["You don't have permission to do this."], status: :forbidden
      return
    end
    
    @user = User.find(params[:id])
    if @user.update(user_params) && check_password
      if params[:password] != ""
        @user.password = params[:password]
        @user.save!
      end
      full_account_conversion(@user)
      render json: @user, status: :ok
    else
      render json: ["Password is not valid."], status: :unprocessable_entity
    end
    
  end
  
  private
  
  def user_params
    params.require(:user).permit(:location, :age, :exp, :numdives, :fname, :lname, :password, :email, :guest)
  end
  
  def check_password
    params[:password] == params[:password_check]
  end
  
  def full_account_conversion(user)
    if (!user.pwdigest.nil? && !user.email.nil?)
      user.update(guest: false)
    end
  end
  
end
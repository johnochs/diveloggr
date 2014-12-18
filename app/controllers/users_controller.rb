class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    
    if params[:user]
      @user = User.new(user_params)
    else
      @user = User.new_guest
    end
    
    if @user.save
      login!(@user)
      redirect_to "#feed"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password)
  end
end

module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end 

  def current_user?(user)
    user == current_user
  end

  # Redirects to storedlocation (or to the default).
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # Store the URL trying to be accessed.
  def store_location
    session[:forwarding_url] = request.url if request.get?
  end

  # Change the user id to current logged in user if the user_id param is inactive
  def is_user_id_inactive?
    forwarding_url = session[:forwarding_url]
    unless forwarding_url.nil?
      if forwarding_url.include? "inactive"
        current_user_id = current_user.id
        forwarding_url["inactive"] = current_user_id.to_s
        session[:forwarding_url] = forwarding_url
      end
    end
  end

  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in"
      redirect_to login_url
    end
  end

  def assign_user_id
    if logged_in?
      return current_user
    else 
      return "inactive"
    end 
  end

  # User profile version
  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  # Application process version
  def correct_user_application_version
    @user = User.find(params[:user_id])
    redirect_to(root_url) unless current_user?(@user)
  end

end

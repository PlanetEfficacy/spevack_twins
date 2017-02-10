class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def facebook
    sign_in_with "Facebook"
  end

  def linkedin
    sign_in_with "LinkedIn"
  end

  def twitter
    sign_in_with "Twitter"
  end

  def google_oauth2
    sign_in_with "Google"
  end

  def developer
    sign_in_with "Developer"
  end

  private

    def sign_in_with(provider_name)
      @user = User.from_omniauth(request.env["omniauth.auth"])
      sign_in @user
      redirect_to default_post_sign_in_path
    end

    def default_post_sign_in_path
      current_user.admin? ? new_photo_path : photos_path
    end
end

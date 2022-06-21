from django.urls import path, include
from .views import GetCSRFToken, CheckAuthenticationView, SignupView, LoginView, LogoutView, DeleteAccountView, GetUsersView

urlpatterns = [
    path('csrf/', GetCSRFToken.as_view()),
    path('authenticated/', CheckAuthenticationView.as_view()),
    path('register/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('delete/', DeleteAccountView.as_view()),
    path('user_profiles/', GetUsersView.as_view())
]
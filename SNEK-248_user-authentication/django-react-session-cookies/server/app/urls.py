from django.urls import path
from app.views import get_csrf_token, login_view, logout_view, get_me_view


urlpatterns = [
  path('login/', login_view),
  path('logout/', logout_view),
  path('me/', get_me_view),
  path('csrf/', get_csrf_token),
]
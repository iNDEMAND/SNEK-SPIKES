from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),

    # path('api-auth/', include('rest_framework.urls')),

    path('sessions/', include('session_auth.urls')),
    # path('profile/', include('user_profile.urls')),

    path('api/auth/', include('app.urls')),
    # path('api/auth/', include('session_auth.urls')),
]

# urlpatterns += [re_path(r'^.*')]

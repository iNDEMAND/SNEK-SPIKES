from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import  AllowAny
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserProfilesSerializer


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView): 
  permission_classes = [AllowAny]

  def get(self, request, format=None):
    return Response({'success': 'CSRF cookie set.'})


# @method_decorator(csrf_protect, name='dispatch') 
class CheckAuthenticationView(APIView):
  def get(self, request, format=None):
    user = self.request.user

    try:
      is_user_authenticated = user.is_authenticated

      if is_user_authenticated:
        return Response({'isAuthenticated': 'success', 'user': str(user)})
      else:
        return Response({'isAuthenticated': 'error'})
    except:
      return Response({'error': f'Something went wrong authenticating user: {user}'})


@method_decorator(csrf_protect, name='dispatch')  # What is the name `dispatch` for?
class SignupView(APIView):
  permission_classes = [AllowAny]

  def post(self, request, format=None):
    data = self.request.data

    username = data['username']
    password = data['password']
    email = data['email']
    confirm_password = data['confirm_password']  # "confirm password"?

    try:
      if password == confirm_password:
        if User.objects.filter(username=username).exists():
          return Response({'error': f'Username {username} already exists.'})
        else:
          if len(password) < 6:
            return Response({'error': 'Password must be at least 6 characters.'})
          elif email is None:
            # email = f'{str(user)}@cookies.com'
            return Response({'error': 'Email must be provided.'})
          else:
            user = User.objects.create_user(username=username, password=password)
            UserProfile.objects.create(user=user, username=username, first_name='', last_name='', email=email,
              title='')
            return Response({'success': 'User created successfully.', 'user': str(user)})
      else:
        return Response({'error': 'Passwords do not match.'})
    except:
      return Response({'error': 'Something went wrong when registering account.'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
  permission_classes = [AllowAny]

  def post(self, request, format='None'):
    username = self.request.data['username']
    password = self.request.data['password']

    try:
      user = authenticate(username=username, password=password)

      if user is not None:
        login(request, user)
        return Response({'success': 'Logged In', 'user': str(user)})
      else:
        return Response({'error': 'Error with username and/or password.'})
    except:
      return Response({'error': 'Error logging in.'})


class LogoutView(APIView):
  def post(self, request, format=None):
    try:
      logout(request)
      return Response({'success': 'Logged Out'})
    except:
      return Response({'error': 'Error logging out.'})


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()
            return Response({'success': 'User Deleted'})
        except:
            return Response({'error': 'Something went wrong when trying to delete user.'})


# @method_decorator(csrf_protect, name='dispatch')
class GetUsersView(APIView):
  # permission_classes = [AllowAny]

  def get(self, request, format=None):
    user_profiles = UserProfile.objects.all()
    user_profiles = UserProfilesSerializer(user_profiles, many=True)
    data = user_profiles.data
    return Response({'data': data, 'count': len(data)})
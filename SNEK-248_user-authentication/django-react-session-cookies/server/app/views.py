from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status



@api_view(['GET'])
@permission_classes([AllowAny,])  
def get_csrf_token(request):
  """Used to get a `CSRF token` which is required by Django while sending 
  a POST request for login. Without a CSRF token, Django will not be
  able to set a session token as `HttpOnly cookie` in the browser."""
  response = Response({"message": "Set CSRF cookie"})
  response['X-CSRFToken'] = get_token(request)
  return response

@api_view(['POST'])
@permission_classes([AllowAny,]) 
def login_view(request):
  """Performs login and sets the session token into the browser as
  HTTPOnly cookie."""
  username = request.data['username']
  password = request.data['password']
  print('\n--> ', username, ' | ',password,'\n')
  user = authenticate(username=username, password=password)
  if user:
    print(user, request)
    login(request, user)
    return Response(
      {
        'message': 'User logged in',
        'user': username,
      }, 
      status=status.HTTP_200_OK)
  else:
    return Response(
      {'message': 'Invalid username or password'},
      status=status.HTTP_401_UNAUTHORIZED)
  
@api_view(['POST'])
def logout_view(request):
  print('\n--> LOGOUT CALLED: ', request.data, '\n')
  logout(request)
  return Response({'message': 'User logged out.'})

@api_view(['GET'])
def get_me_view(request):
  user = request.user
  print('--> user: ',user)
  try:
    user_authenticated = user.is_authenticated
    print(user_authenticated)
    return Response({'msg': 'User is authenticated', 'user': str(user)})
  except:
    print('whoops')
    return Response({'msg': 'Error authenticating user.'})
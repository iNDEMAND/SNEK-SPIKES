from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class GetUserProfileView(APIView):
  def get(self, request, format=None):
    try:
      user = self.request.user

      user_profile = UserProfile.objects.get(user=user)
      user_profile = UserProfileSerializer(user_profile)
      return Response(({'userProfile': user_profile.data, 'user': str(user.username)}))
    except:
      return Response({'error': 'Something went wrong retrieving profile.'})

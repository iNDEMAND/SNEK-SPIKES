from rest_framework import serializers
from django.contrib.auth.models import User

from user_profile.models import UserProfile


class UserProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
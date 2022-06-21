from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = UserProfile
    #     fields = '__all__'

#   email = serializers.EmailField(required=True)
#   username = serializers.CharField(required=True)
#   password = serializers.CharField(min_length=6, write_only=True)

  class Meta: 
    model = UserProfile
    fields = ('email', 'username', 'password')
    extra_kwargs = {'password': {'write_only': True}}

#   def create(self, validated_data):
#     password = validated_data.pop('password', None)
#     user = self.Meta.model(**validated_data)

#     if password is not None:
#       user.set_password(password)

#     user.save()
#     return user
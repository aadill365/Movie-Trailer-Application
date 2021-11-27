from rest_framework import serializers
# from django.contrib.auth.models import User
from backend.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
	password2 = serializers.CharField(style={'input-type':'password'},write_only=True)
	class Meta:
		model = CustomUser
		fields = ['username','email','password','password2']
		extra_kwargs = {
		'password': {'write_only': True}
		}

	def save(self):
		user = CustomUser(
			email=self.validated_data['email'],
			username = self.validated_data['username'])

		password = self.validated_data['password']
		password2 = self.validated_data['password2']
		if password ==password2:
			user.set_password(password)
			user.save()
		else:
			raise serializers.ValidationError({'password':'passwords must match'})


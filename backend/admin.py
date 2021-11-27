from django.contrib import admin
from backend.models import CustomUser
from django.contrib.auth.admin import UserAdmin



# Register your models here.
admin.site.register(CustomUser,UserAdmin)
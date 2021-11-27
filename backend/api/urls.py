from django.urls import path,include
from .import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', views.UserRegisterViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    ]

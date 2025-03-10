from django.urls import path
from .views import UserCreateView, TokenObtainView, ProfileView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user-register'),
    path('token/', TokenObtainView.as_view(), name='token-obtain'),
    path('me/', ProfileView.as_view(), name='user-profile'),
]

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CreateUserView,
    EmailTokenObtainPairView,
    FitnessProfileCreateView,
    FitnessProfileUpdateView,
    CalorieMacroView,
)

urlpatterns = [
    path("user/register/", CreateUserView.as_view()),
    path("token/", EmailTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("fitness/profile/", FitnessProfileCreateView.as_view()),
    path("fitness/profile/update", FitnessProfileUpdateView.as_view()),
    path("calories/macros", CalorieMacroView.as_view()),
]

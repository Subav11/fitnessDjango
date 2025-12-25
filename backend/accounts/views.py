from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth import get_user_model
from .models import FitnessProfile
from .serializers import (
    UserSerializer,
    FitnessProfileSerializer,
    CalorieMacroSerializer,
)
from .token_serializers import EmailTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils.calculations import (
    calculate_bmr,
    calculate_tdee,
    calculate_target_calories,
    calculate_macros,
)


User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class FitnessProfileCreateView(generics.CreateAPIView):
    serializer_class = FitnessProfileSerializer
    permission_classes = [IsAuthenticated]

    # overriding the default createAPIview to add userfield also
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FitnessProfileUpdateView(generics.UpdateAPIView):
    serializer_class = FitnessProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return FitnessProfile.objects.get(user=self.request.user)


class CalorieMacroView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = FitnessProfile.objects.get(user=request.user)

        bmr = calculate_bmr(
            weight_kg=profile.weight_kg,
            height_cm=profile.height_cm,
            age=profile.age,
            gender=profile.gender,
        )

        tdee = calculate_tdee(bmr, profile.activity_level)
        target_calories = calculate_target_calories(tdee, profile.goal)
        macros = calculate_macros(
            calories=target_calories,
            weight_kg=profile.weight_kg,
            goal=profile.goal,
        )

        data = {
            "bmr": round(bmr, 1),
            "tdee": round(tdee, 1),
            "target_calories": round(target_calories, 1),
            **macros,
        }

        serializer = CalorieMacroSerializer(data)
        return Response(serializer.data)

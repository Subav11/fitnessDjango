from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
import uuid
from .models import FitnessProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        # auto-generate username
        username = f"user_{uuid.uuid4().hex[:10]}"

        user = User.objects.create_user(
            username=username,
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )
        return user


class FitnessProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessProfile
        fields = ["height_cm", "weight_kg", "age", "gender", "goal", "activity_level"]


class CalorieMacroSerializer(serializers.Serializer):
    bmr = serializers.FloatField()
    tdee = serializers.FloatField()
    target_calories = serializers.FloatField()
    protein_g = serializers.FloatField()
    carbs_g = serializers.FloatField()
    fat_g = serializers.FloatField()

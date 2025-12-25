from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class FitnessProfile(models.Model):
    Goal_Choices = [
        ("cut", "Fat Loss/ Cut"),
        ("maintain", "Maintain"),
        ("lean_bulk", "Lean Bulk"),
        ("bulk", "Bulk/ Muscle Gain"),
    ]

    Activity_Choices = [
        ("sedentary", "Sedentary"),
        ("light", "Lightly Active"),
        ("moderate", "Moderaterly Active"),
        ("active", "Very Active"),
    ]

    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="fitness_profile"
    )

    height_cm = models.PositiveBigIntegerField()
    weight_kg = models.FloatField()
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)

    goal = models.CharField(max_length=10, choices=Goal_Choices)

    activity_level = models.CharField(max_length=10, choices=Activity_Choices)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} Fitness Profile"

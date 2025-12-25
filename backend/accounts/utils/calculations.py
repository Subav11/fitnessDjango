def calculate_bmr(weight_kg, height_cm, age, gender):
    if gender.lower() == "male":
        return (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5

    else:
        return (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161


def calculate_tdee(bmr, activity_level):
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
    }
    return bmr * activity_multipliers.get(activity_level, 1.2)


def calculate_target_calories(tdee, goal):
    if goal == "cut":
        return tdee - 650
    elif goal == "lean_bulk":
        return tdee + 350
    elif goal == "bulk":
        return tdee + 800
    return tdee


def calculate_macros(calories, weight_kg, goal):
    if goal == "cut":
        protein_per_kg = 2.3
    elif goal == "lean_bulk":
        protein_per_kg = 2
    elif goal == "maintain":
        protein_per_kg = 1.5
    else:
        protein_per_kg = 1.8

    protein_g = protein_per_kg * weight_kg
    protein_cal = protein_g * 4

    fat_cal = calories * 0.25
    fat_g = fat_cal / 9

    remaining_cal = calories - (protein_cal + fat_cal)
    carbs_g = remaining_cal / 4

    return {
        "protein_g": max(0, round(protein_g, 1)),
        "carbs_g": max(0, round(carbs_g, 1)),
        "fat_g": max(0, round(fat_g, 1)),
    }

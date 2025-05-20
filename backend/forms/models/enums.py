from django.db import models

class CollegeEnum(models.TextChoices):
    CSM = 'CSM', 'College of Science and Mathematics'
    CHSS = 'CHSS', 'College of Humanities and Social Sciences'
    SOM = 'SOM', 'School of Management'

class YearLevelEnum(models.TextChoices):
    FIRST_YEAR = '1st Year', '1st Year'
    SECOND_YEAR = '2nd Year', '2nd Year'
    THIRD_YEAR = '3rd Year', '3rd Year'
    FOURTH_YEAR = '4th Year', '4th Year'
    FIFTH_YEAR = '5th Year', '5th Year'
    
class SemesterEnum(models.TextChoices):
    FIRST = "1st semester", "First Semester"
    SECOND = "2nd semester", "Second Semester"
    MIDYEAR = "Mid semester", "Midyear"

class DegreeProgramEnum(models.TextChoices):
    BS_ARCHITECTURE = 'BS Arch', 'BS Architecture'
    MA_URBAN_PLANNING = 'MAURP', 'MA Urban and Regional Planning'
    BA_ENGLISH = 'BAE', 'BA English'
    BA_COMMUNICATION = 'BACMA', 'BA Communication and Media Arts'
    AA_SPORTS_STUDIES = 'AASS', 'AA Sports Studies'
    BS_SPORTS_SCIENCE = 'BSS', 'BS Sports Science'
    DIPLOMA_EXERCISE_SPORTS_SCIENCE = 'DESS', 'Diploma in Exercise and Sports Science'
    DIPLOMA_URBAN_AND_REGIONAL_PLANNING = 'DURP', 'Diploma in Urban and Regional Planning'
    BS_ANTHROPOLOGY = 'BS Anthro', 'BS Anthropology'
    BS_APPLIED_MATH = 'BSAM', 'BS Applied Mathematics'
    BS_BIOLOGY = 'BSB', 'BS Biology'
    BS_COMPUTER_SCIENCE = 'BSCS', 'BS Computer Science'
    BS_FOOD_TECHNOLOGY = 'BSFT', 'BS Food Technology'
    BS_DATA_SCIENCE = 'BSDS', 'BS Data Science'
    MS_FOOD_SCIENCE = 'MSFS', 'MS Food Science'
    MS_HUMAN_MOVEMENT_SCIENCE = 'MSHMS', 'MS Human Movement Science'
    BS_AGRIBUSINESS_ECONOMICS = 'BSAbe', 'BS Agribusiness Economics'
    MASTER_MANAGEMENT = 'MM', 'Master in Management'
    PHD_RESEARCH = 'PhD in Research', 'PhD in Research'


class PhilippineRegionEnum(models.TextChoices):
    REGION_I = 'Region I - Ilocos', 'Region I - Ilocos'
    REGION_II = 'Region II - Cagayan Valley', 'Region II - Cagayan Valley'
    REGION_III = 'Region III - Central Luzon', 'Region III - Central Luzon'
    REGION_IV_A = 'Region IV-A - CALABARZON', 'Region IV-A - CALABARZON'
    REGION_IV_B = 'Region IV-B - MIMAROPA Region', 'Region IV-B - MIMAROPA Region'
    REGION_V = 'Region V - Bicol', 'Region V - Bicol'
    REGION_VI = 'Region VI - Western Visayas', 'Region VI - Western Visayas'
    REGION_VII = 'Region VII - Central Visayas', 'Region VII - Central Visayas'
    REGION_VIII = 'Region VIII - Eastern Visayas', 'Region VIII - Eastern Visayas'
    REGION_IX = 'Region IX - Zamboanga Peninsula', 'Region IX - Zamboanga Peninsula'
    REGION_X = 'Region X - Northern Mindanao', 'Region X - Northern Mindanao'
    REGION_XI = 'Region XI - Davao Region', 'Region XI - Davao Region'
    REGION_XII = 'Region XII - SOCCSKSARGEN', 'Region XII - SOCCSKSARGEN'
    REGION_XIII = 'Region XIII - Caraga', 'Region XIII - Caraga'
    NCR = 'NCR - National Capital Region', 'NCR - National Capital Region'
    CAR = 'CAR - Cordillera Administrative Region', 'CAR - Cordillera Administrative Region'
    BARMM = 'BARMM - Bangsamoro Autonomous Region', 'BARMM - Bangsamoro Autonomous Region'
    NIR = 'NIR - Negros Island Region', 'NIR - Negros Island Region'
    
class SupportChoices(models.TextChoices):
    SELF = 'self', 'Self-supporting'
    BOTH_PARENTS = 'both_parents', 'Both parents'
    FATHER_ONLY = 'father_only', 'Father only'
    MOTHER_ONLY = 'mother_only', 'Mother only'
    SCHOLARSHIP = 'scholarship', 'Scholarship'
    COMBINATION = 'combination', 'Combination'
    OTHERS = 'others', 'Others'
    GOV_FUNDED = 'gov_funded', 'Government Funded'
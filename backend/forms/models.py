from django.db import models

# Address model
class Address(models.Model):
    address_line_1 = models.CharField(max_length=255)  
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    barangay = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    municipality = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    region = models.CharField(
        max_length=100,
        choices=[
            ('REGION_I', 'Ilocos Region'),
            ('REGION_II', 'Cagayan Valley'),
            ('REGION_III', 'Central Luzon'),
            ('REGION_IV_A', 'CALABARZON'),
            ('REGION_IV_B', 'MIMAROPA'),
            ('REGION_V', 'Bicol Region'),
            ('REGION_VI', 'Western Visayas'),
            ('REGION_VII', 'Central Visayas'),
            ('REGION_VIII', 'Eastern Visayas'),
            ('REGION_IX', 'Zamboanga Peninsula'),
            ('REGION_X', 'Northern Mindanao'),
            ('REGION_XI', 'Davao Region'),
            ('REGION_XII', 'SOCCSKSARGEN'),
            ('REGION_XIII', 'Caraga'),
            ('REGION_CAR', 'Cordillera Administrative Region'),
            ('REGION_NCR', 'National Capital Region'),
        ]
    )
    zip_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.address_line_1}, {self.city}, {self.zip_code}"

# Student model
class Student(models.Model):
    student_number = models.CharField(max_length=10, primary_key=True)
    user = models.OneToOneField('users.User', on_delete=models.CASCADE)
    
    family_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    nickname = models.CharField(max_length=50)

    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    religion = models.CharField(max_length=50)
    birth_rank = models.PositiveIntegerField()
    birthdate = models.DateField()
    birth_place = models.CharField(max_length=50)
    landline_number = models.CharField(max_length=20, blank=True, null=True)
    mobile_number = models.CharField(max_length=20)
    
    # Foreign Keys to Address table
    address_while_in_up = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='students_in_up')
    permanent_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='permanent_students')

    
    # College, Degree Program, Year Level
    college = models.CharField(max_length=100, choices=[('CHSS', 'College of Humanities and Social Sciences'),
                                                         ('CSM', 'College of Science and Mathematics'),
                                                         ('SOM', 'School of Management')])
    degree_program = models.CharField(max_length=100, choices=[
                                                                ('BA_COMMUNICATION_AND_MEDIA_ARTS', 'BA Communication and Media Arts'),
                                                                ('BA_ENGLISH', 'BA English'),
                                                                ('BS_ANTHROPOLOGY', 'BS Anthropology'),
                                                                ('BS_APPLIED_MATHEMATICS', 'BS Applied Mathematics'),
                                                                ('BS_ARCHITECTURE', 'BS Architecture'),
                                                                ('BS_BIOLOGY', 'BS Biology'),
                                                                ('BS_COMPUTER_SCIENCE', 'BS Computer Science'),
                                                                ('BS_DATA_SCIENCE', 'BS Data Science'),
                                                                ('BS_FOOD_TECHNOLOGY', 'BS Food Technology'),
                                                                ('BS_SPORTS_SCIENCE', 'BS Sports Science'),
                                                            ])
    current_year_level = models.IntegerField(choices=[(1, 'First Year'), (2, 'Second Year'), (3, 'Third Year'),
                                                      (4, 'Fourth Year'), (5, 'Fifth Year')])
    
    is_completed = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if self.user:
            self.student_number = self.user.username  
            self.first_name = self.user.first_name
            self.family_name = self.user.last_name 

        super(Student, self).save(*args, **kwargs) 

    def __str__(self):
        return f"{self.student_number} - {self.first_name} {self.family_name}"


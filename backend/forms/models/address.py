from django.db import models
from .enums import PhilippineRegionEnum

class Address(models.Model):
    address_line_1 = models.TextField()
    address_line_2 = models.TextField(null=True, blank=True)
    barangay = models.CharField(max_length=100)
    city_municipality = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    region = models.CharField(max_length=100, choices=PhilippineRegionEnum.choices)
    zip_code = models.CharField(max_length=10)

    class Meta:
         unique_together = ('address_line_1', 'barangay', 'city_municipality', 'province', 'region', 'zip_code')

    def __str__(self):
        return f'{self.address_line_1}, {self.barangay}, {self.city_municipality}, {self.province}'

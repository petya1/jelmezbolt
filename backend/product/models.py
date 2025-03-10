from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('children', 'Children'),
        ('men', 'Men'),
        ('women', 'Women')
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, default='')
    accessories = models.JSONField(default=list)
    not_accessories = models.JSONField(default=list)
    
    price = models.IntegerField(default=0)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.name

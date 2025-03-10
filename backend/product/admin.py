from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'price', 'accessories', 'category', 'image_preview')  
    list_filter = ('category',)  
    search_fields = ('name',)  
    ordering = ('id',)  
    readonly_fields = ('image_preview',) 

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="width: 100px; height: auto;" />'
        return "No image"
    image_preview.allow_tags = True
    image_preview.short_description = "Image Preview"

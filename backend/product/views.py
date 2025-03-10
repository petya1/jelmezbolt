from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.generics import ListCreateAPIView
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')  
        if category:
            queryset = queryset.filter(category=category)
        return queryset



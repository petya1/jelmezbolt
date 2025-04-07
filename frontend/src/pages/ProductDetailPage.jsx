import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  const sizeOptions = {
    men: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    women: ['S', 'M', 'L', 'XL'],
    children: [
      '99-104', '105-110', '111-116', '117-122',
      '123-128', '129-134', '135-144', '145-150'
    ]
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Hiba a termék betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!selectedSize) {
      alert('Kérjük válassz méretet!');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = cart.some(
      item => item.id === product.id && item.size === selectedSize
    );
    if (isAlreadyInCart) {
      alert('Ez a méret már a kosárban van!');
      return;
    }

    const updatedCart = [...cart, { ...product, size: selectedSize }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} (${selectedSize}) hozzáadva a kosárhoz!`);
  };

  if (loading) return <div className="p-6">Betöltés...</div>;
  if (!product) return <div className="p-6">A termék nem található.</div>;

  const availableSizes = sizeOptions[product.category] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-md p-6 flex flex-col md:flex-row gap-6">
        
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[400px] object-contain rounded-md"
          />
        </div>

        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <h3 className="text-lg text-gray-700 mb-6">{product.description}</h3>

          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Méret kiválasztása:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">-- Válassz méretet --</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          
          <button
            onClick={addToCart}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

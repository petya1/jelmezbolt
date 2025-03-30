import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  
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
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const isAlreadyInCart = cart.some(item => item.id === product.id);
      if (isAlreadyInCart) {
        alert('Ez a termék már a kosárban van!');
        return;
      }
  
      const updatedCart = [...cart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${product.name} hozzáadva a kosárhoz!`);
    };
  
    if (loading) return <div className="p-6">Betöltés...</div>;
    if (!product) return <div className="p-6">A termék nem található.</div>;
  
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
  
            <button
              onClick={addToCart}
              className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              Kölcsönzés
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetailPage;
  
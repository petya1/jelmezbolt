import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all'); 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get('/products/', {
                    params: category !== 'all' ? { category } : {}
                });
    
                
    
                setProducts(response.data.results || response.data);
            } catch (error) {
                console.error('Hiba a termékek betöltésekor:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
    
        
        fetchProducts();
    }, [category]); 

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Jelmezeink</h1>

                <div className="flex justify-center mb-6">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Mind</option>
                        <option value="men">Férfi</option>
                        <option value="women">Női</option>
                        <option value="children">Gyerek</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">Jelmezek betöltése...</div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [showSizePrompt, setShowSizePrompt] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const sizeOptions = {
    men: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    women: ['S', 'M', 'L', 'XL'],
    children: [
      '99-104', '105-110', '111-116', '117-122',
      '123-128', '129-134', '135-144', '145-150'
    ]
  };

  const availableSizes = sizeOptions[product.category] || [];

  const handleRentClick = () => {
    setShowSizePrompt(true);
  };

  const confirmAddToCart = () => {
    if (!selectedSize) {
      alert('Kérjük válassz méretet!');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = cart.some(item => item.id === product.id && item.size === selectedSize);
    if (isAlreadyInCart) {
      alert('Ez a méret már a kosárban van!');
      return;
    }

    const updatedCart = [...cart, { ...product, size: selectedSize }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} (${selectedSize}) hozzáadva a kosárhoz!`);
    setShowSizePrompt(false);
    setSelectedSize('');
  };

  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return new Intl.NumberFormat('en', {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parsedNum).replace(/,/g, ' ');
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition transform duration-300 flex flex-col h-full">
      {/* Kép */}
      <div className="w-full h-64 flex justify-center items-center bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Tartalom */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-700 text-lg mt-1">{`Ár: ${formatNumber(product.price)} Ft`}</p>

        <p
          className={`text-sm mt-2 ${
            product.category === 'men'
              ? 'text-blue-500'
              : product.category === 'women'
              ? 'text-pink-500'
              : 'text-green-500'
          }`}
        >
          {product.category === 'men'
            ? 'Férfi'
            : product.category === 'women'
            ? 'Női'
            : 'Gyerek'}
        </p>

        <div className="mt-3">
          <h3 className="text-sm font-bold">Kiegészítők:</h3>
          {product.accessories.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {product.accessories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Nincs kiegészítő.</p>
          )}
        </div>

        {product.not_accessories.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-bold">NEM tartozékok:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {product.not_accessories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gombok és méretválasztó legalul */}
        <div className="mt-auto pt-4">
          <div className="flex space-x-4">
            <Link to={`/product/${product.id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                Részletek
              </button>
            </Link>
            <button
              onClick={handleRentClick}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Kölcsönzés
            </button>
          </div>

          {showSizePrompt && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-red-600 mb-2">
                Még egy lépés hátra van – kérjük válassz méretet:
              </p>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border rounded-md p-2 w-full mb-2"
              >
                <option value="">-- Válassz méretet --</option>
                {availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <button
                onClick={confirmAddToCart}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Kosárba tesz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

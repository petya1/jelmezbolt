import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleOrder = () => {
    localStorage.removeItem('cart');
    navigate('/order-success');
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Kosár</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">A kosarad üres.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.price} Ft</p>
                    <p className="text-sm text-gray-500">Méret: {item.size || '–'}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Törlés
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="text-xl font-bold mb-4">Összesen: {total} Ft</p>

              {}
              <button
                onClick={handleOrder}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
              >
                Megrendelés
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

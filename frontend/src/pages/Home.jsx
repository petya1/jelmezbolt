import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-screen-lg mx-auto p-6 bg-gray-50 min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-6">Üdvözlünk a jelmezek világában!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Fedezd fel kínálatunkat, regisztrálj és rendelj – kezdődjön az átváltozás!
            </p>
            <p className="text-lg text-gray-700 mb-6">Kreativitásunk határtalan...</p>
            <Link to="/products">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                    Ugrás a jelmezekhez!
                </button>
            </Link>
        </div>
    );
};

export default Home;

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null); 
        navigate('/login');
    };

    return (
<header className="bg-gray-800 text-white p-4">
    <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Website Title */}
        <h1 className="text-xl font-bold">Jelmez Webshop</h1>

        {/* Navigation Links */}
        <nav className="space-x-4">
            <Link to="/" className="hover:text-blue-300">
                Kezdőlap
            </Link>
            <Link to="/about" className="hover:text-blue-300">
                Rólunk
            </Link>
            <Link to="/contact" className="hover:text-blue-300">
                Kapcsolat
            </Link>
            <Link to="/products" className="hover:text-blue-300">
                Jelmezeink
            </Link>
            {/* Conditional User Navigation */}
            {user ? (
                <>
                    <Link to="/cart" className="inline-flex items-center hover:text-blue-300">
                        <FaShoppingCart className="mr-2" />
                        Kosár
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 inline-block"
                    >
                        Kijelentkézés
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 inline-block"
                    >
                        Bejelentkezés
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 inline-block"
                    >
                        Regisztráció
                    </Link>
                </>
            )}
        </nav>
    </div>
</header>

    );
};

export default Header;

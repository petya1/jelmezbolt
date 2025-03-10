import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/user/token/', { username, password });
            const token = response.data.access_token;
            localStorage.setItem('accessToken', token); 

            const userResponse = await api.get('/user/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userResponse.data); 
            navigate('/'); 
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md w-96">
                <h1 className="text-2xl font-bold mb-4">Bejelentkezés</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Felhasználónév</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="írd be a felhasználóneved"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Jelszó</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="írd be a jelszavad"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Bejelentkezés
                </button>
            </form>
        </div>
    );
};

export default Login;

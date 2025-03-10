import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/user/register/', { username, password, email });
            if (response.status === 201) {
                setSuccess('Sikeres regisztráció! Jelentkezz be az oldalon.');
                setTimeout(() => navigate('/login'), 2000); 
            }
        } catch (err) {
            setError('A regisztráció nem sikerült. Ellenőrizd az adataidat.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="p-6 bg-white shadow-md rounded-md w-96">
                <h1 className="text-2xl font-bold mb-4">Regisztráció</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Felhasználónév</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Írd be a felhasználóneved"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Írd be az email címed"
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
                        placeholder="Írd be a jelszavad"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                    Regisztráció
                </button>
            </form>
        </div>
    );
};

export default Register;

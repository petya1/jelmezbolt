import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Register from './pages/Register';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './pages/cart';



const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                 
            </Routes>
        </Router>
    );
};

export default App;
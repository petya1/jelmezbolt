import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-screen-md mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Kapcsolat</h1>
            <div className="text-lg text-gray-700 space-y-4">
                <p><strong>Telefon:</strong> +36(30)765-4321</p>
                <p><strong>Címünk:</strong> 4025 Debrecen, Széchenyi u. 58.</p>
                <p><strong>Nyitvatartás:</strong></p>
                <ul className="list-disc list-inside">
                    <li>H-P: 8:00-16:30</li>
                    <li>Sz: 8:00-12:00</li>
                    <li>V: Zárva</li>
                </ul>
                <p><strong>E-mail cím:</strong> jelmez@debrecen.hu</p>
            </div>
        </div>
    );
};

export default Contact;

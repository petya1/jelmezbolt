import React from 'react';

const ProductCard = ({ product }) => {
    // console.log(product);

    const formatNumber = (num) => {
        const parsedNum = parseFloat(num);
      
        return new Intl.NumberFormat('en', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(parsedNum).replace(/,/g, ' '); 
      };

      
    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition transform duration-300">
            {/* Image */}
            <div className="w-full h-64 flex justify-center items-center bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            <div className="p-4">
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

                <div className="mt-3">

                    {product.not_accessories.length > 0 ? (
                        <>
                    <h3 className="text-sm font-bold">NEM tartozékok:</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {product.not_accessories.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        </>

                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

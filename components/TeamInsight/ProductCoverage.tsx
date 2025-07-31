import React from 'react';

interface ProductScore {
  name: string;
  score: number;
}

const ProductScoreBar = ({ name, score }: ProductScore) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{score}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const ProductCoverage = () => {
  const products: ProductScore[] = [
    { name: 'Cisco Meraki', score: 0 },
    { name: 'Managed WiFi', score: 0 },
    { name: 'Managed Broadband', score: 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Product Coverage</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Team product knowledge scores</p>
        </div>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductScoreBar key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCoverage; 
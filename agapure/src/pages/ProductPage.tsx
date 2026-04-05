import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface ProductPageProps {
  selectedProduct: string;
  setSelectedProduct: (product: string | null) => void;
  productVariations: any[];
}

/**
 * THIS IS THE 8 VARIATION PRODUCT PAGE
 * You can edit the product variations here.
 */
export const ProductPage: React.FC<ProductPageProps> = ({
  selectedProduct,
  setSelectedProduct,
  productVariations
}) => {
  return (
    <motion.div 
      key="product-detail-view" 
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -100 }} 
      transition={{ duration: 0.5 }}
      className="pt-32 pb-24 bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Product Variations</h2>
            <h3 className="text-4xl font-bold font-display">{selectedProduct}</h3>
          </div>
          <button 
            onClick={() => setSelectedProduct(null)}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors font-bold"
          >
            <ChevronLeft />
            <span>Back to Home</span>
          </button>
        </div>

        {/* THE 8 VARIATIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {productVariations.map((v) => (
            <motion.div 
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: v.id * 0.05 }}
              className="text-center group"
            >
              <div className="bg-[#f0f0f0] rounded-lg p-8 mb-6 aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img 
                  src={v.img} 
                  alt={v.size} 
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-primary font-bold text-xl mb-1">{v.size}</h4>
              <p className="text-gray-500 text-sm font-medium">Agapure {selectedProduct}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { Edit2, Trash2, AlertTriangle, Package } from 'lucide-react';
import { Product } from '../../types';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  const isLowStock = product.stock <= 10;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
      {/* Product Image */}
      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-xl flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        ) : (
          <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        )}
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="Edit product"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              aria-label="Delete product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
            {product.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Stock and Price */}
        <div className="flex items-center justify-between mb-4">
          <div className={clsx(
            "flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium",
            isLowStock 
              ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
              : "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
          )}>
            {isLowStock && <AlertTriangle className="w-3 h-3" />}
            <span>Stock: {product.stock}</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            product.status === 'active'
              ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          )}>
            {product.status === 'active' ? 'Active' : 'Inactive'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Updated {new Date(product.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
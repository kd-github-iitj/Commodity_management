import React from 'react';
import { ProductList } from '../components/products/ProductList';
import { Layout } from '../components/layout/Layout';

export const ProductsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList />
      </div>
    </Layout>
  );
};
import React from 'react';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Layout } from '../components/layout/Layout';

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />
      </div>
    </Layout>
  );
};
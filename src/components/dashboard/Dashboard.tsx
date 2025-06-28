import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ProductChart } from './ProductChart';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { api } from '../../utils/api';
import { DashboardStats } from '../../types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor your commodity management system performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="blue"
          change={{ value: 12, type: 'increase' }}
        />
        <StatsCard
          title="Low Stock Alerts"
          value={stats.lowStockCount}
          icon={AlertTriangle}
          color="red"
          change={{ value: 5, type: 'decrease' }}
        />
        <StatsCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={TrendingUp}
          color="green"
          change={{ value: 8, type: 'increase' }}
        />
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          color="purple"
          change={{ value: 15, type: 'increase' }}
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Distribution Chart */}
        <ProductChart data={stats.categoryDistribution} />

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {stats.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'sale' 
                      ? 'bg-green-100 dark:bg-green-900/20' 
                      : 'bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    {transaction.type === 'sale' ? (
                      <TrendingUp className={`w-5 h-5 ${
                        transaction.type === 'sale' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    ) : (
                      <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.productName}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="capitalize">{transaction.type}</span>
                      <span>•</span>
                      <span>{transaction.quantity} units</span>
                      <span>•</span>
                      <span>{transaction.user}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'sale' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
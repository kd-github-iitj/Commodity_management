// Mock API functions - In production, these would connect to real endpoints
const API_BASE_URL = 'https://api.commodities-system.com';

export const api = {
  // Authentication
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email === 'manager@company.com' && password === 'manager123') {
      return {
        token: 'mock-jwt-token-manager',
        user: {
          id: '1',
          email: 'manager@company.com',
          role: 'manager' as const,
          name: 'John Manager'
        }
      };
    } else if (email === 'employee@company.com' && password === 'employee123') {
      return {
        token: 'mock-jwt-token-employee',
        user: {
          id: '2',
          email: 'employee@company.com',
          role: 'employee' as const,
          name: 'Jane Employee'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Products
  getProducts: async (page = 1, limit = 10, search = '', category = '') => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockProducts = [
      {
        id: '1',
        name: 'Premium Coffee Beans',
        sku: 'COF-001',
        category: 'Beverages',
        price: 24.99,
        stock: 150,
        description: 'High-quality arabica coffee beans',
        status: 'active' as const,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z'
      },
      {
        id: '2',
        name: 'Organic Wheat Flour',
        sku: 'FLR-002',
        category: 'Grains',
        price: 8.50,
        stock: 5,
        description: 'Certified organic wheat flour',
        status: 'active' as const,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-18T14:20:00Z'
      },
      {
        id: '3',
        name: 'Raw Sugar',
        sku: 'SUG-003',
        category: 'Sweeteners',
        price: 12.75,
        stock: 200,
        description: 'Unrefined raw cane sugar',
        status: 'active' as const,
        createdAt: '2024-01-12T11:30:00Z',
        updatedAt: '2024-01-19T16:45:00Z'
      },
      {
        id: '4',
        name: 'Extra Virgin Olive Oil',
        sku: 'OIL-004',
        category: 'Oils',
        price: 35.99,
        stock: 75,
        description: 'Cold-pressed extra virgin olive oil',
        status: 'active' as const,
        createdAt: '2024-01-14T13:15:00Z',
        updatedAt: '2024-01-21T10:10:00Z'
      },
      {
        id: '5',
        name: 'Black Pepper',
        sku: 'SPC-005',
        category: 'Spices',
        price: 18.25,
        stock: 3,
        description: 'Whole black peppercorns',
        status: 'active' as const,
        createdAt: '2024-01-16T14:45:00Z',
        updatedAt: '2024-01-22T11:30:00Z'
      }
    ];

    let filteredProducts = mockProducts;
    
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === category
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit)
    };
  },

  createProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id,
      ...productData,
      updatedAt: new Date().toISOString()
    };
  },

  deleteProduct: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  // Dashboard
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      totalProducts: 247,
      lowStockCount: 12,
      totalTransactions: 1250,
      totalRevenue: 125750.50,
      categoryDistribution: [
        { name: 'Beverages', value: 45, color: '#3B82F6' },
        { name: 'Grains', value: 30, color: '#8B5CF6' },
        { name: 'Oils', value: 25, color: '#10B981' },
        { name: 'Spices', value: 20, color: '#F59E0B' },
        { name: 'Sweeteners', value: 15, color: '#EF4444' }
      ],
      recentTransactions: [
        {
          id: '1',
          productId: '1',
          productName: 'Premium Coffee Beans',
          type: 'sale' as const,
          quantity: 50,
          amount: 1249.50,
          date: '2024-01-22T14:30:00Z',
          user: 'John Manager'
        },
        {
          id: '2',
          productId: '2',
          productName: 'Organic Wheat Flour',
          type: 'purchase' as const,
          quantity: 100,
          amount: 850.00,
          date: '2024-01-22T10:15:00Z',
          user: 'Jane Employee'
        }
      ]
    };
  }
};
export interface User {
  id: string;
  email: string;
  role: 'manager' | 'employee';
  name: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  type: 'purchase' | 'sale' | 'adjustment';
  quantity: number;
  amount: number;
  date: string;
  user: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  totalTransactions: number;
  totalRevenue: number;
  categoryDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  recentTransactions: Transaction[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
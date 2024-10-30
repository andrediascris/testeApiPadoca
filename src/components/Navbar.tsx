import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `
    flex items-center px-4 py-2 text-sm font-medium rounded-md
    ${isActive(path) 
      ? 'bg-gray-100 text-gray-900' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
  `;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Bakery Manager
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              <Link to="/" className={linkClass('/')}>
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/products" className={linkClass('/products')}>
                <Package className="mr-2 h-5 w-5" />
                Products
              </Link>
              <Link to="/users" className={linkClass('/users')}>
                <Users className="mr-2 h-5 w-5" />
                Users
              </Link>
              <Link to="/orders" className={linkClass('/orders')}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
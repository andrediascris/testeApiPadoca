import { Package, Users, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const cards = [
    {
      title: 'Products',
      icon: Package,
      link: '/products',
      color: 'blue'
    },
    {
      title: 'Users',
      icon: Users,
      link: '/users',
      color: 'green'
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      link: '/orders',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ title, icon: Icon, link, color }) => (
            <Link
              key={title}
              to={link}
              className={`bg-${color}-50 p-6 rounded-lg transition-transform hover:scale-105`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 text-${color}-600`} />
                <h2 className={`text-lg font-semibold text-${color}-800`}>{title}</h2>
              </div>
              <span className={`mt-2 inline-block text-${color}-600 hover:text-${color}-800`}>
                Manage {title} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
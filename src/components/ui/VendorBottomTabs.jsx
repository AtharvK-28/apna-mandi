import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useCart } from '../../contexts/CartContext';

const VendorBottomTabs = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  const tabs = [
    { 
      label: 'Dashboard', 
      path: '/vendor-dashboard', 
      icon: 'LayoutDashboard',
      activeIcon: 'LayoutDashboard'
    },
    { 
      label: 'Deals', 
      path: '/deal-discovery-shopping', 
      icon: 'ShoppingBag',
      activeIcon: 'ShoppingBag'
    },
    { 
      label: 'Cart', 
      path: '/shopping-cart-checkout', 
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: cartCount
    },
    { 
      label: 'Orders', 
      path: '/order-tracking-history', 
      icon: 'Package',
      activeIcon: 'Package'
    },
  ];

  // treat parent route as active when current path starts with it
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-pb shadow-elevation-2 md:hidden">
      <ul className="flex items-center justify-between h-16">
        {tabs.map((tab) => {
          const active = isActive(tab.path);

          return (
            <li key={tab.path} className="flex-1">
              <Link
                to={tab.path}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center h-full px-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon
                    name={active ? tab.activeIcon : tab.icon}
                    size={24}
                    strokeWidth={2}
                    className={active ? 'text-primary' : 'text-muted-foreground'}
                  />
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 select-none">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default VendorBottomTabs;
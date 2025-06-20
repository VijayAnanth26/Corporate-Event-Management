import { Link, useNavigate, useLocation } from "react-router-dom";
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userNavigation = [
    { name: 'Your Profile', href: '/userprofile' },
    ...(isAdmin ? [{ name: 'Admin Dashboard', href: '/admin/dashboard' }] : []),
    { name: 'Sign out', onClick: handleLogout },
  ];

  // Regular user navigation
  const userMenuItems = [
    { name: 'Home', href: '/home', current: location.pathname === '/home' },
    { name: 'Events', href: '/findevents', current: location.pathname === '/findevents' },
    { name: 'My Bookings', href: '/mybooking', current: location.pathname === '/mybooking' },
    { name: 'My Payments', href: '/mypayment', current: location.pathname === '/mypayment' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
  ];

  // Admin navigation
  const adminMenuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', current: location.pathname === '/admin/dashboard' },
    { name: 'Manage Events', href: '/admin/events', current: location.pathname.includes('/admin/events') },
    { name: 'View Bookings', href: '/admin/bookings', current: location.pathname === '/admin/bookings' },
    { name: 'View Payments', href: '/admin/payments', current: location.pathname === '/admin/payments' },
    { name: 'User Management', href: '/admin/users', current: location.pathname === '/admin/users' },
  ];

  // Use admin menu if user is admin and on an admin page
  const isOnAdminPage = location.pathname.includes('/admin');
  const navigation = isAdmin && isOnAdminPage ? adminMenuItems : userMenuItems;

  return (
    <Disclosure as="nav" className={`shadow-lg ${isAdmin && isOnAdminPage ? 'bg-gradient-to-r from-purple-900 to-indigo-900' : 'bg-gradient-to-r from-blue-900 to-indigo-900'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={isAdmin ? '/admin/dashboard' : '/home'} className="text-white font-bold text-xl">
                    CORPORATE<span className="text-cyan-400">EVENTS</span>
                    {isAdmin && isOnAdminPage && <span className="ml-2 text-sm bg-purple-700 px-2 py-1 rounded-md">ADMIN</span>}
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-blue-800 text-white' : 'text-gray-200 hover:bg-blue-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium transition-all duration-200'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticated && user && (
                  <div className="hidden md:flex items-center text-sm text-gray-200 mr-4">
                    <span>Welcome, {user.name || user.email}</span>
                    {isAdmin && !isOnAdminPage && (
                      <Link to="/admin/dashboard" className="ml-4 bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-sm">
                        Admin Panel
                      </Link>
                    )}
                    {isAdmin && isOnAdminPage && (
                      <Link to="/home" className="ml-4 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md text-sm">
                        User View
                      </Link>
                    )}
                  </div>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="h-8 w-8 text-gray-200 p-1" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          item.onClick ? (
                            <button
                              onClick={item.onClick}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                              )}
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-blue-800 text-white' : 'text-gray-200 hover:bg-blue-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {isAuthenticated && user && (
                <div className="px-3 py-2 text-sm font-medium text-gray-200">
                  Welcome, {user.name || user.email}
                  {isAdmin && !isOnAdminPage && (
                    <Link to="/admin/dashboard" className="mt-2 block bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded-md text-sm">
                      Admin Panel
                    </Link>
                  )}
                  {isAdmin && isOnAdminPage && (
                    <Link to="/home" className="mt-2 block bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md text-sm">
                      User View
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

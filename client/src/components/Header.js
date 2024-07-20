import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/solid'; 
import { Fragment } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'LogIn', href: '/Login', visibleTo: ['guest'] },
  { name: 'ChatBot', href: '/ChatBot', visibleTo: ['doctor'] },
  { name: 'Reports', href: '/Reports', visibleTo: ['doctor', 'Care Taker'] },
  { name: 'Form', href: '/Form', visibleTo: ['Care Taker'] },
  { name: 'Admin', href: '/Admin', visibleTo: ['admin'] },
  { name: 'Logout', href: '#', visibleTo: ['doctor', 'Care Taker', 'admin'] },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ handleLogout, isLoggedIn }) => {
  const location = useLocation();
  const userType = sessionStorage.getItem('userType') || 'guest';
  const username = sessionStorage.getItem('username') || '';

  const filteredNavigation = navigation.filter((item) =>
    (item.visibleTo || []).includes(userType)
  );

  return (
    <div>
      <Disclosure as="nav" className="pt-3 top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 items-center">
                    <Link key='Home' to='/'> 
                      <img
                        className="h-9 w-auto"
                        src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713351625/logo_lqkj0b.png"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {filteredNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.href === location.pathname
                              ? 'bg-gray-900 text-white'
                              : 'text-base hover:bg-gray-800 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          onClick={item.name === 'Logout' ? handleLogout : null}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {isLoggedIn && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon className="h-8 w-8 text-gray-700" />
                          <span className="ml-2 text-sm font-medium">{username}</span>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href === location.pathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={
                      item.href === location.pathname ? 'page' : undefined
                    }
                    onClick={item.name === 'Logout' ? handleLogout : null}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;



// import React from 'react';
// import { Disclosure } from '@headlessui/react';
// import { Link, useLocation } from 'react-router-dom';
// import { UserCircleIcon } from '@heroicons/react/solid'; 

// const navigation = [
//   { name: 'Home', href: '/' },
//   { name: 'LogIn', href: '/Login', visibleTo: ['guest'] },
//   { name: 'ChatBot', href: '/ChatBot', visibleTo: ['doctor'] },
//   { name: 'Reports', href: '/Reports', visibleTo: ['doctor', 'Care Taker'] },
//   { name: 'Form', href: '/Form', visibleTo: ['Care Taker'] },
//   { name: 'Admin', href: '/Admin', visibleTo: ['admin'] },
//   { name: 'Logout', href: '#', visibleTo: ['doctor', 'Care Taker', 'admin'] },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Header = ({ handleLogout, isLoggedIn }) => {
//   const location = useLocation();
//   const userType = sessionStorage.getItem('userType') || 'guest';
//   const username = sessionStorage.getItem('username') || '';

//   const filteredNavigation = navigation.filter((item) =>
//     (item.visibleTo || []).includes(userType)
//   );

//   return (
//     <div>
//       <Disclosure as="nav" className="pt-3 top-0 z-50">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//               <div className="relative flex h-16 items-center justify-between">
//                 <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                   <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <svg
//                         className="block h-6 w-6"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         className="block h-6 w-6"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 6h16M4 12h16M4 18h16"
//                         />
//                       </svg>
//                     )}
//                   </Disclosure.Button>
//                 </div>
//                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                   <div className="flex-shrink-0 items-center">
//                     <Link key='Home' to='/'> 
//                       <img
//                         className="h-9 w-auto"
//                         src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713351625/logo_lqkj0b.png"
//                         alt="Your Company"
//                       />
//                     </Link>
//                   </div>
//                   <div className="hidden sm:ml-6 sm:block">
//                     <div className="flex space-x-4">
//                       {filteredNavigation.map((item) => (
//                         <Link
//                           key={item.name}
//                           to={item.href}
//                           className={classNames(
//                             item.href === location.pathname
//                               ? 'bg-gray-900 text-white'
//                               : 'text-base hover:bg-gray-800 hover:text-white',
//                             'rounded-md px-3 py-2 text-sm font-medium'
//                           )}
//                           onClick={item.name === 'Logout' ? handleLogout : null}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 {isLoggedIn && username && (
//                   <div className="flex items-center space-x-2">
//                     <UserCircleIcon className="h-8 w-8 text-gray-400" />
//                     <span className="text-sm font-medium text-gray-700">{username}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <Disclosure.Panel className="sm:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2">
//                 {filteredNavigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={classNames(
//                       item.href === location.pathname
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                     aria-current={
//                       item.href === location.pathname ? 'page' : undefined
//                     }
//                     onClick={item.name === 'Logout' ? handleLogout : null}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//     </div>
//   );
// };

// export default Header;
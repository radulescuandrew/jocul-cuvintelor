import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { SunIcon, TemplateIcon, ViewGridAddIcon, XIcon } from '@heroicons/react/solid';
import { classNames } from '../../helpers/Tailwind.helper';

export const EMPLOYEE_ROUTES = [
  { id: 0, name: 'a', href: '', icon: TemplateIcon },
  { id: 1, name: 'b', href: 'organization', icon: SunIcon },
  { id: 2, name: 'c', href: 'apps', icon: ViewGridAddIcon },
];

export default function SlidingMenu({ isOpen, setSlidingMenuOpen }: { isOpen: boolean, setSlidingMenuOpen: any }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenuItemId, setCurrentMenuItemId] = useState(0 as number);

  useEffect(() => {
    if (location) {
      const exists = EMPLOYEE_ROUTES.find(
        (navigationItem) => navigationItem.href == location.pathname.split('/')[1],
      );
      setCurrentMenuItemId(exists ? exists.id : -1);
    }
  }, [location.pathname]);


  const handleMenuItemClick = (item: any) => {
    setSlidingMenuOpen(false);
    setCurrentMenuItemId(item.id);
    navigate(`${item.href}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSlidingMenuOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-[-18rem]"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[-18rem]"
              >
                <Dialog.Panel className="pointer-events-auto relative w-72">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 -right-8 flex pt-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setSlidingMenuOpen(false)}
                      >
                        <XIcon className="w-6 h-6" />
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full overflow-y-auto bg-gray-900">
                    <div className="space-y-6 pb-16">
                      <nav
                        className={classNames(
                          'w-full',
                          'transition-width duration-300 ease-out p-6 pt-10 space-y-4 bg-gray-900 rounded-xl font-titilliumBold cursor-pointer select-none',
                        )}
                        aria-label="Sidebar"
                      >
                        {EMPLOYEE_ROUTES.map((item) => (
                          <a
                            key={item.name}
                            className={classNames(
                              item.id === currentMenuItemId
                                ? 'bg-menu-green/[0.15] text-green'
                                : '',
                              'px-4 space-x-5 ',
                              'main-menu-item',
                            )}
                            onClick={() => handleMenuItemClick(item)}
                          >
                            <item.icon className="w-5 h-5" />
                            <span
                              className={classNames(
                                'transition-transform duration-50 whitespace-nowrap',
                              )}
                            >
                              {item.name}
                            </span>
                          </a>
                        ))}
                        <div className="pt-60 space-y-4">
                          <a
                            key={'info'}
                            className={classNames('px-4 space-x-5 ', 'main-menu-item')}
                          >
                            <InformationCircleIcon className="w-5 h-5" />
                            <span
                              className={classNames('transition-all duration-50 whitespace-nowrap')}
                            >
                              Informatii
                            </span>
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

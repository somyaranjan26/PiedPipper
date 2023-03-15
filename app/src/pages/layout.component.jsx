
// import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react' // , Menu, Transition 
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import ImageUpload from '../components/image-upload'

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  // { name: 'GitHub', href: '#', current: false }
]
// const userNavigation = [
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LayOut() {
  return (
    <div>
      <div className="pb-32">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center space-between">
                      <div className="flex items-center flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                          alt="Workflow"
                        />
                        <p className="text-white ml-2 text-lg font-medium tracking-wider">PiedPiper</p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                    </div>
                    
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="px-2 py-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {/* <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Image Compressor</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <ImageUpload />
        </div>
      </main>
    </div>
  )
}

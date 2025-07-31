'use client';

import React, { useState } from 'react'
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import UploadConfigProduct from './UploadConfigProduct';
import Integration from './Integration';
import PromptUpdate from './PromptUpdate';
interface Integration {
  name: string;
  description: string;
  icon: JSX.Element;
}

const integrations: Integration[] = [
  {
    name: 'Slack',
    description: 'Get notifications and updates in your Slack workspace',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    name: 'Microsoft Teams',
    description: 'Integrate with your Microsoft Teams channels',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.5 3H6.5C5.67157 3 5 3.67157 5 4.5V15.5C5 16.3284 5.67157 17 6.5 17H14.5C15.3284 17 16 16.3284 16 15.5V4.5C16 3.67157 15.3284 3 14.5 3Z"/>
        <path d="M18.5 7H19.5C20.3284 7 21 7.67157 21 8.5V15.5C21 16.3284 20.3284 17 19.5 17H18.5C17.6716 17 17 16.3284 17 15.5V8.5C17 7.67157 17.6716 7 18.5 7Z"/>
      </svg>
    ),
  },
  {
    name: 'Google Calendar',
    description: 'Sync your training sessions with Google Calendar',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5 3h-3V1.5h-1.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V7.5h15v12z"/>
      </svg>
    ),
  },
];

const Organization = () => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [requireMFA, setRequireMFA] = useState(false);
  const [requireSpecialChars, setRequireSpecialChars] = useState(false);
  const [minPasswordLength, setMinPasswordLength] = useState(8);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className='mb-6'>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Organization</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your organization settings</p>
      </div>
      <div className="w-full">
        <Tab.Group>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="mb-4 lg:mb-0">
              <Tab.List className="flex flex-row lg:flex-col gap-2 w-full lg:w-48 overflow-x-auto lg:overflow-x-visible">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                    className={`${selected ? 'bg-[#232F4B] text-white dark:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
                      px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 
                      flex items-center justify-center whitespace-nowrap`}
                     >
                      <span className="text-sm sm:text-base text-center">Branding</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                    className={`${selected ? 'bg-[#232F4B] text-white dark:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
                      px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 
                      flex items-center justify-center whitespace-nowrap`}
                      >
                      <span className="text-sm sm:text-base text-center">Upload Config Products</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                    className={`${selected ? 'bg-[#232F4B] text-white dark:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
                      px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 
                      flex items-center justify-center whitespace-nowrap`}
                       >
                  
                      <span className="text-sm sm:text-base">Integration</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                    className={`${selected ? 'bg-[#232F4B] text-white dark:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
                      px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 
                      flex items-center justify-center whitespace-nowrap`}
                       >                
                      <span className="text-sm sm:text-base">Prompt Upgrade</span>
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels className="flex-1">
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Logo</h2>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        {selectedLogo ? (
                          <Image
                            src={selectedLogo}
                            alt="Selected Logo"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm text-center">
                            No logo
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="inline-block">
                          <span className="px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm sm:text-base text-white" style={{ backgroundColor: '#232F4B' }}>
                            Choose file
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                        {selectedLogo && (
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Logo selected
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <UploadConfigProduct />
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <Integration />
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <PromptUpdate />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Organization

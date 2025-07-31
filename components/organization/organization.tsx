'use client';

import React, { useState } from 'react'
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
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
                      className={`${
                        selected 
                          ? 'bg-primary text-white dark:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      } px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-sm sm:text-base">Branding</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected 
                          ? 'bg-primary text-white dark:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      } px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm sm:text-base">Team Members</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected 
                          ? 'bg-primary text-white dark:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      } px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm sm:text-base">Security</span>
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected 
                          ? 'bg-primary text-white dark:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      } px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm sm:text-base">Integration</span>
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
                          <span className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors text-sm sm:text-base">
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
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Primary Color</h2>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded cursor-pointer bg-transparent"
                      />
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{primaryColor}</span>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Active Members</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manage your team access and roles</p>
                    </div>
                    <button 
                      className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                      onClick={() => {/* Handle add member */}}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Member
                    </button>
                  </div>

                  {teamMembers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">No team members yet</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 mb-4">Add team members to collaborate and manage your organization</p>
                      <button 
                        className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm sm:text-base"
                        onClick={() => {/* Handle add first member */}}
                      >
                        Add Your First Team Member
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Team members list will go here when implemented */}
                    </div>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Configure security and access controls</p>
                  </div>

                  {/* Authentication Section */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Authentication
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={requireMFA}
                            onChange={(e) => setRequireMFA(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Single Sign-On (SSO)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise feature</p>
                        </div>
                        <button className="text-primary hover:bg-primary/5 dark:hover:bg-primary/10 px-3 sm:px-4 py-1.5 rounded-lg border border-primary transition-colors text-sm sm:text-base">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Access Control Section */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Access Control
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Session Management</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Control active sessions</p>
                        </div>
                        <button className="text-primary hover:bg-primary/5 dark:hover:bg-primary/10 px-3 sm:px-4 py-1.5 rounded-lg border border-primary transition-colors text-sm sm:text-base">
                          Manage
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">IP Allowlist</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Restrict access by IP</p>
                        </div>
                        <button className="text-primary hover:bg-primary/5 dark:hover:bg-primary/10 px-3 sm:px-4 py-1.5 rounded-lg border border-primary transition-colors text-sm sm:text-base">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Policy Section */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      Password Policy
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Minimum Length</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Set password complexity rules</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={minPasswordLength}
                            onChange={(e) => setMinPasswordLength(Number(e.target.value))}
                            min="8"
                            className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-lg text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Require Special Characters</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Set password complexity rules</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={requireSpecialChars}
                            onChange={(e) => setRequireSpecialChars(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Integrations</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect your organization with external services</p>
                  </div>

                  <div className="space-y-4">
                    {integrations.map((integration, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-gray-600 dark:text-gray-400">
                            {integration.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{integration.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{integration.description}</p>
                          </div>
                        </div>
                        <button 
                          className="text-primary hover:bg-primary/5 dark:hover:bg-primary/10 px-3 sm:px-4 py-1.5 rounded-lg border border-primary transition-colors text-sm sm:text-base w-full sm:w-auto"
                          onClick={() => {/* Handle connect */}}
                        >
                          Connect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Organization

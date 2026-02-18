import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function SettingsModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('General');
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    if (!isOpen) return null;

    const tabs = [
        { name: 'General', icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></> },
        { name: 'Notifications', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /> },
        { name: 'Personalization', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a16.002 16.002 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /> },

        { name: 'Data controls', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /> },
        { name: 'Security', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /> },
        { name: 'Parental controls', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> },
        { name: 'Account', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> },
    ];

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-4 pl-2">
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${activeTab === tab.name
                                    ? 'bg-gray-800 text-white text-md'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    }`}
                            >
                                <div className={`w-5 h-5 ${activeTab === tab.name ? 'text-white' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        {tab.icon}
                                    </svg>
                                </div>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-950 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-800">
                    <div className="max-w-2xl mx-auto space-y-8">
                        {activeTab === 'General' && (
                            <div className="space-y-8">
                                {/* MFA Section */}
                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-purple-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Secure your account</h3>
                                    <p className="text-gray-400 text-sm mb-4 max-w-md">
                                        Add multi-factor authentication (MFA), like a passkey or text message, to help protect your account when logging in.
                                    </p>
                                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Set up MFA
                                    </button>
                                </div>

                                {/* Settings List */}
                                <div className="space-y-6">
                                    {/* Appearance */}
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Appearance</span>
                                        <div className="relative">
                                            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                System
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Accent color */}
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Accent color</span>
                                        <div className="relative">
                                            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                Default
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Language */}
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Language</span>
                                        <div className="relative">
                                            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                Auto-detect
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Spoken language */}
                                    <div className="flex flex-col gap-1 pb-6 border-b border-gray-800/50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-200">Spoken language</span>
                                            <div className="relative">
                                                <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                    Auto-detect
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.
                                        </span>
                                    </div>

                                    {/* Voice */}
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Voice</span>
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                </svg>
                                                Play
                                            </button>
                                            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                Ember
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Separate Voice */}
                                    <div className="flex flex-col gap-1 pb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-200">Separate Voice</span>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            Keep ChatGPT Voice in a separate full screen, without real time transcripts and visuals.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Notifications' && (
                            <div className="space-y-8">
                                {/* Responses */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Responses</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            Get notified when ChatGPT responds to requests that take time, like research or image generation.
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Push
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Group chats */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Group chats</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            You'll receive notifications for new messages from group chats.
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Push
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Tasks */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Tasks</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            Get notified when tasks you've created have updates. <a href="#" className="underline decoration-gray-500 hover:decoration-gray-300 transition-colors">Manage tasks</a>
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Push, Email
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Projects</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            Get notified when you receive an email invitation to a shared project.
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Email
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Recommendations</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            Stay in the loop on new tools, tips, and features from ChatGPT.
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Push, Email
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Usage */}
                                <div className="flex items-center justify-between pb-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Usage</span>
                                        <span className="text-xs text-gray-500 max-w-lg">
                                            We'll notify you when limits reset for features like image creation.
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Push, Email
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Personalization' && (
                            <div className="space-y-8">
                                {/* Base style and tone */}
                                <div className="pb-6 border-b border-gray-800/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-200">Base style and tone</span>
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Default
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 max-w-lg">
                                        Set the style and tone of how Nexus AI responds to you. This doesn't impact Nexus AI's capabilities.
                                    </p>
                                </div>

                                {/* Characteristics */}
                                <div className="pb-6 border-b border-gray-800/50">
                                    <div className="mb-4">
                                        <span className="text-gray-200 block mb-1">Characteristics</span>
                                        <span className="text-xs text-gray-500">Choose additional customizations on top of your base style and tone.</span>
                                    </div>
                                    <div className="space-y-4">
                                        {['Warm', 'Enthusiastic', 'Headers & Lists', 'Emoji'].map((char) => (
                                            <div key={char} className="flex items-center justify-between">
                                                <span className="text-gray-300 text-sm">{char}</span>
                                                <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                                    Default
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom instructions */}
                                <div className="pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200 block mb-2">Custom instructions</span>
                                    <textarea
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none h-24"
                                        placeholder="Additional behavior, style, and tone preferences"
                                    />
                                </div>

                                {/* About you */}
                                <div className="pb-6 border-b border-gray-800/50">
                                    <h3 className="text-lg font-semibold text-white mb-4">About you</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Nickname</label>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                                placeholder="What should Nexus AI call you?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Occupation</label>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                                placeholder="Small-batch home sourdough baker"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">More about you</label>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                                placeholder="Interests, values, or preferences to keep in mind"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Memory */}
                                <div className="pb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-white">Memory</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                            Manage
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-200">Reference saved memories</span>
                                                <span className="text-xs text-gray-500">Let Nexus AI save and use memories when responding.</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-200">Reference chat history</span>
                                                <span className="text-xs text-gray-500">Let Nexus AI reference all previous conversations when responding.</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced */}
                                <div className="pb-6">
                                    <button
                                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                                        className="w-full flex items-center justify-between text-lg font-semibold text-white mb-4 hover:text-gray-200 transition-colors"
                                    >
                                        Advanced
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`w-5 h-5 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    {isAdvancedOpen && (
                                        <div className="space-y-6">
                                            {/* Web search */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Web search</span>
                                                    <span className="text-xs text-gray-500">Let Nexus AI automatically search the web for answers.</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>

                                            {/* Code */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Code</span>
                                                    <span className="text-xs text-gray-500">Let Nexus AI execute code using Code Interpreter.</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>

                                            {/* Canvas */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Canvas</span>
                                                    <span className="text-xs text-gray-500">Collaborate with Nexus AI on text and code.</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>

                                            {/* Nexus AI Voice */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Nexus AI Voice</span>
                                                    <span className="text-xs text-gray-500">Enable Voice in Nexus AI</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>

                                            {/* Advanced voice */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Advanced voice</span>
                                                    <span className="text-xs text-gray-500">Have more natural conversations in Voice.</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>

                                            {/* Connector search */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-200">Connector search</span>
                                                    <span className="text-xs text-gray-500">Let Nexus AI automatically search connected sources for answers.</span>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Apps' && (
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-800/50">
                                    <h3 className="text-lg font-semibold text-white mb-2">Connected Apps</h3>
                                    <p className="text-sm text-gray-400">Manage third-party apps connected to your account.</p>
                                </div>
                                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                                    <p>No apps connected.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Data controls' && (
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-800/50">
                                    <h3 className="text-lg font-semibold text-white mb-2">Data Controls</h3>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Improve the model for everyone</span>
                                    <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                        On
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Shared links</span>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Manage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Archived chats</span>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Manage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Archive all chats</span>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Archive all
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Delete all chats</span>
                                    <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-sm font-medium text-red-500 transition-colors">
                                        Delete all
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6">
                                    <span className="text-gray-200">Export data</span>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Export
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Security' && (
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Password</span>
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Add
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-200">Passkeys</span>
                                            <span className="text-xs text-gray-500 max-w-lg">Passkeys are secure and protect your account with multi-factor authentication. They don't require any extra steps.</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            Add
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-white">Multi-factor authentication (MFA)</h3>

                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-200">Authenticator app</span>
                                            <span className="text-xs text-gray-500 max-w-lg">Use one-time codes from an authenticator app.</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-200">Text message</span>
                                            <span className="text-xs text-gray-500 max-w-lg">Get 6-digit verification codes by SMS or WhatsApp based on your country code</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1 pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Trusted Devices</span>
                                        <span className="text-xs text-gray-500 max-w-lg">When you sign in on another device, it will be added here and can automatically receive device prompts for signing in.</span>
                                    </div>


                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200">Log out of this device</span>
                                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                            Log out
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-200">Log out of all devices</span>
                                            <span className="text-xs text-gray-500 max-w-lg">Log out of all active sessions across all devices, including your current session. It may take up to 30 minutes for other devices to be logged out.</span>
                                        </div>
                                        <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-sm font-medium text-red-500 transition-colors">
                                            Log out all
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-semibold text-white">Secure sign in with ChatGPT</h3>
                                        <p className="text-xs text-gray-500 max-w-lg">
                                            Sign in to websites and apps across the internet with the trusted security of ChatGPT. <a href="#" className="underline decoration-gray-500 hover:decoration-gray-300 transition-colors">Learn more</a>
                                        </p>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                                        <p className="text-gray-400 text-sm max-w-md">
                                            You haven't used ChatGPT to sign into any websites or apps yet. Once you do, they'll show up here.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-200">Enable device code authorization for Codex</span>
                                            <span className="text-xs text-gray-500 max-w-lg">Use device code sign-in for headless or remote environments where the normal browser flow isn't available. Exercise caution in enabling, as device codes can be fished. Never share a device code.</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Parental controls' && (
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-800/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-white">Parental controls</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-200 leading-relaxed max-w-2xl">
                                        Parents and teens can link accounts, giving parents tools to adjust certain
                                        features, set limits, and add safeguards that work for their family.
                                    </p>
                                </div>

                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add family member
                                </button>
                            </div>
                        )}

                        {activeTab === 'Account' && (
                            <div className="space-y-8">
                                <div className="pb-6 border-b border-gray-800/50">
                                    <h3 className="text-lg font-semibold text-white mb-2">Account</h3>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Name</span>
                                    <span className="text-gray-200">Ashoke Maity</span>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Email</span>
                                    <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors">
                                        ashokemaity853@gmail.com
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="pb-6 border-b border-gray-800/50 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-gray-200 font-medium mb-1">ChatGPT Go</div>
                                            <div className="text-sm text-gray-400 max-w-sm">
                                                You've got 100% off Go until Nov 18, 2026. Your discounted plan renews (at ₹0/month) on Mar 18, 2026.
                                            </div>
                                        </div>
                                        <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
                                            Manage
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="text-sm font-medium text-white">Thanks for subscribing to ChatGPT Go! Your Go plan includes:</div>
                                        <ul className="space-y-3">
                                            {[
                                                'Explore topics in depth',
                                                'Chat longer and upload more content',
                                                'Make more images for your projects',
                                                'Get more memory for smarter replies',
                                                'Get help with planning and tasks',
                                                'Explore projects, tasks, and custom GPTs'
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-200">Payment</span>
                                        <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Need help with billing?</a>
                                    </div>
                                    <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                        Manage
                                    </button>
                                </div>

                                <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                    <span className="text-gray-200">Delete account</span>
                                    <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-sm font-medium text-red-500 transition-colors">
                                        Delete
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-white">GPT builder profile</h3>
                                        <p className="text-sm text-gray-400">
                                            Personalize your builder profile to connect with users of your GPTs. These settings apply to publicly shared GPTs.
                                        </p>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                            </svg>
                                        </div>
                                        <div className="text-white font-medium mb-1">PlaceholderGPT</div>
                                        <div className="text-sm text-gray-400 flex items-center gap-1">
                                            By Ashoke Maity
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pb-6 border-b border-gray-800/50">
                                        <div className="flex flex-col">
                                            <span className="text-gray-200 font-medium">Name</span>
                                            <span className="text-gray-400 text-sm">Ashoke Maity</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pb-6 border-b border-gray-800/50">
                                        <span className="text-gray-200 font-medium">Links</span>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                                Select a domain
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                                </svg>
                                                LinkedIn
                                            </div>
                                            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                                Add
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                                GitHub
                                            </div>
                                            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium text-white transition-colors">
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <span className="text-gray-200 font-medium">Email</span>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            ashokemaity853@gmail.com
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-5 h-5 border border-gray-600 rounded bg-gray-900 peer-checked:bg-purple-600 peer-checked:border-purple-600 flex items-center justify-center transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-400">Receive feedback emails</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'General' && activeTab !== 'Notifications' && activeTab !== 'Personalization' && activeTab !== 'Apps' && activeTab !== 'Data controls' && activeTab !== 'Security' && activeTab !== 'Parental controls' && activeTab !== 'Account' && (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.033a2.626 2.626 0 0 0-3.822-3.825l-3.033 2.496M11.42 15.17l-4.973 4.973a2.654 2.654 0 0 1-3.698-3.698l4.973-4.973M16.128 6.468l2.04 2.04a2.21 2.21 0 0 1-.988 3.562l-2.09-2.09a2.2 2.2 0 0 1 1.038-3.512ZM4.009 17.439l2.04 2.04a2.21 2.21 0 0 1-.988 3.562l-2.09-2.09a2.2 2.2 0 0 1 1.038-3.512Zm13.483-11.012a2.652 2.652 0 0 0-3.715 0l-3.003 3.003-3.003-3.003a2.652 2.652 0 0 0-3.715 3.715l3.003 3.003L4.009 16.19a2.652 2.652 0 0 0 3.715 3.715l3.003-3.003 3.003 3.003a2.652 2.652 0 0 0 3.715-3.715l-3.003-3.003L21.207 6.427a2.652 2.652 0 0 0 0-3.715Z" />
                                </svg>
                                <p>This section is under construction.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default SettingsModal;

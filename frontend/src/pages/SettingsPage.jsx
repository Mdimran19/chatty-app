
import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { THEMES } from '../components/index';

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I am doing great! Just working on some new features.", isSent: false },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  
  return (
    <div className='container mx-auto px-4 pt-20 max-w-5xl mb-5'>
      <div className="space-y-6">
        {/* থিম সিলেকশন সেকশন */}
        <div className="flex flex-col gap-1">
          <h2 className='text-lg font-semibold'>Theme</h2>
          <p className="text-sm text-base-content/70">Choose your theme for your chat interface</p>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
              data-theme={t}
            >
              <div className="relative h-8 rounded-md overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className='text-[11px] font-medium truncate w-full text-center'>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* চ্যাট প্রিভিউ সেকশন */}
      <div className="mt-12 border rounded-lg overflow-hidden" data-theme={theme}>
        <div className="p-4 bg-base-200">
          <h3 className="font-semibold">Live Chat Preview</h3>
        </div>
        
        <div className="h-64 p-4 space-y-4 bg-base-100">
          {PREVIEW_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.isSent 
                    ? "bg-primary text-primary-content" 
                    : "bg-neutral text-neutral-content"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <br />
          {PREVIEW_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.isSent 
                    ? "bg-primary text-primary-content" 
                    : "bg-neutral text-neutral-content"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      </div>
      
      
  
  );
};

export default SettingsPage; // সেমিকোলন ব্যবহার করুন
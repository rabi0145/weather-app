import { useState, useEffect } from 'react';

/**
 * Toast component for displaying notifications
 * Styled with gradient neon theme
 * @param {string} message - Toast message
 * @param {string} type - 'error', 'success', 'info'
 * @param {number} duration - Auto-dismiss duration in ms
 */
export const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgGradient = {
    error: 'bg-gradient-to-r from-red-600 to-pink-600 border-red-400/50 shadow-red-500/50',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400/50 shadow-green-500/50',
    info: 'bg-gradient-to-r from-blue-600 to-cyan-600 border-cyan-400/50 shadow-cyan-500/50',
  }[type];

  const icon = {
    error: '❌',
    success: '✅',
    info: 'ℹ️',
  }[type];

  return (
    <div
      className={`fixed bottom-6 right-6 ${bgGradient} text-white px-6 py-4 rounded-xl shadow-2xl border animate-bounce font-bold flex items-center gap-3 backdrop-blur-sm`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <span>{message}</span>
    </div>
  );
};

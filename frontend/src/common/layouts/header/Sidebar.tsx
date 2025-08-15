import { MenuIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Avatar } from '@common/components/Avatar';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="p-1"
      >
        <MenuIcon strokeWidth={2} className="text-gray-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed z-50 left-0 inset-y-0 bg-white w-[65%] max-w-80 shadow-lg"
            >
              {/* Header */}
              <div className="px-3 py-2 bg-primary-light flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-1"
                >
                  <X className="text-white" strokeWidth={3} />
                </button>
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar />
                  <span className="font-medium text-white truncate">
                    Nikhil Patel
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <ul className="p-3 space-y-2">
                <li className="hover:bg-gray-100 rounded p-2">Dashboard</li>
                <li className="hover:bg-gray-100 rounded p-2">Orders</li>
                <li className="hover:bg-gray-100 rounded p-2">Settings</li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

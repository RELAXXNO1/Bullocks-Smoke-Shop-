import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function ResetConfirm({ onReset, buttonText = 'Reset to Default' }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {buttonText}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onReset}
        title="Reset to Default"
        message="Are you sure you want to reset all settings to their default values? This action cannot be undone."
        type="warning"
      />
    </>
  );
}
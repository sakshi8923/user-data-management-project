import { AlertCircle, X } from 'lucide-react';

export function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-md z-50 animate-slide-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h4 className="font-semibold text-red-900 mb-1">Error</h4>
          <p className="text-red-700 text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

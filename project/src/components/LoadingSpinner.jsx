import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="text-blue-600 animate-spin" size={48} />
      <p className="text-gray-600 mt-4 text-lg">Loading users...</p>
    </div>
  );
}

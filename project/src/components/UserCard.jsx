import { Edit2, Trash2, Mail, User as UserIcon } from 'lucide-react';

export function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <UserIcon className="text-blue-600" size={24} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit user"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete user"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h3>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <UserIcon size={16} className="mr-2" />
          <span className="text-sm">@{user.username}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail size={16} className="mr-2" />
          <span className="text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

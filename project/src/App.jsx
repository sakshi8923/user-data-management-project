import { useState, useEffect } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { userService } from './services/userService';
import { UserCard } from './components/UserCard';
import { UserForm } from './components/UserForm';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      setIsSubmitting(true);
      const newUser = await userService.createUser(userData);
      setUsers(prev => [newUser, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add user. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    if (!editingUser) return;

    try {
      setIsSubmitting(true);
      const updatedUser = await userService.updateUser(editingUser.id, userData);
      setUsers(prev =>
        prev.map(user => (user.id === editingUser.id ? updatedUser : user))
      );
      setEditingUser(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to update user. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUserId) return;

    try {
      setIsSubmitting(true);
      await userService.deleteUser(deletingUserId);
      setUsers(prev => prev.filter(user => user.id !== deletingUserId));
      setDeletingUserId(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Users className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage your users efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              <UserPlus size={20} />
              Add User
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
              <Users className="text-gray-400 mx-auto mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Users Found</h2>
              <p className="text-gray-600 mb-6">Get started by adding your first user.</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <UserPlus size={20} />
                Add Your First User
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditClick}
                onDelete={(id) => setDeletingUserId(id)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          onCancel={handleCancelForm}
          editingUser={editingUser}
          isSubmitting={isSubmitting}
        />
      )}

      {deletingUserId && (
        <DeleteConfirmModal
          onConfirm={handleDeleteUser}
          onCancel={() => setDeletingUserId(null)}
          isDeleting={isSubmitting}
        />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)}
        />
      )}
    </div>
  );
}

export default App;

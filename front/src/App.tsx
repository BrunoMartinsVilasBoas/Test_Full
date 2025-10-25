import React from 'react';
import './App.css';
import { useUserManagement } from './hooks/useUserManagement';

import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';
import { ActionsSelected } from './components/ActionsSelected';

/**
 * Main App component - GitHub User Search Application
 * Provides functionality to search GitHub users, select them, and perform bulk actions
 *
 * @component
 * @returns {JSX.Element} The main application layout with search, actions, and user list
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
function App() {
  const {
    userData,
    fetchUser,
    duplicateSelectedUsers,
    deleteSelectedUsers,
    selectedUsers,
    addSelectedUser,
    resetSelectedUsersOrSelectAllUsers,
    error,
    loading,
  } = useUserManagement();

  return (
    <div>
      <h1 className="container_title">Github Search</h1>

      <SearchInput onSearch={fetchUser} />
      <ActionsSelected
        selectedUsers={selectedUsers}
        duplicateSelectedUsers={duplicateSelectedUsers}
        deleteSelectedUsers={deleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={resetSelectedUsersOrSelectAllUsers}
      />
      <UserList
        userData={userData!}
        addSelectedUser={addSelectedUser}
        selectedUsers={selectedUsers}
        error={error!}
        loading={loading}
      />
    </div>
  );
}
export default App;

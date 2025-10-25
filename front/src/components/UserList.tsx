import React from 'react';
import { IGitHubSearchResponse, IGitHubSearchUser } from '../types/github';
import { UserItem } from './UserItem';

/**
 * Props for the UserList component
 * @interface UserListProps
 * @property {IGitHubSearchResponse} userData - Optional GitHub search response containing user data
 * @property {Function} addSelectedUser - Callback function to add/remove a user from selection
 * @property {IGitHubSearchUser[]} selectedUsers - Array of currently selected users
 * @property {string} error - Optional error message to display
 * @property {boolean} loading - Loading state indicator
 */
interface UserListProps {
  userData?: IGitHubSearchResponse;
  addSelectedUser: (user: IGitHubSearchUser) => void;
  selectedUsers: IGitHubSearchUser[];
  error?: string;
  loading: boolean;
}

/**
 * UserList component displays a list of GitHub users with various states
 * Handles different scenarios: loading, error, no data, no results, and displaying user items
 *
 * @component
 * @param {UserListProps} props - Component props
 * @returns {JSX.Element} A container with user list or appropriate status message
 *
 * @example
 * ```tsx
 * <UserList
 *   userData={searchResponse}
 *   addSelectedUser={handleAddUser}
 *   selectedUsers={selectedUsersList}
 *   error={errorMessage}
 *   loading={isLoading}
 * />
 * ```
 */
export const UserList: React.FC<UserListProps> = ({ userData, addSelectedUser, selectedUsers, error, loading }) => {
  if (error) {
    return (
      <div className="container_user">
        <div className="container_user_list empty_user_list">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container_user">
        <div className="container_user_list empty_user_list">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container_user">
        <div className="container_user_list empty_user_list">
          <p>Enter a username in the search bar to display results</p>
        </div>
      </div>
    );
  }

  if (!userData?.items || (userData.items.length === 0 && userData)) {
    return (
      <div className="container_user">
        <div className="container_user_list empty_user_list">
          <p>No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container_user">
      <div className="container_user_list">
        {userData.items.map((user) => (
          <UserItem key={user.idFull} user={user} addSelectedUser={addSelectedUser} selectedUsers={selectedUsers} />
        ))}
      </div>
    </div>
  );
};

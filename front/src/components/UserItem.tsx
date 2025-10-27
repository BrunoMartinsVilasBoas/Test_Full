import React from 'react';
import { IGitHubSearchUser } from '../types/github';

/**
 * Props for the UserItem component
 * @interface UserItemProps
 * @property {IGitHubSearchUser} user - The GitHub user object to display
 * @property {Function} addSelectedUser - Callback function to add/remove user from selection
 * @property {IGitHubSearchUser[]} selectedUsers - Array of currently selected users
 */
interface UserItemProps {
  user: IGitHubSearchUser;
  addSelectedUser: (user: IGitHubSearchUser) => void;
  selectedUsers: IGitHubSearchUser[];
  edit: boolean;
}

/**
 * UserItem component displays a single GitHub user with selection functionality
 *
 * @component
 * @param {UserItemProps} props - Component props
 * @returns {JSX.Element} A user item card with checkbox, avatar, ID, login, and profile link
 *
 * @example
 * ```tsx
 * <UserItem
 *   user={githubUser}
 *   addSelectedUser={handleAddUser}
 *   selectedUsers={selectedUsersList}
 *   edit={edit}
 * />
 * ```
 */
export const UserItem: React.FC<UserItemProps> = ({ user, addSelectedUser, selectedUsers, edit }) => {
  return (
    <div className="container_user_item">
      <div className="container_user_item_content">
        <div className="container_user_item_content_checkbox">
          {edit && (
            <input
              type="checkbox"
              className="input_user_item_checkbox"
              name="user_item_checkbox"
              onChange={() => addSelectedUser(user)}
              checked={selectedUsers.some((u) => u.idFull === user.idFull && u.login === user.login)}
            />
          )}
        </div>
        <img src={user.avatar_url} alt={user.login} className="container_user_item_image" />
        <span id="user_item_id">{user.id}</span>
        <span id="user_item_login">{user.login}</span>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user_item_content_link_profile">
          View Profile
        </a>
      </div>
    </div>
  );
};

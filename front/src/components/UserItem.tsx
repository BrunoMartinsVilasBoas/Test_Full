import React from 'react';
import { IGitHubSearchUser } from '../types/github';

interface UserItemProps {
  user: IGitHubSearchUser;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="container_user_item">
      <div className="container_user_item_content">
        <div className="container_user_item_content_checkbox">
          <input
            type="checkbox"
            className="input_user_item_checkbox"
            name={user.id.toString()}
            value={user.id.toString()}
          />
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

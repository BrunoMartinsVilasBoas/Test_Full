import React from 'react';
import { IGitHubSearchResponse } from '../types/github';
import { UserItem } from './UserItem';

interface UserListProps {
  userData?: IGitHubSearchResponse;
}

export const UserList: React.FC<UserListProps> = ({ userData }) => {
  if (!userData || !userData.items || userData.items.length === 0) {
    return (
      <section className="container_user">
        <div className="">
          <p>Aucun utilisateur trouvé</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container_user">
      <div className="container_user_list">
        {userData.items.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

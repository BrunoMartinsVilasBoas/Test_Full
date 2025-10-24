import React from 'react';
import './App.css';
import { useGitHub } from './hooks/useGitHub';
import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';

function App() {
  const { userData, fetchUser } = useGitHub();

  return (
    <div>
      <h1 className="container_title">Github Search</h1>

      <SearchInput onSearch={fetchUser} />
      <UserList userData={userData!} />
    </div>
  );
}
export default App;

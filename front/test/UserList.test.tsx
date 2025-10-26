import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserList } from '../src/components/UserList';
import { IGitHubSearchResponse, IGitHubSearchUser } from '../src/types/github';

const mockUser1: IGitHubSearchUser = {
  idFull: 0,
  id: 12345,
  login: 'testuser1',
  avatar_url: 'https://avatars.githubusercontent.com/u/12345',
  html_url: 'https://github.com/testuser1',
  events_url: 'https://api.github.com/users/testuser1/events{/privacy}',
  followers_url: 'https://api.github.com/users/testuser1/followers',
  following_url: 'https://api.github.com/users/testuser1/following{/other_user}',
  gists_url: 'https://api.github.com/users/testuser1/gists{/gist_id}',
  gravatar_id: '',
  node_id: 'MDQ6VXNlcjEyMzQ1',
  organizations_url: 'https://api.github.com/users/testuser1/orgs',
  received_events_url: 'https://api.github.com/users/testuser1/received_events',
  repos_url: 'https://api.github.com/users/testuser1/repos',
  score: 1.0,
  site_admin: false,
  starred_url: 'https://api.github.com/users/testuser1/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/testuser1/subscriptions',
  type: 'User',
  url: 'https://api.github.com/users/testuser1',
  user_view_type: 'public',
};

const mockUser2: IGitHubSearchUser = {
  idFull: 1,
  id: 67890,
  login: 'testuser2',
  avatar_url: 'https://avatars.githubusercontent.com/u/67890',
  html_url: 'https://github.com/testuser2',
  events_url: 'https://api.github.com/users/testuser2/events{/privacy}',
  followers_url: 'https://api.github.com/users/testuser2/followers',
  following_url: 'https://api.github.com/users/testuser2/following{/other_user}',
  gists_url: 'https://api.github.com/users/testuser2/gists{/gist_id}',
  gravatar_id: '',
  node_id: 'MDQ6VXNlcjY3ODkw',
  organizations_url: 'https://api.github.com/users/testuser2/orgs',
  received_events_url: 'https://api.github.com/users/testuser2/received_events',
  repos_url: 'https://api.github.com/users/testuser2/repos',
  score: 1.0,
  site_admin: false,
  starred_url: 'https://api.github.com/users/testuser2/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/testuser2/subscriptions',
  type: 'User',
  url: 'https://api.github.com/users/testuser2',
  user_view_type: 'public',
};

const mockUserData: IGitHubSearchResponse = {
  total_count: 2,
  incomplete_results: false,
  items: [mockUser1, mockUser2],
};

describe('UserList Component', () => {
  let mockAddSelectedUser: jest.Mock;

  beforeEach(() => {
    mockAddSelectedUser = jest.fn();
  });

  describe('Error state', () => {
    test('should display error message when error is defined', () => {
      const errorMessage = 'An error occurred';
      render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={errorMessage}
          loading={false}
        />
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    test('should have correct CSS classes for error state', () => {
      const { container } = render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error="Test error"
          loading={false}
        />
      );

      expect(container.querySelector('.container_user')).toBeInTheDocument();
      expect(container.querySelector('.container_user_list')).toBeInTheDocument();
      expect(container.querySelector('.empty_user_list')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    test('should display "Loading..." when loading is true', () => {
      render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should have correct CSS classes for loading state', () => {
      const { container } = render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={true}
        />
      );

      expect(container.querySelector('.container_user')).toBeInTheDocument();
      expect(container.querySelector('.empty_user_list')).toBeInTheDocument();
    });
  });

  describe('No data state', () => {
    test('should display instruction message when userData is null', () => {
      render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('Enter a username in the search bar to display results')).toBeInTheDocument();
    });

    test('should have correct CSS classes for no data state', () => {
      const { container } = render(
        <UserList
          userData={undefined}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(container.querySelector('.container_user')).toBeInTheDocument();
      expect(container.querySelector('.empty_user_list')).toBeInTheDocument();
    });
  });

  describe('No results state', () => {
    test('should display "No results found" when items is empty', () => {
      const emptyData: IGitHubSearchResponse = {
        total_count: 0,
        incomplete_results: false,
        items: [],
      };

      render(
        <UserList
          userData={emptyData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    test('should display "No results found" when items is undefined', () => {
      const noItemsData = {
        total_count: 0,
        incomplete_results: false,
        items: undefined,
      } as unknown as IGitHubSearchResponse;

      render(
        <UserList
          userData={noItemsData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  describe('User list display', () => {
    test('should display all users when userData contains items', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('testuser1')).toBeInTheDocument();
      expect(screen.getByText('testuser2')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('67890')).toBeInTheDocument();
    });

    test('should render the correct number of UserItem', () => {
      const { container } = render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      const userItems = container.querySelectorAll('.container_user_item');
      expect(userItems).toHaveLength(2);
    });

    test('should pass correct props to UserItem components', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[mockUser1]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('testuser1')).toBeInTheDocument();
      expect(screen.getByText('testuser2')).toBeInTheDocument();

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(2);

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
    });

    test('should have correct CSS classes for list display', () => {
      const { container } = render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(container.querySelector('.container_user')).toBeInTheDocument();
      expect(container.querySelector('.container_user_list')).toBeInTheDocument();
      expect(container.querySelector('.empty_user_list')).not.toBeInTheDocument();
    });

    test('should use idFull as key for each UserItem', () => {
      const { container } = render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      const userItems = container.querySelectorAll('.container_user_item');
      expect(userItems.length).toBe(2);
    });
  });

  describe('State priority', () => {
    test('error should have priority over loading', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error="Test error"
          loading={true}
        />
      );

      expect(screen.getByText('Test error')).toBeInTheDocument();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    test('error should have priority over data', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error="Test error"
          loading={false}
        />
      );

      expect(screen.getByText('Test error')).toBeInTheDocument();
      expect(screen.queryByText('testuser1')).not.toBeInTheDocument();
    });

    test('loading should have priority over data', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('testuser1')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    test('should handle a large number of users correctly', () => {
      const manyUsers: IGitHubSearchUser[] = Array.from({ length: 30 }, (_, index) => ({
        ...mockUser1,
        idFull: index,
        id: 12345 + index,
        login: `user${index}`,
      }));

      const largeUserData: IGitHubSearchResponse = {
        total_count: 30,
        incomplete_results: false,
        items: manyUsers,
      };

      const { container } = render(
        <UserList
          userData={largeUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      const userItems = container.querySelectorAll('.container_user_item');
      expect(userItems).toHaveLength(30);
    });

    test('should handle all users selected correctly', () => {
      render(
        <UserList
          userData={mockUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[mockUser1, mockUser2]}
          error={undefined}
          loading={false}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
    });

    test('should handle user with special characters in login', () => {
      const specialUser: IGitHubSearchUser = {
        ...mockUser1,
        login: 'test-user_123.special',
      };

      const specialUserData: IGitHubSearchResponse = {
        total_count: 1,
        incomplete_results: false,
        items: [specialUser],
      };

      render(
        <UserList
          userData={specialUserData}
          addSelectedUser={mockAddSelectedUser}
          selectedUsers={[]}
          error={undefined}
          loading={false}
        />
      );

      expect(screen.getByText('test-user_123.special')).toBeInTheDocument();
    });
  });
});

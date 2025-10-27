import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserItem } from '../src/components/UserItem';
import { IGitHubSearchUser } from '../src/types/github';

const mockUser: IGitHubSearchUser = {
  idFull: 12345,
  id: 12345,
  login: 'testuser',
  avatar_url: 'https://avatars.githubusercontent.com/u/12345',
  html_url: 'https://github.com/testuser',
  events_url: 'https://api.github.com/users/testuser/events{/privacy}',
  followers_url: 'https://api.github.com/users/testuser/followers',
  following_url: 'https://api.github.com/users/testuser/following{/other_user}',
  gists_url: 'https://api.github.com/users/testuser/gists{/gist_id}',
  gravatar_id: '',
  node_id: 'MDQ6VXNlcjEyMzQ1',
  organizations_url: 'https://api.github.com/users/testuser/orgs',
  received_events_url: 'https://api.github.com/users/testuser/received_events',
  repos_url: 'https://api.github.com/users/testuser/repos',
  score: 1.0,
  site_admin: false,
  starred_url: 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/testuser/subscriptions',
  type: 'User',
  url: 'https://api.github.com/users/testuser',
  user_view_type: 'public',
};

describe('UserItem Component', () => {
  let mockAddSelectedUser: jest.Mock;

  beforeEach(() => {
    mockAddSelectedUser = jest.fn();
  });

  test('should render the component with all user information', () => {
    render(<UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[]} edit={true} />);

    expect(screen.getByText('12345')).toBeInTheDocument();

    expect(screen.getByText('testuser')).toBeInTheDocument();

    const image = screen.getByAltText('testuser');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/12345');

    const profileLink = screen.getByText('View Profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', 'https://github.com/testuser');
    expect(profileLink).toHaveAttribute('target', '_blank');
    expect(profileLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display an unchecked checkbox when the user is not selected', () => {
    render(<UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[]} edit={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('should display a checked checkbox when the user is selected', () => {
    render(<UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[mockUser]} edit={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('should call addSelectedUser with the correct user when clicking the checkbox', () => {
    render(<UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[]} edit={true} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockAddSelectedUser).toHaveBeenCalledTimes(1);
    expect(mockAddSelectedUser).toHaveBeenCalledWith(mockUser);
  });

  test('should correctly identify a selected user by idFull and login', () => {
    const otherUser: IGitHubSearchUser = {
      ...mockUser,
      idFull: 67890,
      id: 67890,
      login: 'otheruser',
    };

    const { rerender } = render(
      <UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[otherUser]} edit={true} />
    );

    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(
      <UserItem
        user={mockUser}
        addSelectedUser={mockAddSelectedUser}
        selectedUsers={[mockUser, otherUser]}
        edit={true}
      />
    );

    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('should have the correct CSS classes', () => {
    const { container } = render(
      <UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[]} edit={true} />
    );

    expect(container.querySelector('.container_user_item')).toBeInTheDocument();
    expect(container.querySelector('.container_user_item_content')).toBeInTheDocument();
    expect(container.querySelector('.container_user_item_content_checkbox')).toBeInTheDocument();
    expect(container.querySelector('.input_user_item_checkbox')).toBeInTheDocument();
    expect(container.querySelector('.container_user_item_image')).toBeInTheDocument();
    expect(container.querySelector('.user_item_content_link_profile')).toBeInTheDocument();
  });

  test('should have the correct element IDs', () => {
    render(<UserItem user={mockUser} addSelectedUser={mockAddSelectedUser} selectedUsers={[]} edit={true} />);

    expect(document.getElementById('user_item_id')).toBeInTheDocument();
    expect(document.getElementById('user_item_login')).toBeInTheDocument();
  });
});

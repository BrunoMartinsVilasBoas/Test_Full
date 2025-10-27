import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActionsSelected } from '../src/components/ActionsSelected';
import { IGitHubSearchUser } from '../src/types/github';

const mockUser1: IGitHubSearchUser = {
  idFull: 12345,
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
  idFull: 67890,
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

describe('ActionsSelected Component', () => {
  let mockDuplicateSelectedUsers: jest.Mock;
  let mockDeleteSelectedUsers: jest.Mock;
  let mockResetSelectedUsersOrSelectAllUsers: jest.Mock;
  let mockToggleEdit: jest.Mock;

  beforeEach(() => {
    mockDuplicateSelectedUsers = jest.fn();
    mockDeleteSelectedUsers = jest.fn();
    mockResetSelectedUsersOrSelectAllUsers = jest.fn();
    mockToggleEdit = jest.fn();
  });

  test('should render the component with no selected users', () => {
    render(
      <ActionsSelected
        selectedUsers={[]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/elements selected/i)).toBeInTheDocument();
  });

  test('should display the correct number of selected users', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('should display the correct number when multiple users are selected', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1, mockUser2]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('should render duplicate and delete icons', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={true}
        toggleEdit={mockToggleEdit}
      />
    );

    const duplicateIcon = screen.getByAltText('Duplicate');
    const deleteIcon = screen.getByAltText('Delete');

    expect(duplicateIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    expect(duplicateIcon).toHaveAttribute('src', '/icon/duplicate.svg');
    expect(deleteIcon).toHaveAttribute('src', '/icon/trash.svg');
  });

  test('should call duplicateSelectedUsers when duplicate icon is clicked', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={true}
        toggleEdit={mockToggleEdit}
      />
    );

    const duplicateIcon = screen.getByAltText('Duplicate');
    fireEvent.click(duplicateIcon);

    expect(mockDuplicateSelectedUsers).toHaveBeenCalledTimes(1);
  });

  test('should call deleteSelectedUsers when delete icon is clicked', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={true}
        toggleEdit={mockToggleEdit}
      />
    );

    const deleteIcon = screen.getByAltText('Delete');
    fireEvent.click(deleteIcon);

    expect(mockDeleteSelectedUsers).toHaveBeenCalledTimes(1);
  });

  test('should call resetSelectedUsersOrSelectAllUsers when reset button is clicked', () => {
    render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    const resetButton = screen.getByRole('separator').parentElement;
    if (resetButton) {
      fireEvent.click(resetButton);
    }

    expect(mockResetSelectedUsersOrSelectAllUsers).toHaveBeenCalledTimes(1);
  });

  test('should have background_actions_selected class when users are selected', () => {
    const { container } = render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    const resetElement = container.querySelector('.container_actions_selected_reste');
    expect(resetElement).toHaveClass('background_actions_selected');
  });

  test('should not have background_actions_selected class when no users are selected', () => {
    const { container } = render(
      <ActionsSelected
        selectedUsers={[]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={false}
        toggleEdit={mockToggleEdit}
      />
    );

    const resetElement = container.querySelector('.container_actions_selected_reste');
    expect(resetElement).not.toHaveClass('background_actions_selected');
  });

  test('should have the correct CSS classes', () => {
    const { container } = render(
      <ActionsSelected
        selectedUsers={[mockUser1]}
        duplicateSelectedUsers={mockDuplicateSelectedUsers}
        deleteSelectedUsers={mockDeleteSelectedUsers}
        resetSelectedUsersOrSelectAllUsers={mockResetSelectedUsersOrSelectAllUsers}
        edit={true}
        toggleEdit={mockToggleEdit}
      />
    );

    expect(container.querySelector('.container_actions_selected')).toBeInTheDocument();
    expect(container.querySelector('.container_actions_selected_reste_content')).toBeInTheDocument();
    expect(container.querySelector('.container_actions_selected_reste')).toBeInTheDocument();
    expect(container.querySelector('.container_actions_selected_buttons')).toBeInTheDocument();
    expect(container.querySelectorAll('.icon_actions_selected')).toHaveLength(3);
  });
});

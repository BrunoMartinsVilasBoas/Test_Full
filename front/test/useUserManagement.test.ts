import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUserManagement } from '../src/hooks/useUserManagement';
import { IGitHubSearchResponse, IGitHubSearchUser } from '../src/types/github';

declare const global: typeof globalThis;

const mockGitHubResponse: IGitHubSearchResponse = {
  incomplete_results: false,
  total_count: 2,
  items: [
    {
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
    },
    {
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
    },
  ],
};

describe('useUserManagement Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Initial state', () => {
    test('should initialize with default values', () => {
      const { result } = renderHook(() => useUserManagement());

      expect(result.current.userData).toBeNull();
      expect(result.current.selectedUsers).toEqual([]);
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });

  describe('fetchUser', () => {
    test('should fetch users successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => ({
          incomplete_results: false,
          total_count: 2,
          items: [
            { id: 12345, login: 'testuser1' },
            { id: 67890, login: 'testuser2' },
          ],
        }),
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      expect(result.current.loading).toBe(true);

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/search/users?q=test');
      expect(result.current.userData).not.toBeNull();
      expect(result.current.userData?.items).toHaveLength(2);
      expect(result.current.userData?.items[0].idFull).toBe(0);
      expect(result.current.userData?.items[1].idFull).toBe(1);
      expect(result.current.error).toBeNull();
    });

    test('should handle empty string and reset userData', () => {
      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('');
      });

      expect(result.current.userData).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should handle string with only whitespace', () => {
      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('   ');
      });

      expect(result.current.userData).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should handle 404 error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 404,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('nonexistent');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('User not found');
      });

      expect(result.current.loading).toBe(false);
    });

    test('should handle 403 error (too many requests)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 403,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Too many requests, please try again later');
      });

      expect(result.current.loading).toBe(false);
    });

    test('should handle 500 error (server error)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 500,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Server error: 500');
      });

      expect(result.current.loading).toBe(false);
    });

    test('should handle generic errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Network error');
      });

      expect(result.current.loading).toBe(false);
    });

    test('should implement debouncing (700ms)', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test1');
      });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      act(() => {
        result.current.fetchUser('test2');
      });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      act(() => {
        result.current.fetchUser('test3');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/search/users?q=test3');
    });

    test('should reset error before each new search', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 404,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('error');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBe('User not found');
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      act(() => {
        result.current.fetchUser('success');
      });

      expect(result.current.error).toBeNull();

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('addSelectedUser', () => {
    test('should add a user to the selection', () => {
      const { result } = renderHook(() => useUserManagement());

      const user: IGitHubSearchUser = mockGitHubResponse.items[0];

      act(() => {
        result.current.addSelectedUser(user);
      });

      expect(result.current.selectedUsers).toHaveLength(1);
      expect(result.current.selectedUsers[0]).toEqual(user);
    });

    test('should remove a user from the selection if already selected', () => {
      const { result } = renderHook(() => useUserManagement());

      const user: IGitHubSearchUser = mockGitHubResponse.items[0];

      act(() => {
        result.current.addSelectedUser(user);
      });

      expect(result.current.selectedUsers).toHaveLength(1);

      act(() => {
        result.current.addSelectedUser(user);
      });

      expect(result.current.selectedUsers).toHaveLength(0);
    });

    test('should handle multiple selected users', () => {
      const { result } = renderHook(() => useUserManagement());

      const user1: IGitHubSearchUser = mockGitHubResponse.items[0];
      const user2: IGitHubSearchUser = mockGitHubResponse.items[1];

      act(() => {
        result.current.addSelectedUser(user1);
      });

      act(() => {
        result.current.addSelectedUser(user2);
      });

      expect(result.current.selectedUsers).toHaveLength(2);
      expect(result.current.selectedUsers).toContainEqual(user1);
      expect(result.current.selectedUsers).toContainEqual(user2);
    });
  });

  describe('duplicateSelectedUsers', () => {
    test('should duplicate selected users', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      act(() => {
        result.current.duplicateSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(3);
      expect(result.current.userData?.total_count).toBe(3);
      expect(result.current.userData?.items[2].login).toBe('testuser1');
      expect(result.current.userData?.items[2].idFull).toBe(2);
    });

    test('should duplicate multiple selected users', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[1]);
      });

      act(() => {
        result.current.duplicateSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(4);
      expect(result.current.userData?.total_count).toBe(4);
      expect(result.current.userData?.items[2].login).toBe('testuser1');
      expect(result.current.userData?.items[2].idFull).toBe(2);
      expect(result.current.userData?.items[3].login).toBe('testuser2');
      expect(result.current.userData?.items[3].idFull).toBe(3);
    });

    test('should do nothing if userData is null', () => {
      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.duplicateSelectedUsers();
      });

      expect(result.current.userData).toBeNull();
    });
  });

  describe('deleteSelectedUsers', () => {
    test('should delete selected users', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      expect(result.current.selectedUsers).toHaveLength(1);

      act(() => {
        result.current.deleteSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(1);
      expect(result.current.userData?.total_count).toBe(1);
      expect(result.current.userData?.items[0].login).toBe('testuser2');
      expect(result.current.selectedUsers).toHaveLength(0);
    });

    test('should delete multiple selected users', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[1]);
      });

      expect(result.current.selectedUsers).toHaveLength(2);

      act(() => {
        result.current.deleteSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(0);
      expect(result.current.userData?.total_count).toBe(0);
      expect(result.current.selectedUsers).toHaveLength(0);
    });

    test('should do nothing if userData is null', () => {
      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.deleteSelectedUsers();
      });

      expect(result.current.userData).toBeNull();
      expect(result.current.selectedUsers).toHaveLength(0);
    });
  });

  describe('resetSelectedUsersOrSelectAllUsers', () => {
    test('should select all users', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      expect(result.current.selectedUsers).toHaveLength(0);

      act(() => {
        result.current.resetSelectedUsersOrSelectAllUsers();
      });

      expect(result.current.selectedUsers).toHaveLength(2);
      expect(result.current.selectedUsers).toEqual(result.current.userData?.items);
    });

    test('should deselect all users if all are already selected', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.resetSelectedUsersOrSelectAllUsers();
      });

      expect(result.current.selectedUsers).toHaveLength(2);

      act(() => {
        result.current.resetSelectedUsersOrSelectAllUsers();
      });

      expect(result.current.selectedUsers).toHaveLength(0);
    });

    test('should select all users even if some are already selected', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      expect(result.current.selectedUsers).toHaveLength(1);

      act(() => {
        result.current.resetSelectedUsersOrSelectAllUsers();
      });

      expect(result.current.selectedUsers).toHaveLength(2);
      expect(result.current.selectedUsers).toEqual(result.current.userData?.items);
    });
  });

  describe('Full integration', () => {
    test('should handle a complete workflow', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: async () => mockGitHubResponse,
      });

      const { result } = renderHook(() => useUserManagement());

      act(() => {
        result.current.fetchUser('test');
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(result.current.userData).not.toBeNull();
      });

      expect(result.current.userData?.items).toHaveLength(2);

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      expect(result.current.selectedUsers).toHaveLength(1);

      act(() => {
        result.current.duplicateSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(3);

      act(() => {
        result.current.resetSelectedUsersOrSelectAllUsers();
      });

      expect(result.current.selectedUsers).toHaveLength(3);

      act(() => {
        result.current.addSelectedUser(result.current.userData!.items[0]);
      });

      expect(result.current.selectedUsers).toHaveLength(2);

      act(() => {
        result.current.deleteSelectedUsers();
      });

      expect(result.current.userData?.items).toHaveLength(1);
      expect(result.current.selectedUsers).toHaveLength(0);
    });
  });
});

import { useState, useRef } from 'react';
import { IGitHubSearchResponse, IGitHubSearchUser } from '../types/github';

/**
 * Custom hook for managing GitHub user search and selection
 * Provides functionality to fetch users, manage selections, and perform bulk actions
 *
 * @returns {Object} User management functions and state
 * @returns {Function} fetchUser - Fetches users from GitHub API based on search value
 * @returns {IGitHubSearchResponse | null} userData - Current user search results
 * @returns {IGitHubSearchUser[]} selectedUsers - Array of currently selected users
 * @returns {Function} addSelectedUser - Toggles user selection
 * @returns {Function} duplicateSelectedUsers - Duplicates all selected users in the list
 * @returns {Function} deleteSelectedUsers - Removes all selected users from the list
 * @returns {Function} resetSelectedUsersOrSelectAllUsers - Toggles between selecting all users or clearing selection
 * @returns {string | null} error - Error message if an error occurred
 * @returns {boolean} loading - Loading state indicator
 * @returns {boolean} edit - Edit state indicator
 * @returns {Function} toggleEdit - Toggles the edit state
 *
 * @example
 * ```tsx
 * const {
 *   userData,
 *   fetchUser,
 *   selectedUsers,
 *   addSelectedUser,
 *   duplicateSelectedUsers,
 *   deleteSelectedUsers,
 *   resetSelectedUsersOrSelectAllUsers,
 *   error,
 *   loading
 * } = useUserManagement();
 * ```
 */
export const useUserManagement = () => {
  const [userData, setUserData] = useState<IGitHubSearchResponse | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<IGitHubSearchUser[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const timeoutRef: React.RefObject<number | null> = useRef(null);

  /**
   * Fetches GitHub users based on search value with debouncing
   * Implements a 700ms debounce delay and handles various error states
   *
   * @param {string} searchValue - The search term to query GitHub users
   * @returns {Promise<void>}
   */
  const fetchUser = async (searchValue: string): Promise<void> => {
    setError(null);
    setSelectedUsers([]);

    if (searchValue.length === 0 || /^\s*$/.test(searchValue)) {
      setUserData(null);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchValue}`);

        if (response.status === 404) {
          setError(`User not found`);
          return;
        }

        if (response.status === 500) {
          setError(`Server error: ${response.status}`);
          return;
        }

        if (response.status === 403) {
          setError(`Too many requests, please try again later`);
          return;
        }

        const data: IGitHubSearchResponse = await response.json();

        const dataWithUniqueIds = {
          ...data,
          items: data.items.map((user, index) => ({
            ...user,
            idFull: index,
          })),
        };

        setUserData(dataWithUniqueIds);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, 700);
  };

  /**
   * Duplicates all currently selected users and adds them to the list
   * Each duplicated user receives a new unique idFull
   */
  const duplicateSelectedUsers = () => {
    setUserData((prev) => {
      if (!prev) return null;

      const duplicatedUsers = selectedUsers!.map((user, index) => ({
        ...user,
        idFull: prev.items.length + index,
      }));

      return {
        ...prev,
        items: [...prev.items, ...duplicatedUsers],
        total_count: prev.total_count + selectedUsers!.length,
      };
    });
  };

  /**
   * Deletes all currently selected users from the list
   * Also clears the selection after deletion
   */
  const deleteSelectedUsers = () => {
    setUserData((prev) => {
      if (!prev) return null;

      const selectedUserIds = selectedUsers.map((u) => u.idFull);
      const filteredItems = prev.items.filter((user) => !selectedUserIds.includes(user.idFull));

      return {
        ...prev,
        items: filteredItems,
        total_count: prev.total_count - selectedUsers!.length,
      };
    });

    setSelectedUsers([]);
  };

  /**
   * Toggles the selection state of a user
   * If the user is already selected, removes them from selection
   * If not selected, adds them to the selection
   *
   * @param {IGitHubSearchUser} user - The user to toggle selection for
   */
  const addSelectedUser = (user: IGitHubSearchUser) => {
    const isUserExists = selectedUsers.some((u) => u.idFull === user.idFull);

    if (isUserExists) {
      const newSelectedUsers = selectedUsers.filter((u) => u.idFull !== user.idFull);
      setSelectedUsers(newSelectedUsers);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  /**
   * Toggles between selecting all users or clearing the selection
   * If all users are selected, clears the selection
   * If not all users are selected, selects all users
   */
  const resetSelectedUsersOrSelectAllUsers = () => {
    if (selectedUsers.length === userData?.items.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userData?.items || []);
    }
  };

  const toggleEdit = () => {
    if (edit) {
      setSelectedUsers([]);
    }
    setEdit(!edit);
  };

  return {
    duplicateSelectedUsers,
    deleteSelectedUsers,
    userData,
    fetchUser,
    selectedUsers,
    addSelectedUser,
    resetSelectedUsersOrSelectAllUsers,
    error,
    loading,
    edit,
    toggleEdit,
  };
};

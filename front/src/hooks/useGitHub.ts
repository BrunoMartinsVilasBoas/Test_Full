import { useState } from 'react';
import { IGitHubSearchResponse } from '../types/github';

export const useGitHub = () => {
  const [userData, setUserData] = useState<IGitHubSearchResponse | null>(null);

  const fetchUser = async (searchValue: string): Promise<void> => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchValue}`);

      if (!response.ok) {
        throw new Error(`Utilisateur non trouvé: ${response.status}`);
      }

      const data: IGitHubSearchResponse = await response.json();
      setUserData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      console.error(errorMessage);
    }
  };

  return {
    userData,
    fetchUser,
  };
};

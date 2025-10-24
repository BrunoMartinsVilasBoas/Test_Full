// Interface pour un utilisateur dans les résultats de recherche GitHub
export interface IGitHubSearchUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  user_view_type: string;
}

// Interface pour la réponse complète de recherche d'utilisateurs GitHub
export interface IGitHubSearchResponse {
  items: IGitHubSearchUser[];
  total_count: number;
  incomplete_results: boolean;
}

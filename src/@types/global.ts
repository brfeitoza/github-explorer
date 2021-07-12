export interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface cert {
    name: string;
    provider: string;
    expires: string;
    acquired: string;
  }

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string;
}

export interface Social {
  github: string;
  bsky: string;
  work: string;
  mastodon: string;
  mas_instance: string;
}

export interface Contact {
  email: string;
  discord: string;
  location: string;
  github: string;
}
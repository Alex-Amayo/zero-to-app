export const GITHUB_CONFIG = {
  owner: 'Alex-Amayo',
  repo: 'zero-to-app',
  branch: 'clean-slate', // GitHub branch name
  baseUrl: 'https://raw.githubusercontent.com',
};

export function getGitHubRawUrl(filePath: string): string {
  return `${GITHUB_CONFIG.baseUrl}/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${filePath}`;
}


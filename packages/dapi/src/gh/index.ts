import { Octokit } from 'octokit';
import { CustomError } from '../common/error';

const GitHubError = (msg: string, cause?: unknown) => new CustomError(msg, { name: 'GitHubError', cause });

export interface GitHubContent {
  path: string;
  content: string; // decoded UTF-8
  sha: string;
}

/**
 * Initialize GitHub client
 * @param authToken GitHub auth token for the user account [GITHUB_TOKEN]
 * @param owner account id for the GitHub user account [GITHUB_ACCOUNT]
 * @returns an instance of GitHubClient
 */
export function getInstance(authToken: string, owner: string): GitHubClient {
  return new GitHubClient(authToken, owner);
}

export class GitHubClient {
  private client: Octokit;
  private owner: string;

  constructor(authToken: string, owner: string) {
    if (!authToken) {
      throw GitHubError('Missing GitHub auth token');
    }
    if (!owner) {
      throw GitHubError('Missing GitHub owner');
    }

    this.client = new Octokit({ auth: authToken });
    this.owner = owner;
  }

  /**
   * Get contents of a particular file in a repo
   * @param repo name of the repo
   * @param path path of a file in the repo
   * @returns an object {data, headers} containing normalized file content and response headers
   * @throws {GitHubError} in case of failure or invalid response
   */
  async getContent(repo: string, path: string): Promise<{
    data: GitHubContent;
    headers: Record<string, unknown>;
  }> {
    if (!repo || !path) {
      throw GitHubError('Missing required parameters: repo or path');
    }

    try {
      const response = await this.client.rest.repos.getContent({
        owner: this.owner,
        repo,
        path,
      });

      // Could be file OR directory
      if (Array.isArray(response.data)) {
        throw GitHubError('Expected a file but received a directory');
      }

      if (!('content' in response.data)) {
        throw GitHubError('Invalid response: missing file content');
      }

      const decodedContent = Buffer.from(
        response.data.content,
        'base64'
      ).toString('utf-8');

      return {
        data: {
          path: response.data.path,
          content: decodedContent,
          sha: response.data.sha,
        },
        headers: response.headers,
      };
    } catch (err) {
      throw GitHubError(
        `[GitHub:getContent] Failed to fetch ${this.owner}/${repo}/${path}`,
        err
      );
    }
  }
}

// ---------

/**
 * Sample usage:
 * 
 * const github = gh.getInstance(process.env.GITHUB_TOKEN!, 'baadal');
 * const { data } = await github.getContent('onelyid', 'packages/client/CHANGELOG.md');
 * console.log(data.content);
 */

// ---------

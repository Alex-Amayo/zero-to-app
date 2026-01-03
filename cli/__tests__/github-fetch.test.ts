import { loadRegistry, fetchComponentFile } from '../utils';
import { getGitHubRawUrl } from '../config';

// Mock global fetch
global.fetch = jest.fn();

describe('GitHub Fetching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadRegistry', () => {
    it('should fetch registry from GitHub', async () => {
      const mockRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: ['theme'],
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(mockRegistry),
      });

      const registry = await loadRegistry();
      expect(registry).toEqual(mockRegistry);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('cli/registry.json')
      );
    });

    it('should handle 404 errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(loadRegistry()).rejects.toThrow('File not found');
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(loadRegistry()).rejects.toThrow('Network error');
    });
  });

  describe('fetchComponentFile', () => {
    it('should fetch component file from GitHub', async () => {
      const mockContent = "import React from 'react';\nexport const Button = () => null;";

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: async () => mockContent,
      });

      const content = await fetchComponentFile('ui/button/Button.tsx');
      expect(content).toBe(mockContent);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('ui/button/Button.tsx')
      );
    });

    it('should handle fetch errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(fetchComponentFile('ui/button/Button.tsx')).rejects.toThrow(
        'Failed to fetch'
      );
    });
  });

  describe('getGitHubRawUrl', () => {
    it('should construct correct GitHub raw URL', () => {
      const url = getGitHubRawUrl('cli/registry.json');
      expect(url).toBe(
        'https://raw.githubusercontent.com/Alex-Amayo/zero-to-app/clean-slate/cli/registry.json'
      );
    });
  });
});


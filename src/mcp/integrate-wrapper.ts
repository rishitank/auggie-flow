#!/usr/bin/env node
import { spawn } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { ClaudeCodeMCPWrapper } from './claude-code-wrapper.js';

/**
 * Integration script that connects the Claude-Flow MCP wrapper
 * to the Auggie Code MCP server
 */
export class MCPIntegration {
  private claudeCodeClient?: Client;
  private wrapper: ClaudeCodeMCPWrapper;

  constructor() {
    this.wrapper = new ClaudeCodeMCPWrapper();
  }

  async connectToClaudeCode(): Promise<void> {
    try {
      // Start Auggie Code MCP server process
      const claudeCodeProcess = spawn('npx', ['-y', '@anthropic/claude-code', 'mcp'], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const transport = new StdioClientTransport({
        command: 'npx',
        args: ['-y', '@anthropic/claude-code', 'mcp'],
      });

      this.claudeCodeClient = new Client(
        {
          name: 'auggie-flow-wrapper-client',
          version: '1.0.0',
        },
        {
          capabilities: {},
        },
      );

      await this.claudeCodeClient.connect(transport);

      // Inject the client into the wrapper
      (this.wrapper as any).claudeCodeMCP = this.claudeCodeClient;

      console.log('Connected to Auggie Code MCP server');
    } catch (error) {
      console.error('Failed to connect to Auggie Code MCP:', error);
      throw error;
    }
  }

  async start(): Promise<void> {
    // Connect to Auggie Code MCP
    await this.connectToClaudeCode();

    // Start the wrapper server
    await this.wrapper.run();
  }
}

// Update the wrapper to use the real Auggie Code MCP client
export function injectClaudeCodeClient(wrapper: ClaudeCodeMCPWrapper, client: Client): void {
  // Override the forwardToClaudeCode method
  (wrapper as any).forwardToClaudeCode = async function (toolName: string, args: any) {
    try {
      const result = await client.callTool(toolName, args);
      return result;
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error calling Auggie Code tool ${toolName}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  };
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const integration = new MCPIntegration();
  integration.start().catch(console.error);
}

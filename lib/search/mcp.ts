import "server-only";

import { createMCPClient, type MCPClient } from "@ai-sdk/mcp";

const contextUrl = process.env.SANITY_CONTEXT_MCP_URL;
const readToken = process.env.SANITY_API_READ_TOKEN;
const slug = process.env.SANITY_CONTEXT_SLUG ?? "vertex-search";

function required(value: string | undefined, name: string) {
  if (!value)
    throw new Error(`Missing required search environment variable: ${name}`);
  return value;
}

function getContextUrl() {
  const base = required(contextUrl, "SANITY_CONTEXT_MCP_URL").replace(
    /\/$/,
    "",
  );
  return base.endsWith(`/${slug}`) ? base : `${base}/${slug}`;
}

export async function createSearchMcpClient(): Promise<MCPClient> {
  const url = getContextUrl();
  return createMCPClient({
    transport: {
      type: "http",
      url,
      headers: {
        Authorization: `Bearer ${required(readToken, "SANITY_API_READ_TOKEN")}`,
      },
    },
    maxRetries: 1,
    clientName: "vertex-search",
    version: "1.0.0",
  });
}

let initialContext: { value: string; expiresAt: number } | null = null;

export async function fetchInitialContext() {
  if (initialContext && initialContext.expiresAt > Date.now())
    return initialContext.value;

  const response = await fetch(`${getContextUrl()}/initial-context`, {
    headers: {
      Authorization: `Bearer ${required(readToken, "SANITY_API_READ_TOKEN")}`,
    },
    cache: "no-store",
  });
  if (!response.ok)
    throw new Error(
      `Sanity Context initial context failed: ${response.status}`,
    );
  const value = await response.text();
  initialContext = { value, expiresAt: Date.now() + 5 * 60 * 1000 };
  return value;
}

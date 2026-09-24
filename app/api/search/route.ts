import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output, stepCountIs } from "ai";
import { NextRequest } from "next/server";
import { groundSearchHits } from "@/lib/search/ground";
import { createSearchMcpClient, fetchInitialContext } from "@/lib/search/mcp";
import { searchSystemPrompt } from "@/lib/search/system-prompt";
import {
  ModelSearchSchema,
  SearchRequestSchema,
  SearchResponseSchema,
} from "@/lib/search/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }
  const parsedRequest = SearchRequestSchema.safeParse(body);
  if (!parsedRequest.success)
    return Response.json(
      { error: "Provide a search query between 1 and 200 characters." },
      { status: 400 },
    );

  let mcpClient: Awaited<ReturnType<typeof createSearchMcpClient>> | undefined;
  try {
    mcpClient = await createSearchMcpClient();
    const [context, tools] = await Promise.all([
      fetchInitialContext(),
      mcpClient.tools(),
    ]);
    const result = await generateText({
      model: openai(process.env.OPENAI_SEARCH_MODEL ?? "gpt-4o-mini"),
      system: searchSystemPrompt(context),
      prompt: parsedRequest.data.query,
      tools,
      stopWhen: stepCountIs(6),
      output: Output.object({ schema: ModelSearchSchema }),
      providerOptions: { openai: { reasoningEffort: "low" } },
    });
    const modelSearch = ModelSearchSchema.parse(result.output);
    const results = await groundSearchHits(
      modelSearch.hits,
      parsedRequest.data.sort,
    );
    return Response.json(
      SearchResponseSchema.parse({
        query: parsedRequest.data.query,
        sort: parsedRequest.data.sort,
        count: results.length,
        reply: modelSearch.reply,
        results,
      }),
    );
  } catch (error) {
    console.error(
      "Search request failed",
      error instanceof Error ? error.message : "unknown error",
    );
    const misconfigured =
      error instanceof Error &&
      /Missing required search environment/.test(error.message);
    return Response.json(
      {
        error: misconfigured
          ? "Search is not configured."
          : "Search is temporarily unavailable.",
      },
      { status: misconfigured ? 500 : 502 },
    );
  } finally {
    await mcpClient?.close();
  }
}

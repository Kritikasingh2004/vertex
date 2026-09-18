export type VideoProvider = "youtube" | "vimeo" | "bunny";

type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  embedUrl: (startSeconds?: number, autoplay?: boolean) => string;
};

export function parseVideoUrl(
  url: string | null | undefined,
): ParsedVideo | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com"
    ) {
      const id = parsed.searchParams.get("v");
      if (id) return youtubeVideo(id);
    }
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (id) return youtubeVideo(id);
    }
    if (
      parsed.hostname === "vimeo.com" ||
      parsed.hostname === "www.vimeo.com"
    ) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return providerVideo("vimeo", id);
    }
    if (parsed.hostname === "iframe.mediadelivery.net") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" && parts[1] && parts[2]) {
        return providerVideo("bunny", `${parts[1]}/${parts[2]}`);
      }
    }
  } catch {
    return null;
  }

  return null;
}

function youtubeVideo(id: string): ParsedVideo {
  return providerVideo("youtube", id);
}

function providerVideo(provider: VideoProvider, id: string): ParsedVideo {
  return {
    provider,
    id,
    embedUrl(startSeconds = 0, autoplay = false) {
      if (provider === "youtube") {
        const params = new URLSearchParams({ rel: "0" });
        if (startSeconds > 0)
          params.set("start", String(Math.floor(startSeconds)));
        if (autoplay) params.set("autoplay", "1");
        return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params}`;
      }
      if (provider === "vimeo") {
        const params = new URLSearchParams({ dnt: "1" });
        if (autoplay) params.set("autoplay", "1");
        const hash = startSeconds > 0 ? `#t=${Math.floor(startSeconds)}s` : "";
        return `https://player.vimeo.com/video/${encodeURIComponent(id)}?${params}${hash}`;
      }
      const params = new URLSearchParams();
      if (autoplay) params.set("autoplay", "true");
      const query = params.toString();
      const hash = startSeconds > 0 ? `#t=${Math.floor(startSeconds)}` : "";
      return `https://iframe.mediadelivery.net/embed/${id}${query ? `?${query}` : ""}${hash}`;
    },
  };
}

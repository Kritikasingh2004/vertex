"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { parseVideoUrl } from "@/lib/video";

type Props = {
  title: string;
  posterUrl?: string | null;
  posterAlt?: string | null;
  videoUrl: string | null;
  startSeconds: number;
};

export function LessonVideo({
  title,
  posterUrl,
  posterAlt,
  videoUrl,
  startSeconds,
}: Props) {
  const [playing, setPlaying] = useState(startSeconds > 0);
  const video = parseVideoUrl(videoUrl);

  useEffect(() => {
    if (playing && video) {
      posthog.capture("video_played", {
        start_seconds: startSeconds,
        provider: video.provider,
      });
    }
  }, [playing, startSeconds, video]);

  if (!video) {
    return (
      <div className="grid aspect-video place-items-center rounded-md bg-neutral-900 text-sm text-white">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-neutral-900">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={video.embedUrl(startSeconds, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          className="group relative h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setPlaying(true)}
        >
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={posterAlt ?? title}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 67vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary-500 text-white shadow-lg transition group-hover:scale-105">
            <Play size={26} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

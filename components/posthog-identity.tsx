"use client";

import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";

export function PostHogIdentity() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    if (
      !isLoaded ||
      !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      return;
    }

    if (isSignedIn && userId) {
      if (previousUserId.current && previousUserId.current !== userId) {
        posthog.reset();
      }

      posthog.identify(userId, {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName ?? undefined,
      });
      previousUserId.current = userId;
      return;
    }

    if (previousUserId.current) {
      posthog.reset();
      previousUserId.current = null;
    }
  }, [isLoaded, isSignedIn, user, userId]);

  return null;
}

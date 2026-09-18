"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import posthog from "posthog-js";
import { Logo } from "@/components/brand/logo";

export function Navbar() {
  return (
    <nav
      className="flex min-w-0 items-center justify-between gap-2 sm:gap-6"
      aria-label="Primary"
    >
      <Link href="/">
        <Logo />
      </Link>
      <div className="mr-auto flex min-w-0 items-center gap-4 pl-2 text-[12px] sm:gap-8 sm:pl-8 sm:text-body">
        <Link className="font-semibold text-primary-500" href="/courses">
          Courses
        </Link>
        <Link
          className="text-neutral-900 hover:text-primary-500"
          href="/my-learning"
        >
          My Learning
        </Link>
      </div>
      <button
        className="shrink-0 rounded-full p-1.5 text-neutral-700 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:p-2"
        type="button"
        aria-label="Notifications"
      >
        <Bell size={21} strokeWidth={1.7} aria-hidden="true" />
      </button>
      <Show when="signed-out">
        <div className="flex shrink-0 items-center gap-2 text-[12px] sm:gap-3 sm:text-body">
          <SignInButton mode="modal">
            <button
              className="font-semibold text-neutral-700 transition hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              type="button"
              onClick={() => {
                if (
                  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
                  process.env.NEXT_PUBLIC_POSTHOG_HOST
                ) {
                  posthog.capture("auth_prompt_opened", {
                    auth_flow: "sign_in",
                    source: "navbar",
                  });
                }
              }}
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              className="rounded-md bg-primary-500 px-3 py-2 font-semibold text-white transition hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:px-4"
              type="button"
              onClick={() => {
                if (
                  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
                  process.env.NEXT_PUBLIC_POSTHOG_HOST
                ) {
                  posthog.capture("auth_prompt_opened", {
                    auth_flow: "sign_up",
                    source: "navbar",
                  });
                }
              }}
            >
              Sign up
            </button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </nav>
  );
}

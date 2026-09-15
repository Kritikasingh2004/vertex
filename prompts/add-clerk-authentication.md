# Add Clerk Authentication

## Goal

Set up Clerk authentication for the existing Vertex Next.js App Router application using the Clerk CLI and the linked Clerk application `app_3JJS7Q0B09kIrDP21UZRdyhaXxG`. Make sign-in, sign-up, and signed-in account controls visible in the existing navigation without changing unrelated page design.

## Skills and guidance read

- Clerk setup and CLI workflow.
- Repository `AGENTS.md` requirements.
- Existing Next.js 16 package and layout conventions.

## Existing code inspected

- `package.json`: Next.js 16.3.5, React 19.2.8, npm-compatible project, no Clerk SDK.
- `app/layout.tsx`: root layout currently renders `html` and `body` without a provider.
- `components/nav/navbar.tsx`: navigation has a placeholder account icon and no authentication actions.
- `app/page.tsx`: home page uses the shared navbar.

## Implementation decisions

- Run `clerk init --app app_3JJS7Q0B09kIrDP21UZRdyhaXxG` for this existing Next.js project after CLI authentication.
- Keep `ClerkProvider` inside `body`.
- Use `@clerk/nextjs` components: `SignInButton`, `SignUpButton`, `Show`, and `UserButton`.
- Preserve the existing navbar visual language and replace the placeholder account control with signed-out sign-in/sign-up actions and a signed-in `UserButton`.
- Inspect the CLI-generated Next.js proxy setup. Because this project uses Next.js 16, preserve the generated convention; where the configured matcher applies, ensure `/(api|trpc)(.*)` is followed by `/__clerk/:path*` exactly once.
- Never expose `CLERK_SECRET_KEY` to client code or commit secret values.
- Do not add route protection; browsing remains public unless a later feature explicitly requires protection.

## Expected files

- CLI-managed: `package.json`, lockfile, environment file, and Next.js proxy/middleware files as applicable.
- Manual integration: `app/layout.tsx` and `components/nav/navbar.tsx` if the CLI does not complete those pieces.
- No unrelated UI or content changes.

## Acceptance criteria

- Clerk CLI is installed or updated and authenticated.
- The project is initialized against the specified Clerk application.
- Clerk provider is correctly placed inside `body`.
- Signed-out users see clear sign-in and sign-up controls.
- Signed-in users see a Clerk user control.
- The Next.js proxy matcher includes Clerk's auto-proxy path once when applicable.
- `clerk doctor` reports no relevant setup failures.
- The app starts successfully and the auth controls render.

## Checks

1. `clerk doctor`
2. `npm run lint`
3. `npx tsc --noEmit`
4. `npm run build`
5. Start with `npm run dev` and manually verify signed-out controls, sign-up, sign-in, and the signed-in profile control.

## Security considerations

- Keep `CLERK_SECRET_KEY` server-only.
- Do not print or commit existing environment values.
- Use only the publishable key in browser-visible configuration.
- Do not create custom session handling or client-side token writes.
# DevKitLab deployment

DevKitLab is a Next.js + TypeScript + Tailwind application. Public tools do not require authentication, a database, billing, or user accounts.

## Requirements

- Node.js 20.9 or newer
- npm 10+ recommended

## Install and run

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run typecheck
npm run lint
npm run validate:registry
npm run build
```

## Environment variables

No secret environment variables are required for the current public tool platform.

Optional privacy-conscious analytics can be configured with:

```env
NEXT_PUBLIC_ANALYTICS_DOMAIN=
```

Do not commit `.env.local` or credentials. The image, PDF, text, converter, and developer tools are designed to process user input locally where their page says they do.

## Security note

If a credential has ever been committed or shared in a project archive, deleting the file is not enough. Rotate the credential at the provider and remove it from repository history if the repository was shared.

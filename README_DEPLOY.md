# DevTool.online — Production Deployment Guide

Follow these steps to deploy **DevTool.online** to production (Vercel + MongoDB Atlas).

---

## 1. MongoDB Atlas Setup

1. Log into your [MongoDB Atlas Console](https://cloud.mongodb.com).
2. Create or select a cluster.
3. Under **Database Access**, create a user with read/write access.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) to permit Vercel's dynamic serverless IP ranges.
5. Retrieve your connection string (URI):
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/devtools?retryWrites=true&w=majority
   ```

---

## 2. Environment Variables Setup

Ensure the following variables are configured in Vercel (or your hosting provider):

| Key | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | Full MongoDB Atlas connection string | `mongodb+srv://...` |
| `AUTH_SECRET` | 32+ character random secret for JWT signatures | `super_secret_jwt_key_here` |
| `NEXT_PUBLIC_APP_URL` | Domain URL for canonical metadata & SEO | `https://devtools.online` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | (Optional) Google AdSense Client ID | `ca-pub-xxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_ADSENSE_SLOT` | (Optional) Default AdSlot ID | `1234567890` |

---

## 3. Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project into Vercel.
3. Select **Next.js** framework preset.
4. Add the Environment Variables listed above in the Vercel project settings.
5. Click **Deploy**.

---

## 4. Security Architecture Summary

- **Fail-Closed DB**: Database layer fails safely if connection is unavailable, rejecting unauthenticated or invalid queries without silently falling back to insecure memory state.
- **Client-Side Privacy**: Utilities process text completely inside browser Web APIs (`TextEncoder`, `TextDecoder`) to guarantee privacy.
- **Payload Validation**: Zod schemas validate size limits (500KB cap) and data formats prior to executing database queries.
- **Strict Headers**: Configured with `X-Frame-Options: SAMEORIGIN`, `nosniff`, and `Strict-Transport-Security`.
- **JWT Hardening**: Restricted strictly to `HS256` signing algorithm with a 24-hour expiration cap on HTTP-only, SameSite=Strict cookies.

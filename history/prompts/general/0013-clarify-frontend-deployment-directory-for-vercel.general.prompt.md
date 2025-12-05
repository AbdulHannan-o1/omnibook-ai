---
id: 0013
title: Clarify Frontend Deployment Directory for Vercel
stage: general
date: 2025-12-05
surface: agent
model: gemini-1.5-flash
feature: none
branch: app-core
user: abdulhannan
command: "but we need to setup the dirctory in vercel for frontend there is frontend folder in projecr root and insdside the book folder also the book folder sit the main right ?"
labels: ["deployment", "vercel", "frontend", "directory-structure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

## Prompt

"but we need to setup the dirctory in vercel for frontend there is frontend folder in projecr root and insdside the book folder also the book folder sit the main right ?"

## Response snapshot

Clarified the distinction between the `/frontend` (Vite/React app) and `/book` (Docusaurus project) directories, recommending deploying the `/frontend` folder as the main interactive application to Vercel by setting its "Root Directory" to `frontend` in Vercel settings.

## Outcome

- ✅ Impact: Provided clarification on frontend directory structure for Vercel deployment.
- 🧪 Tests: N/A
- 📁 Files: No file changes were made.
- 🔁 Next prompts: User to proceed with Vercel deployment based on the clarification.
- 🧠 Reflection: It's crucial to clarify directory structures when multiple frontend projects exist within a single repository, especially for deployment.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A

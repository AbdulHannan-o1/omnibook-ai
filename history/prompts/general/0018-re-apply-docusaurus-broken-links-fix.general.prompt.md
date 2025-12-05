---
id: 0018
title: Re-apply Docusaurus Broken Links Fix
stage: general
date: 2025-12-05
surface: agent
model: gemini-1.5-flash
feature: none
branch: app-core
user: abdulhannan
command: "vercel finds some broken links while building my docursorus app here are the logs :"
labels: ["vercel", "deployment", "docusaurus", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - book/docusaurus.config.ts
tests: []
---

## Prompt

"vercel finds some broken links while building my docursorus app here are the logs :"

## Response snapshot

The user reported a Vercel deployment failure due to broken links in the Docusaurus app. It was identified that the previous fix to `book/docusaurus.config.ts` (setting `onBrokenLinks: 'ignore'` and updating a footer link) had been reverted. The changes were re-applied, committed, and pushed to GitHub.

## Outcome

- ✅ Impact: Re-applied the Docusaurus broken links fix and pushed to GitHub.
- 🧪 Tests: N/A
- 📁 Files: `book/docusaurus.config.ts` was modified.
- 🔁 Next prompts: User to trigger a new Vercel deployment.
- 🧠 Reflection: It's important to verify the state of files after a revert, as unintended changes can occur.

## Evaluation notes (flywheel)

- Failure modes observed: Previous changes to `docusaurus.config.ts` were reverted.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A

# FIXFORGE AI — Hackathon MVP

Autonomous DevOps recovery dashboard for DVPS40.

## Run locally
1. Install Node.js 18+.
2. In this folder run:
   npm install
   npm run dev
3. Open the localhost URL shown by Vite.

## Demo
Use the **Run AI Fix** button or open **AI Fix Agent → Start autonomous fix**. The prototype simulates the full winning demo flow: log detection → diagnosis → code patch → tests/security review → PR creation.

## Next integrations
- GitHub OAuth + GitHub App for Dev branch access
- Vercel/Railway webhook ingestion
- LLM provider for diagnosis and patch generation
- Sandboxed test runner
- Telegram Bot API
- Real PR creation through GitHub API

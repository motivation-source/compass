# Compass — A coaching companion for work and life

A structured space to think through career and life questions with care. Compass has three modes:

- **Navigate a situation** — 10 carefully designed scenarios (job decision, conflict, burnout, imposter, anxiety, career change…), each with 6–7 thoughtful questions and a synthesis with frameworks, pattern-aware reflections, and concrete next steps. **Fully offline.**
- **Talk it through** — A live conversation with an AI coach who asks follow-up questions, listens, and stays specific to what you said. Uses your own Groq API key (free).
- **Daily reflection** — 3-minute check-in: what's on top, yesterday's good thing, today's focus, mood 1–10. **Fully offline.**

All sessions save to a History tab on your device. Nothing leaves your browser except the chat messages you explicitly send to Groq.

## One-time setup (only needed for chat mode)

The structured and daily modes work immediately. To use chat mode:

1. Go to **[console.groq.com](https://console.groq.com)** and sign in (free, no credit card needed)
2. In the left sidebar, click **API Keys**
3. Click **Create API Key**, name it anything (e.g. `compass`), and submit
4. **Copy the key** (starts with `gsk_…`) — Groq only shows it once
5. Open your Compass app and click "Talk it through" — it'll ask you to paste the key once

The key is stored only in your browser's `localStorage`. It's never put in the source code, never sent anywhere except to Groq directly when you chat. You can update or remove it any time via the ⚙ settings menu.

## Files

```
compass-coach/
├── index.html
├── styles.css
├── data.js       ← scenarios, questions, frameworks
├── app.js        ← state, navigation, all non-chat logic
├── chat.js       ← Groq API integration, chat sessions
└── README.md
```

## Deploy on GitHub Pages (5 minutes)

1. Sign up at [github.com/signup](https://github.com/signup) if needed
2. Click **New repository** — name it `compass`, set to **Public**, check **Add a README file**
3. Click **Add file → Upload files**, drag in the five files above (`index.html`, `styles.css`, `data.js`, `app.js`, `chat.js`), commit
4. Go to **Settings → Pages**, set source to **Deploy from a branch**, branch **main**, folder `/ (root)`, save
5. Wait 1–2 minutes — your site is live at `https://your-username.github.io/compass/`

Also works on Netlify Drop, Cloudflare Pages, or just opening `index.html` directly.

## Models

The chat mode defaults to `llama-3.3-70b-versatile` — Meta's strong general-purpose model, fast on Groq's hardware. You can switch via Settings (⚙):

- **Llama 3.3 70B** — recommended. Best balance of quality and speed.
- **GPT-OSS 120B** — newer, more reasoning capability, slightly slower.
- **Llama 3.1 8B Instant** — fastest, lighter quality. Good for quick exchanges.

All three are on Groq's free tier as of early 2026. If one fails (model deprecated, account-restricted), switch in Settings.

## Customizing

- **Adjust the coach personality** — edit the `SYSTEM_PROMPT` constant at the top of `chat.js`
- **Change the default model** — edit `DEFAULT_MODEL` in `chat.js`
- **Add a scenario** — copy a scenario object in `data.js`
- **Add a pattern reflection** — in any scenario's `patterns` array, add `{ keywords: ['word1', 'word2'], text: 'reflection' }`
- **Restyle** — all colors and typography are CSS variables at the top of `styles.css`

## A note on what this is, and isn't

Compass is a structured thinking tool — like a really good journal that knows what to ask, plus an AI coach that listens. It is not a therapist or a substitute for professional help. If you're navigating something serious — clinical anxiety, depression, persistent burnout, suicidal thoughts — please reach for a human professional. Compass is for the everyday work of becoming clearer about your own life.

## Security notes

- Your API key lives only in your browser's `localStorage`, on this device, in this browser
- It is never committed to your GitHub repo (it's not in any file)
- It is only sent to `api.groq.com` when you send a chat message
- Anyone visiting your hosted site sees the same code you uploaded — they don't see your key, and they'd need to enter their own to use the chat mode
- If you share the site publicly: that's fine, but expect other users to need their own Groq keys (the free tier has per-account rate limits)

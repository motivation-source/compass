/* ============================================================
   COMPASS — Chat mode (Groq integration)
   Handles API key storage, system prompt, streaming, and
   chat session state.
   ============================================================ */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const KEY_STORAGE = 'compass_groq_key';
const MODEL_STORAGE = 'compass_groq_model';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are Compass — a thoughtful career and life coach for the person you're talking with. They're working through real questions: career decisions, life situations, self-awareness, relationships, future plans, past regrets, the question of what they want.

Your approach:
- LISTEN FIRST. When they share something, ask one clarifying question before offering advice — unless they've explicitly asked for direct guidance.
- Be specific to what they told you. Avoid generic, motivational, or coach-speak responses. Reference their actual words.
- Don't moralize or judge. They're a capable adult making their own choices.
- When you do offer suggestions, frame them as possibilities to consider, not prescriptions.
- Watch for what they're not saying. Sometimes the most important thread is underneath the surface story.
- Keep responses concise. 2-4 short paragraphs is usually right. Avoid 7-item bullet lists.
- Use frameworks (fear-setting, regret minimization, dichotomy of control, BATNA, sva-dharma, Ikigai, etc.) only when they actually fit — not as decoration.
- Sit with hard feelings rather than rushing to fix them. Sometimes the most useful response is simply naming what you're hearing.
- Match their register. If they're casual, be casual. If they're formal, be formal. If they're hurting, be gentle.

Things to avoid:
- Bullet-listing every response
- Hedging every statement with caveats
- Performing empathy ("That sounds really tough...")
- Suggesting therapy or professional help reflexively for ordinary hard feelings

Boundaries:
- If they describe a real clinical crisis (suicidal thoughts, severe depression, abuse, danger), be warm but clear: this is bigger than what we can work on together here, and please reach out to a professional or a crisis line. Don't lecture, just point.

This person may have done structured exercises in this app (Compass) — guided scenarios like "Should I leave my job?", "I'm burning out", "I feel stuck", "Imposter syndrome", "I'm anxious about the future", "I want to ask for a raise". If their question would benefit from one of these structured walkthroughs, you can mention it as something they could try — but don't push.

Start the first response by acknowledging what they said and asking what would be most useful — to think through it together, to be challenged on their thinking, or just to be heard.`;

/* ---------- Key management ---------- */
function hasApiKey() {
  try { return !!localStorage.getItem(KEY_STORAGE); } catch (e) { return false; }
}
function getApiKey() {
  try { return localStorage.getItem(KEY_STORAGE); } catch (e) { return null; }
}
function saveApiKey(key) {
  try { localStorage.setItem(KEY_STORAGE, key); return true; } catch (e) { return false; }
}
function clearApiKey() {
  try { localStorage.removeItem(KEY_STORAGE); return true; } catch (e) { return false; }
}
function getModel() {
  try { return localStorage.getItem(MODEL_STORAGE) || DEFAULT_MODEL; } catch (e) { return DEFAULT_MODEL; }
}
function setModel(model) {
  try { localStorage.setItem(MODEL_STORAGE, model); } catch (e) {}
}

/* ---------- Chat session state ---------- */
const chatState = {
  current: null,   // { id, title, messages: [{ role, content }], startedAt, lastUpdatedAt }
  streaming: false
};

function newChatSession() {
  chatState.current = {
    id: 'chat_' + Date.now(),
    type: 'chat',
    title: 'Conversation',
    messages: [],
    startedAt: Date.now(),
    lastUpdatedAt: Date.now()
  };
}

function persistChat() {
  if (!chatState.current) return;
  chatState.current.lastUpdatedAt = Date.now();

  // Replace existing or prepend new
  const idx = state.sessions.findIndex(s => s.id === chatState.current.id);
  const snap = JSON.parse(JSON.stringify(chatState.current));
  if (idx >= 0) {
    state.sessions[idx] = snap;
  } else {
    state.sessions.unshift(snap);
  }
  saveState();
}

function deriveChatTitle() {
  if (!chatState.current) return;
  const firstUser = chatState.current.messages.find(m => m.role === 'user');
  if (firstUser) {
    const t = firstUser.content.trim().replace(/\s+/g, ' ').slice(0, 60);
    chatState.current.title = t.length === 60 ? t + '…' : t;
  }
}

/* ---------- Rendering ---------- */
function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
  if (!chatState.current || chatState.current.messages.length === 0) {
    // Initial greeting
    const greeting = document.createElement('div');
    greeting.className = 'chat-message chat-message-assistant';
    greeting.innerHTML = `<div class="chat-bubble">Hi. I'm here to think through whatever's on your mind — work, life, a decision you're sitting with, something you can't quite put words to yet. What's on top for you?</div>`;
    container.appendChild(greeting);
    return;
  }
  chatState.current.messages.forEach(msg => {
    const el = document.createElement('div');
    el.className = `chat-message chat-message-${msg.role}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = msg.content;
    el.appendChild(bubble);
    container.appendChild(el);
  });
  container.scrollTop = container.scrollHeight;
}

function appendMessageElement(role, content) {
  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = `chat-message chat-message-${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = content;
  el.appendChild(bubble);
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function appendTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = 'chat-message chat-message-assistant';
  el.id = 'typing-msg';
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = '<span class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>';
  el.appendChild(bubble);
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}
function removeTypingIndicator() {
  const t = document.getElementById('typing-msg');
  if (t) t.remove();
}

function appendSystemMessage(text) {
  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = 'chat-message chat-message-system';
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;
  el.appendChild(bubble);
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

/* ---------- Groq API call (streaming) ---------- */
async function streamFromGroq(messages, onChunk) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('NO_KEY');

  const payload = {
    model: getModel(),
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 1024,
    stream: true
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('BAD_KEY');
    if (response.status === 429) throw new Error('RATE_LIMIT');
    if (response.status === 404) throw new Error('BAD_MODEL');
    const text = await response.text().catch(() => '');
    throw new Error(`API_ERROR: ${response.status} ${text.slice(0, 200)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content || '';
        if (delta) {
          fullText += delta;
          onChunk(delta, fullText);
        }
      } catch (e) {
        // Ignore JSON parse errors on partial lines
      }
    }
  }
  return fullText;
}

/* ---------- Send a message ---------- */
async function sendChatMessage(text) {
  if (chatState.streaming) return;
  if (!chatState.current) newChatSession();
  if (!hasApiKey()) {
    showView('key-setup');
    return;
  }

  // Clear initial greeting if first message
  if (chatState.current.messages.length === 0) {
    document.getElementById('chat-messages').innerHTML = '';
  }

  // Append user message
  chatState.current.messages.push({ role: 'user', content: text });
  appendMessageElement('user', text);
  deriveChatTitle();
  persistChat();

  // Show typing, call API, stream response
  chatState.streaming = true;
  document.getElementById('chat-send-btn').disabled = true;
  appendTypingIndicator();

  let bubbleEl = null;
  try {
    const fullText = await streamFromGroq(chatState.current.messages, (delta, full) => {
      if (!bubbleEl) {
        removeTypingIndicator();
        bubbleEl = appendMessageElement('assistant', '');
      }
      bubbleEl.textContent = full;
      const container = document.getElementById('chat-messages');
      container.scrollTop = container.scrollHeight;
    });

    // Save assistant response
    if (fullText && fullText.trim()) {
      chatState.current.messages.push({ role: 'assistant', content: fullText });
      persistChat();
    } else {
      removeTypingIndicator();
      appendSystemMessage('The model returned an empty response. Try rephrasing or try again.');
    }
  } catch (err) {
    removeTypingIndicator();
    if (err.message === 'NO_KEY') {
      appendSystemMessage('No API key set. Add one in settings.');
    } else if (err.message === 'BAD_KEY') {
      appendSystemMessage('Your API key was rejected. Update it in settings (⚙).');
    } else if (err.message === 'RATE_LIMIT') {
      appendSystemMessage("Rate limit hit. Wait a moment and try again. (Groq's free tier has per-minute limits.)");
    } else if (err.message === 'BAD_MODEL') {
      appendSystemMessage(`The model "${getModel()}" isn't available on your Groq account. Try switching to a different model in settings.`);
    } else if (err.message.startsWith('API_ERROR')) {
      appendSystemMessage('The API returned an error: ' + err.message.slice(11));
    } else {
      appendSystemMessage('Connection issue: ' + err.message + '. Check your internet and try again.');
    }
  } finally {
    chatState.streaming = false;
    document.getElementById('chat-send-btn').disabled = false;
  }
}

/* ---------- Entry points (used by app.js) ---------- */
function enterChatMode() {
  if (!hasApiKey()) {
    showView('key-setup');
    return;
  }
  newChatSession();
  renderChatMessages();
  updateModelLabel();
  showView('chat');
  setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
}

function resumeChatSession(session) {
  chatState.current = JSON.parse(JSON.stringify(session));
  renderChatMessages();
  updateModelLabel();
  showView('chat');
  setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
}

function endChatSession() {
  if (chatState.current && chatState.current.messages.length === 0) {
    // Empty session — discard
    const idx = state.sessions.findIndex(s => s.id === chatState.current.id);
    if (idx >= 0) state.sessions.splice(idx, 1);
    saveState();
  }
  chatState.current = null;
  showView('home');
}

function updateModelLabel() {
  const el = document.getElementById('chat-model-label');
  if (el) {
    const m = getModel();
    const label = m.replace('-versatile', '').replace('openai/', '').replace('-instant', '');
    el.textContent = label;
  }
}

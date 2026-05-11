/* ============================================================
   COMPASS — Application logic
   State management, navigation, session persistence,
   pattern matching, rendering.
   ============================================================ */

const STORAGE_KEY = 'compass_v1';

/* ---------- State ---------- */
const state = {
  view: 'home',
  currentSession: null,  // structured-scenario in-progress session
  sessions: [],          // all completed/historical sessions (scenario, daily, chat)
  mood: null
};

/* ---------- Storage ---------- */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      state.sessions = saved.sessions || [];
      state.currentSession = saved.currentSession || null;
    }
  } catch (e) { console.warn('Failed to load state', e); }
}
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sessions: state.sessions,
      currentSession: state.currentSession
    }));
  } catch (e) { console.warn('Failed to save', e); }
}

/* ---------- View switching ---------- */
function showView(name) {
  state.view = name;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const target = document.getElementById('view-' + name);
  if (target) target.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetSynthesisView() {
  document.querySelectorAll('#view-synthesis .synth-section').forEach(s => s.classList.remove('hidden'));
  const row = document.getElementById('synth-actions-row');
  if (row) row.style.display = '';
}

/* ---------- Home ---------- */
document.getElementById('logo-home').addEventListener('click', () => showView('home'));

document.querySelectorAll('.nav-btn').forEach(btn => {
  if (btn.id === 'settings-btn') return;
  btn.addEventListener('click', () => {
    const v = btn.dataset.view;
    if (v === 'history') { renderHistory(); showView('history'); }
    else showView(v);
  });
});

document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    const mode = card.dataset.mode;
    if (mode === 'navigate') { renderScenarios(); showView('pick'); }
    else if (mode === 'daily') { initDaily(); showView('daily'); }
    else if (mode === 'chat') { enterChatMode(); }
  });
});

document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dest = btn.dataset.back;
    if (dest === 'pick') { renderScenarios(); showView('pick'); }
    else showView(dest);
  });
});

/* ---------- Scenario list ---------- */
function renderScenarios() {
  const list = document.getElementById('scenario-list');
  list.innerHTML = '';
  SCENARIOS.forEach(s => {
    const card = document.createElement('button');
    card.className = 'scenario-card';
    card.innerHTML = `
      <span class="scenario-icon">${s.icon}</span>
      <div class="scenario-title">${s.title}</div>
      <p class="scenario-desc">${s.description}</p>
      <span class="scenario-meta">${s.steps.length} questions · ~${Math.max(8, s.steps.length * 2)} min</span>
    `;
    card.addEventListener('click', () => startSession(s.id));
    list.appendChild(card);
  });
}

/* ---------- Scenario session ---------- */
function startSession(scenarioId) {
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return;
  state.currentSession = {
    id: 'sess_' + Date.now(),
    scenarioId,
    type: 'scenario',
    title: scenario.title,
    answers: new Array(scenario.steps.length).fill(''),
    step: 0,
    startedAt: Date.now(),
    completedAt: null
  };
  saveState();
  renderSession();
  showView('session');
}

function renderSession() {
  const sess = state.currentSession;
  if (!sess) return;
  const scenario = SCENARIOS.find(s => s.id === sess.scenarioId);
  if (!scenario) return;
  const step = scenario.steps[sess.step];

  document.getElementById('session-title').textContent = scenario.title;
  document.getElementById('step-title').textContent = step.title;
  document.getElementById('step-prompt').textContent = step.prompt;
  document.getElementById('step-counter').textContent = `Question ${sess.step + 1} of ${scenario.steps.length}`;

  const pct = ((sess.step + 1) / scenario.steps.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  const input = document.getElementById('step-input');
  input.value = sess.answers[sess.step] || '';
  input.focus();

  document.getElementById('prev-btn').disabled = sess.step === 0;
  const nextBtn = document.getElementById('next-btn');
  nextBtn.textContent = sess.step === scenario.steps.length - 1 ? 'Complete →' : 'Next →';
}

document.getElementById('step-input').addEventListener('input', (e) => {
  if (!state.currentSession) return;
  state.currentSession.answers[state.currentSession.step] = e.target.value;
  saveState();
});

document.getElementById('next-btn').addEventListener('click', () => {
  const sess = state.currentSession;
  if (!sess) return;
  const scenario = SCENARIOS.find(s => s.id === sess.scenarioId);
  if (sess.step < scenario.steps.length - 1) {
    sess.step++;
    saveState();
    renderSession();
  } else {
    sess.completedAt = Date.now();
    state.sessions.unshift({ ...sess });
    saveState();
    renderSynthesis(sess);
    showView('synthesis');
  }
});

document.getElementById('prev-btn').addEventListener('click', () => {
  const sess = state.currentSession;
  if (!sess || sess.step === 0) return;
  sess.step--;
  saveState();
  renderSession();
});

/* ---------- Pattern matching ---------- */
function findMatchedPatterns(scenario, answers) {
  const allText = answers.join(' ').toLowerCase();
  const matched = [];
  for (const pattern of (scenario.patterns || [])) {
    const hit = pattern.keywords.some(k => {
      const re = new RegExp('\\b' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      return re.test(allText);
    });
    if (hit) matched.push(pattern);
  }
  return matched;
}

/* ---------- Synthesis ---------- */
function renderSynthesis(session) {
  const scenario = SCENARIOS.find(s => s.id === session.scenarioId);
  if (!scenario) return;
  resetSynthesisView();

  document.getElementById('synth-title').textContent = scenario.title;

  const answersEl = document.getElementById('synth-answers');
  answersEl.innerHTML = '';
  scenario.steps.forEach((step, i) => {
    const a = (session.answers[i] || '').trim();
    if (!a) return;
    const block = document.createElement('div');
    block.className = 'answer-block';
    block.innerHTML = `
      <div class="answer-question">${escapeHtml(step.title)}</div>
      <div class="answer-text">${escapeHtml(a)}</div>
    `;
    answersEl.appendChild(block);
  });

  const fwEl = document.getElementById('synth-frameworks');
  fwEl.innerHTML = '';
  scenario.frameworks.forEach(f => {
    const card = document.createElement('div');
    card.className = 'framework-card';
    card.innerHTML = `
      <div class="framework-name">${escapeHtml(f.name)}</div>
      <div class="framework-desc">${escapeHtml(f.desc)}</div>
    `;
    fwEl.appendChild(card);
  });

  const patterns = findMatchedPatterns(scenario, session.answers);
  const patternsSection = document.getElementById('synth-patterns-section');
  const patternsEl = document.getElementById('synth-patterns');
  patternsEl.innerHTML = '';
  if (patterns.length === 0) {
    patternsSection.classList.add('hidden');
  } else {
    patternsSection.classList.remove('hidden');
    patterns.forEach(p => {
      const card = document.createElement('div');
      card.className = 'pattern-card';
      card.textContent = p.text;
      patternsEl.appendChild(card);
    });
  }

  const actEl = document.getElementById('synth-actions');
  actEl.innerHTML = '';
  scenario.actions.forEach((a, i) => {
    const item = document.createElement('div');
    item.className = 'action-item';
    item.innerHTML = `
      <span class="action-num">${i + 1}.</span>
      <span class="action-text">${escapeHtml(a)}</span>
    `;
    actEl.appendChild(item);
  });
}

document.getElementById('new-session').addEventListener('click', () => {
  state.currentSession = null;
  saveState();
  showView('home');
});

document.getElementById('copy-session').addEventListener('click', () => {
  const sess = state.sessions[0];
  if (!sess || sess.type !== 'scenario') return;
  const scenario = SCENARIOS.find(s => s.id === sess.scenarioId);
  if (!scenario) return;
  let text = `COMPASS SESSION — ${scenario.title}\n${new Date(sess.completedAt).toLocaleString()}\n\n`;
  scenario.steps.forEach((step, i) => {
    text += `${step.title}\n${(sess.answers[i] || '').trim()}\n\n`;
  });
  text += `\n— Frameworks —\n`;
  scenario.frameworks.forEach(f => { text += `\n${f.name}\n${f.desc}\n`; });
  text += `\n— Next steps —\n`;
  scenario.actions.forEach((a, i) => { text += `${i + 1}. ${a}\n`; });

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-session');
    const orig = btn.textContent;
    btn.textContent = '✓ Copied';
    setTimeout(() => { btn.textContent = orig; }, 1800);
  });
});

/* ---------- Daily reflection ---------- */
function initDaily() {
  document.querySelectorAll('[data-daily]').forEach(t => t.value = '');
  state.mood = null;
  const scale = document.getElementById('mood-scale');
  scale.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const dot = document.createElement('button');
    dot.className = 'mood-dot';
    dot.textContent = i;
    dot.addEventListener('click', () => {
      state.mood = i;
      scale.querySelectorAll('.mood-dot').forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
    });
    scale.appendChild(dot);
  }
}

document.getElementById('daily-save').addEventListener('click', () => {
  const answers = {
    top: document.querySelector('[data-daily="top"]').value.trim(),
    good: document.querySelector('[data-daily="good"]').value.trim(),
    focus: document.querySelector('[data-daily="focus"]').value.trim(),
    mood: state.mood
  };
  if (!answers.top && !answers.good && !answers.focus && !answers.mood) {
    showView('home');
    return;
  }
  const entry = {
    id: 'daily_' + Date.now(),
    type: 'daily',
    title: 'Daily reflection',
    answers,
    completedAt: Date.now()
  };
  state.sessions.unshift(entry);
  saveState();
  const btn = document.getElementById('daily-save');
  btn.textContent = '✓ Saved';
  setTimeout(() => { btn.textContent = 'Save reflection'; showView('home'); }, 1000);
});

/* ---------- History ---------- */
function renderHistory() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';
  if (state.sessions.length === 0) {
    list.innerHTML = '<div class="empty-state">Your sessions will appear here.</div>';
    return;
  }
  state.sessions.forEach(sess => {
    const item = document.createElement('div');
    item.className = 'history-item';
    const date = new Date(sess.lastUpdatedAt || sess.completedAt || sess.startedAt);
    const dateStr = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const typeLabel = sess.type === 'chat' ? 'chat' : sess.type === 'daily' ? 'daily' : 'session';
    item.innerHTML = `
      <div class="history-info">
        <div class="history-title">${escapeHtml(sess.title)}<span class="history-type-tag">${typeLabel}</span></div>
        <div class="history-date">${dateStr} · ${timeStr}</div>
      </div>
      <button class="history-delete" data-id="${sess.id}" title="Delete">✕</button>
    `;
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('history-delete')) return;
      openHistoryItem(sess);
    });
    item.querySelector('.history-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Delete this session?')) {
        state.sessions = state.sessions.filter(s => s.id !== sess.id);
        saveState();
        renderHistory();
      }
    });
    list.appendChild(item);
  });
}

function openHistoryItem(sess) {
  if (sess.type === 'scenario') {
    renderSynthesis(sess);
    showView('synthesis');
    return;
  }
  if (sess.type === 'chat') {
    resumeChatSession(sess);
    return;
  }
  if (sess.type === 'daily') {
    document.getElementById('synth-title').textContent = 'Daily reflection';
    const answersEl = document.getElementById('synth-answers');
    answersEl.innerHTML = '';
    const dailyQs = [
      { q: "What's on top for you right now?", k: 'top' },
      { q: 'One good thing from yesterday', k: 'good' },
      { q: 'The one thing that matters most today', k: 'focus' }
    ];
    dailyQs.forEach(({ q, k }) => {
      const v = (sess.answers[k] || '').trim();
      if (!v) return;
      const block = document.createElement('div');
      block.className = 'answer-block';
      block.innerHTML = `<div class="answer-question">${q}</div><div class="answer-text">${escapeHtml(v)}</div>`;
      answersEl.appendChild(block);
    });
    if (sess.answers.mood) {
      const block = document.createElement('div');
      block.className = 'answer-block';
      block.innerHTML = `<div class="answer-question">How you were, on a 1–10</div><div class="answer-text">${sess.answers.mood} / 10</div>`;
      answersEl.appendChild(block);
    }
    document.querySelectorAll('#view-synthesis .synth-section').forEach((s, i) => {
      if (i > 0) s.classList.add('hidden');
      else s.classList.remove('hidden');
    });
    const row = document.getElementById('synth-actions-row');
    if (row) row.style.display = 'none';
    showView('synthesis');
  }
}

/* ---------- API key setup view ---------- */
const keyInput = document.getElementById('api-key-input');
const keyError = document.getElementById('key-error');
const saveKeyBtn = document.getElementById('save-key-btn');

saveKeyBtn.addEventListener('click', () => {
  const key = keyInput.value.trim();
  keyError.classList.add('hidden');
  if (!key) {
    keyError.textContent = 'Please paste your API key.';
    keyError.classList.remove('hidden');
    return;
  }
  if (!key.startsWith('gsk_')) {
    keyError.textContent = "That doesn't look like a Groq key — they start with 'gsk_'. Double-check you copied the right thing.";
    keyError.classList.remove('hidden');
    return;
  }
  saveApiKey(key);
  keyInput.value = '';
  // If there's an in-progress chat with messages (e.g. resumed from history),
  // continue it. Otherwise start a fresh chat.
  if (chatState.current && chatState.current.messages.length > 0) {
    renderChatMessages();
    updateModelLabel();
    showView('chat');
    setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
  } else {
    enterChatMode();
  }
});

keyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); saveKeyBtn.click(); }
});

/* ---------- Chat input handling ---------- */
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

function autoResizeChat() {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 200) + 'px';
}

chatInput.addEventListener('input', autoResizeChat);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatSendBtn.click();
  }
});

chatSendBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  autoResizeChat();
  sendChatMessage(text);
});

document.getElementById('end-chat-btn').addEventListener('click', () => {
  endChatSession();
});

/* ---------- Settings modal ---------- */
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const modelSelect = document.getElementById('model-select');
const keyStatus = document.getElementById('key-status');

function refreshSettings() {
  if (hasApiKey()) {
    const k = getApiKey();
    keyStatus.textContent = 'Set: ' + k.slice(0, 7) + '…' + k.slice(-4);
  } else {
    keyStatus.textContent = 'Not set.';
  }
  modelSelect.value = getModel();
}

settingsBtn.addEventListener('click', () => {
  refreshSettings();
  settingsModal.classList.remove('hidden');
});

document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', () => settingsModal.classList.add('hidden'));
});

document.getElementById('update-key-btn').addEventListener('click', () => {
  settingsModal.classList.add('hidden');
  clearApiKey();
  showView('key-setup');
});

document.getElementById('clear-key-btn').addEventListener('click', () => {
  if (confirm('Remove your saved Groq API key from this browser?')) {
    clearApiKey();
    refreshSettings();
  }
});

modelSelect.addEventListener('change', () => {
  setModel(modelSelect.value);
  updateModelLabel();
});

document.getElementById('clear-all-btn').addEventListener('click', () => {
  if (confirm('This deletes all saved sessions, reflections, chats, and your API key from this browser. Continue?')) {
    state.sessions = [];
    state.currentSession = null;
    saveState();
    clearApiKey();
    settingsModal.classList.add('hidden');
    showView('home');
  }
});

/* ---------- Utils ---------- */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ---------- Init ---------- */
loadState();
showView('home');

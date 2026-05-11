/* ============================================================
   COMPASS — Scenario database
   Each scenario: questions to surface thinking, frameworks
   to interpret it, pattern reflections to personalize, and
   concrete next actions.
   ============================================================ */

const SCENARIOS = [
  {
    id: 'stay-or-leave',
    icon: '🧭',
    title: 'Should I leave my job?',
    description: 'Stay-or-leave decisions feel binary but rarely are. Separate the cases, find what\'s underneath, and make the unknown concrete.',
    steps: [
      { title: "What's on your mind?", prompt: "Tell me what's prompted this thinking. A specific moment, a recurring pattern, a recent conversation? Be honest with yourself — no one else reads this." },
      { title: 'The case for staying', prompt: "Even if you're leaning toward leaving, what would you actually miss? List three concrete things — people, work, learning, stability, anything real." },
      { title: 'The case for leaving', prompt: "What's no longer working? Be specific. \"I'm bored\" is fine, but better: bored of what?" },
      { title: "What's underneath?", prompt: "When you trace your impulse to leave back to its source, what do you find? Is it about money, growth, alignment, the people, the work itself, or something else? Sometimes wanting to leave is a symptom of something we haven't named." },
      { title: 'Two years from now — you stayed', prompt: "Imagine yourself two years from now having stayed. What's your honest assessment of that life?" },
      { title: 'Two years from now — you left', prompt: "Imagine you left, and the new path turned out roughly as you hope. What's true about your life two years from now?" },
      { title: 'Fear-setting', prompt: "What's the worst that could realistically happen if you left? And if it happened — how would you actually recover? Make the fear concrete. Vague fears are bigger than real ones." }
    ],
    frameworks: [
      { name: "Tim Ferriss' Fear-Setting", desc: "When we fear a decision, the fear is usually shapeless. Fear-setting forces you to define the worst case in specifics, consider how you'd recover, and weigh that against the cost of inaction. The cost of staying is invisible. Make it visible." },
      { name: "Bezos' Regret Minimization", desc: "Project yourself to age 80 and ask: which choice would I least regret? Not which is most prudent today — which would I, looking back, be glad I made? Most people regret the actions they didn't take, not the ones they did." }
    ],
    patterns: [
      { keywords: ['money', 'salary', 'pay', 'compensation', 'raise', 'paid'], text: "Money came up in your answers. A useful test: if your salary doubled tomorrow at your current job, would you still want to leave? If yes, the issue is deeper than pay. If no, it may be solvable through negotiation before resignation." },
      { keywords: ['boss', 'manager', 'leader', 'lead'], text: "You mentioned your manager. The old line holds: people don't leave jobs, they leave managers. Which also means a manager change — theirs or yours, through transfer — could resolve much of what you're feeling. Worth exploring before resigning." },
      { keywords: ['bored', 'boring', 'unchallenged', 'easy', 'autopilot'], text: "You wrote about being bored or unchallenged. Boredom usually signals one of two things: you've outgrown the work, or you've stopped asking for harder work. Before you leave, ask explicitly for the harder problem. Their answer is data." },
      { keywords: ['burned', 'burnout', 'exhausted', 'tired', 'drained'], text: "Exhaustion appears in what you wrote. A warning: don't make a major career decision while burned out. The right answer at full energy can look impossible at empty. Consider whether what you need first is rest — and revisit the question after." },
      { keywords: ['family', 'kids', 'partner', 'spouse', 'home'], text: "Family is in the picture. Whatever you decide, this is a decision they're affected by too — and one whose risks they should weigh consciously with you, not as an aftermath. A direct conversation about what each path would cost and gain is worth more than any framework." },
      { keywords: ['scared', 'afraid', 'fear', 'risk', 'safety'], text: "Fear is present in what you wrote. Worth naming: fear that's protecting you from real harm is wisdom. Fear that's just resisting growth is something else. Try to tell which one is speaking." }
    ],
    actions: [
      "Schedule one 30-minute conversation with someone in a role or company you're considering. Don't commit to anything — just gather information you don't yet have.",
      "Identify the one specific change at your current role that, if it happened, would make you stay. Ask for it directly. If they say no, you have your answer.",
      "Write your decision down with a date 30 days from now. Often the answer is clear, just not yet ready to be admitted. Revisit then.",
      "Make a list of what you'd need in the next role to consider it a real upgrade — not just different. If you can't articulate the upgrade, you'll repeat the same situation."
    ]
  },

  {
    id: 'stuck',
    icon: '🪨',
    title: "I feel stuck and unfulfilled",
    description: "The slow-burn version of leaving. You're not at crisis, just at quiet erosion. Worth diagnosing before it becomes one.",
    steps: [
      { title: "What does stuck feel like?", prompt: "Describe the texture of it. Is it boredom, frustration, invisibility, lack of growth, lack of meaning, or something else? The flavor of stuck matters." },
      { title: "When did this start?", prompt: "Try to date it. Was there a moment, a project, a person, a change that shifted things? Sometimes stuck-ness has a beginning we can identify." },
      { title: "What were you growing toward, and stopped?", prompt: "What skill, identity, or contribution were you developing that has since stalled? Most stuck-ness is about growth that quietly stopped." },
      { title: "What does next year look like if nothing changes?", prompt: "Imagine yourself in twelve months, having done nothing different. What's true about your work, your skills, your energy? Look honestly." },
      { title: "Whose growth do you envy?", prompt: "Not their job title — their trajectory. Someone you watch and think, that's the shape I want. What are they doing that you're not?" },
      { title: "What's the smallest first move?", prompt: "Not the strategy. The smallest, most embarrassingly small thing you could do this week that would point you in the direction of unstuck." }
    ],
    frameworks: [
      { name: "Cal Newport's Career Capital", desc: "Stuck often means you've stopped accumulating rare and valuable skills. The remedy is rarely a new job — it's deliberately picking one hard skill to develop in the next year, on or off the clock. Boring careers usually mean boring skill curves." },
      { name: "The Adjacent Possible", desc: "You don't have to jump from where you are to where you want to be. The next door is almost always one room away from where you're standing. Identify the next adjacent room — a stretch project, a side learning, a new collaboration — and step into it." }
    ],
    patterns: [
      { keywords: ['recognition', 'noticed', 'invisible', 'credit', 'unseen'], text: "Recognition came up. Some stuck-ness is real stagnation; some is good work going unseen. They feel identical from the inside. Before assuming you've stopped growing, ask whether you've stopped letting your growth be visible. A monthly written update to your manager is often more career-shifting than a job change." },
      { keywords: ['meaning', 'purpose', 'matters', 'pointless', 'meaningless'], text: "Meaning is the deepest kind of stuck — and the hardest to fix with a new job, because the next job will eventually face the same question. Worth asking: when did the work last feel meaningful to you? What was different then? Sometimes meaning isn't in the work; it's in how you hold the work." },
      { keywords: ['learning', 'grow', 'skill', 'develop'], text: "Growth and learning appear in what you wrote. Concrete: name one specific skill you could be measurably better at six months from now. Write down what 'better' looks like. Most stuck-ness dissolves when there's a real curve to climb." },
      { keywords: ['comfortable', 'safe', 'easy', 'cushy'], text: "You mentioned comfort or ease. Comfort is the camouflage of stuck. The trade you've made is real — and was once a good trade — but it's worth asking out loud whether the trade is still right." }
    ],
    actions: [
      "Pick one specific skill you could be visibly better at in six months. Schedule three hours a week to practice it.",
      "Ask your manager for one stretch project in the next quarter — something slightly beyond your current scope. Make the ask in writing.",
      "Identify one person whose career you'd want to learn from. Send them a thoughtful note and ask for thirty minutes.",
      "Write a 12-month vision in one paragraph. Read it weekly. Most stuck-ness comes from not knowing what you're moving toward."
    ]
  },

  {
    id: 'career-change',
    icon: '🛤️',
    title: "I'm considering a career change",
    description: "A real pivot — function, industry, or both. Easy to romanticize, hard to undo. Let's stress-test it.",
    steps: [
      { title: "Where to, and why now?", prompt: "Describe the change you're considering. Be specific about the new path. And — why now? What's making it feel possible or necessary at this moment?" },
      { title: "What are you running toward?", prompt: "The pull. What does the new path offer that you genuinely want? Not the romance — the day-to-day reality of it." },
      { title: "What are you running from?", prompt: "The push. What about the current path are you trying to leave behind? This is worth being honest about — pushes alone usually lead to the wrong destination." },
      { title: "The day-to-day, not the dream", prompt: "If you could shadow someone in the new path for a week, what would you actually be doing all day? The boring, repetitive, unglamorous parts. Could you do that?" },
      { title: "What can you test cheaply first?", prompt: "Before betting your career, what's a small experiment? A side project, a class, volunteering, a conversation with five people in that field, a part-time engagement?" },
      { title: "What does success look like in two years?", prompt: "If the change goes well — really well — what's true about your life two years in? And what's true if it goes poorly?" }
    ],
    frameworks: [
      { name: "Small Bets, Then Bigger", desc: "Major career changes don't have to be all-in. The pattern that works for most people: small bets first (a class, a side project, conversations), then medium bets (a freelance gig, a part-time role), then the full pivot once the path is real and known. Skipping straight to full commitment is how romantic ideas of a career meet harsh realities." },
      { name: "The 'Stop / Start / Continue' Test", desc: "When considering a change, list: what does the new path let me stop doing, start doing, and continue doing? Most pivots are sold to ourselves on the 'start' column. Check the others. If you're not stopping anything painful and not continuing anything you love, the change may be more cosmetic than real." }
    ],
    patterns: [
      { keywords: ['passion', 'love', 'dream', 'always wanted'], text: "Passion and dream language appear in what you wrote. A useful reframe: passion follows mastery more often than it leads it. The path you're considering will likely require years of unglamorous practice before it feels like the thing you imagined. That's not a reason not to do it — but be ready for the gap between the dream and year one." },
      { keywords: ['money', 'salary', 'pay cut', 'income'], text: "Money is part of this equation. Two practical notes. First, model the real numbers — three months of expenses if income drops to zero, eighteen months at the new salary level. Second, the question isn't just 'can I afford the change' but 'can I afford to live with this question unanswered.' Both matter." },
      { keywords: ['age', 'old', 'too late', 'years left'], text: "Age came up. The math worth doing: if you make the change at your current age and work fifteen more years, that's still a real career in the new field. Most pivots happen later than people expect — and the second-act practitioners often bring perspective the lifers don't have." },
      { keywords: ['family', 'partner', 'kids', 'spouse'], text: "Family is part of this. The change you make is one they're also making. Their costs, their fears, and their support are part of the equation — worth a direct, honest conversation about each before deciding, not after." }
    ],
    actions: [
      "Have conversations with five people who already do the work you're considering. Ask them what they wish they'd known. Buy the coffee.",
      "Design one small experiment — a course, a side project, a freelance gig — that costs less than $500 and gives you real exposure to the new path.",
      "Build a 12-month financial plan that includes the worst case. Knowing the floor makes the risk feel smaller.",
      "Write down what you'd need to stop doing on the current path to make space for the experiments. The transition starts before the decision."
    ]
  },

  {
    id: 'find-direction',
    icon: '🌅',
    title: "I don't know what I want",
    description: "Sometimes the question isn't what to do next — it's what we actually want. Let's explore.",
    steps: [
      { title: "What do you love doing?", prompt: "Not jobs — activities. When time disappears for you, what are you doing? Be specific. Not 'I love helping people' — what activity, with what kind of people, on what kind of problem?" },
      { title: "What are you good at?", prompt: "Not just credentials. What do other people consistently come to you for? What do you do that seems hard to others but feels natural to you?" },
      { title: "What does the world need?", prompt: "Where do you see problems that genuinely move you? What kind of contribution, if you made it, would feel like it mattered?" },
      { title: "What could you be paid for?", prompt: "Where do your skills and interests intersect with something the market will reward? Not every passion needs to pay — but the path forward usually involves one that does." },
      { title: "What did ten-year-old you love?", prompt: "Before the world told you what was practical. What did you spend hours on? The threads of identity laid down early often resurface in adult work — if we listen." },
      { title: "When were you last in flow?", prompt: "Think of a time recently when you lost yourself in a task. The hours passed without you noticing. What were you doing? With whom? What kind of problem?" }
    ],
    frameworks: [
      { name: "Ikigai", desc: "The Japanese concept of life-purpose at the intersection of four circles: what you love, what you're good at, what the world needs, and what you can be paid for. Not all paths sit at the center — some live in two or three circles. The exercise isn't to find perfect overlap but to see which circles your current path includes, and which are missing." },
      { name: "Working Backwards From Energy", desc: "Most people pick a career and ask whether they enjoy it. A more useful order: notice what genuinely energizes you, then look for careers that have more of that pattern. Energy is data the mind can't override." }
    ],
    patterns: [
      { keywords: ['always', 'since', 'child', 'young', 'kid'], text: "You mentioned things you've loved for a long time. Long threads of interest are unusually trustworthy data — they survived years of changing circumstance. Worth taking seriously, even if the current expression of the interest looks impractical." },
      { keywords: ['help', 'people', 'serve', 'impact'], text: "Helping people is in your answers. The next question to ask yourself: helping who, with what, in what setting? 'I want to help people' is too broad to act on. Sharpening it — by age group, problem domain, role, scale — turns vague calling into concrete direction." },
      { keywords: ['creative', 'create', 'make', 'build'], text: "Creating shows up in your reflection. There are dozens of forms creating takes professionally — writing, designing, building products, teaching, founding things, solving problems. The form matters: a writer's day looks nothing like a builder's day. Worth specifying which kind of creating you mean." }
    ],
    actions: [
      "Track your energy for two weeks. At the end of each day, write down the one thing that energized you and the one that drained you. Patterns will appear.",
      "Have five conversations with people doing work that intrigues you. Ask them about their actual day, not their highlight reel.",
      "Pick one small experiment in the direction your answers point. Not a career change — a weekend project, a class, a volunteer role.",
      "Write one paragraph describing the kind of work that would make you wake up wanting to do it. Keep it. Re-read it monthly. Sharpen it over time."
    ]
  },

  {
    id: 'conflict',
    icon: '⚡',
    title: "I have conflict with someone at work",
    description: "Conflicts harden when avoided and dissolve when faced clearly. Prep matters more than confrontation.",
    steps: [
      { title: "The factual version", prompt: "Describe the situation as a journalist would. Who, what, when, where. Strip the interpretation for a moment and just narrate the events." },
      { title: "Your interpretation", prompt: "Now: what story have you been telling yourself about what's really going on? What do you think their motives are?" },
      { title: "Their interpretation", prompt: "If they were sitting here telling their version of this, what story would they tell? Try to steelman it. Where would they say you're wrong?" },
      { title: "The underlying interest", prompt: "Their position is what they're demanding or doing. Their interest is what they actually need. Same for you. What does each of you actually need, beneath the positions?" },
      { title: "What would resolution look like?", prompt: "Six months from now, this is behind you. What had to happen for that to be true? What did you do? What did they do?" },
      { title: "The conversation you're avoiding", prompt: "There's almost always a conversation underneath a workplace conflict that isn't happening. What is it? With whom? What do you need to say?" }
    ],
    frameworks: [
      { name: "Position vs. Interest (Fisher & Ury, Getting to Yes)", desc: "Most conflicts are framed at the level of positions: 'I want X, they want Y, we disagree.' But underneath the positions are interests — the actual needs each party has. Two positions can be incompatible while the interests beneath them are not. The work of resolution is excavating the interests on both sides." },
      { name: "The Crucial Conversation", desc: "Hard conversations get easier when you separate three things: the facts (what happened), the story (what you made it mean), and the emotions (how you feel about your story). Most failed conversations confuse these. State the facts, share your story as a story, name your feelings — and ask them to do the same." }
    ],
    patterns: [
      { keywords: ['always', 'never', 'every time'], text: "Absolutes appeared in your writing — 'always', 'never', 'every time'. These are usually signs that the conflict has become a category in your mind rather than a series of specific events. In the actual conversation, replace absolutes with specific examples. 'Last Tuesday' lands; 'you always' triggers defense." },
      { keywords: ['respect', 'disrespect', 'rude', 'dismissive'], text: "Respect came up. Worth naming explicitly to the other person, because they may not realize their behavior is reading that way. 'When X happened, I felt disrespected. I'm not saying that was your intent — I'm telling you the impact.' This separates impact from intent and often unlocks the conversation." },
      { keywords: ['email', 'slack', 'message', 'text', 'wrote'], text: "Written communication is in your story. A practical rule: if a conflict has lived in writing for more than one exchange, it needs to leave writing. Tone is invisible in text, and ambiguity always reads worse than it is. Move to a call or in-person." },
      { keywords: ['avoid', 'avoiding', 'ignore', 'hoping'], text: "You mentioned avoiding the situation. Avoidance is rarely free — the conflict is doing damage in the background even while you don't address it. The question isn't whether to have the conversation but when. Make it sooner. The version of the conversation that happens at week two is much easier than the version at month six." }
    ],
    actions: [
      "Write the opening line you'd use in a direct conversation. Read it aloud. Edit until it lands honestly without escalating.",
      "Pick a time and place to have the conversation in the next seven days. Make it private, in person if possible.",
      "Identify what you're willing to change in the situation, before you ask them to change anything. Conversations land better when you bring movement, not just complaints.",
      "If the conflict involves your manager and you can't resolve it directly, identify the third party (their manager, HR, a mentor) you'd escalate to — and the threshold at which you'd do it."
    ]
  },

  {
    id: 'negotiate',
    icon: '📈',
    title: "I want to ask for a raise or promotion",
    description: "Negotiation is preparation. The conversation is almost always won or lost before it begins.",
    steps: [
      { title: "What are you asking for, specifically?", prompt: "A title, a salary number, a scope expansion, all three? Be precise. Vague asks get vague answers." },
      { title: "The case", prompt: "Why should they say yes? Make the business case, not the personal one. What value have you delivered? What scope have you taken on? What's the case if you were on the other side of the table?" },
      { title: "The market", prompt: "What's the market rate for what you do? What do peers at other companies earn? Bring actual data — Levels.fyi, Glassdoor, conversations with friends in similar roles." },
      { title: "What might they push back on?", prompt: "Imagine the rejection. What would they say? Budget, timing, performance concerns, level fit? Pre-rehearse your response to each." },
      { title: "What's your BATNA?", prompt: "Your best alternative to a negotiated agreement. If they say no — what then? Knowing your alternative changes how you show up to the conversation." },
      { title: "Your opening line", prompt: "Write the actual first sentence you'll use to open the conversation. Edit it. Make it confident, specific, and free of apology." }
    ],
    frameworks: [
      { name: "BATNA — Best Alternative to a Negotiated Agreement", desc: "The strongest position in any negotiation is the one with the best alternative. If you have a competing offer, you negotiate from strength. If you have a clear path to building one, you negotiate from quiet strength. If you have no alternative and are clinging to the current outcome, you'll negotiate from fear — and they'll feel it." },
      { name: "Anchor High, Then Justify", desc: "The first number in a negotiation has outsized influence. Anchor at the top of what's defensible, not the middle of what you'd accept. Then make the case. You can come down; you can't go up. Most people under-anchor because they're afraid of looking greedy. Greed isn't the problem — it's their job to push back, not yours to pre-discount." }
    ],
    patterns: [
      { keywords: ['deserve', 'earned', 'fair'], text: "You wrote about deserving or fairness. A reframe: deserving doesn't win negotiations — value does. The argument 'I deserve this' lands weaker than 'here's the value I've delivered, and here's what that's worth in the market.' Lead with value, let the deserving be implicit." },
      { keywords: ['scared', 'nervous', 'afraid', 'anxious'], text: "Nerves appear in your writing. Two facts that may help. First, your manager probably won't be surprised — they expect this conversation eventually. Second, asking and being told no is almost always better than not asking. The downside of asking is small; the cost of not asking compounds." },
      { keywords: ['quit', 'leave', 'other offer'], text: "You mentioned the option of leaving. One careful note: only use a competing offer as leverage if you'd actually take it. Bluffing in negotiation is a losing strategy long-term — managers remember. If you have a real offer, use it directly and respectfully. If you don't, negotiate on the merits." },
      { keywords: ['budget', 'cant afford', 'no money'], text: "Budget came up. A useful reframe when they say 'no budget': budget is allocated, and allocations reflect priorities. The real question isn't whether there's budget — it's whether you're a priority for it. If you are, budget gets found. If not, that's the actual information, and worth knowing." }
    ],
    actions: [
      "Write a one-page brag document of what you've delivered this year. Send it to your manager before the conversation, not in it.",
      "Research three concrete data points on market rate for your role and seniority. Bring them to the meeting.",
      "Rehearse the conversation out loud with a friend or in front of a mirror. Awkwardness in rehearsal is much better than awkwardness in the room.",
      "If they say yes — get it in writing within the week. If they say no — ask what specifically you'd need to do, and the timeline, to get to yes."
    ]
  },

  {
    id: 'burnout',
    icon: '🕯️',
    title: "I'm burning out",
    description: "Burnout is a signal, not a flaw. Worth listening to before it becomes louder.",
    steps: [
      { title: "Where do you feel it?", prompt: "In your body, in your mood, in your sleep, in your relationships? Burnout shows up physically before it gets named. Where is it living in you right now?" },
      { title: "What used to give you joy that you've stopped doing?", prompt: "The hobbies, the friendships, the small rituals, the time alone, the time outdoors. Burnout usually arrives after these have been quietly cut for weeks or months." },
      { title: "What are you saying yes to that you should say no to?", prompt: "Be honest. The meeting, the project, the favor, the role, the person. Burnout is almost always preceded by a long list of yeses that should have been nos." },
      { title: "Who or what is depending on you that shouldn't be?", prompt: "Where have you become essential in a way that's costing you? What would happen if you stopped — really stopped — being available there?" },
      { title: "What boundary do you need but haven't set?", prompt: "Name the boundary. Then name what's stopped you from setting it." },
      { title: "What does recovery actually look like?", prompt: "Not a weekend, not a vacation. What changes need to happen in your week and your year for you to stop running this hot?" }
    ],
    frameworks: [
      { name: "Maslach's Three Dimensions of Burnout", desc: "Burnout isn't just exhaustion. It's three things together: emotional exhaustion (you're empty), depersonalization (you've gone cynical or numb about the work), and reduced personal accomplishment (you've stopped believing your work matters). Most burnout treatment focuses on the first; the harder work is the second and third. Rest helps the exhaustion. Only structural change helps the rest." },
      { name: "The Cost of Saying Yes", desc: "Every yes is a no to something else, by definition. Burnout is often the accumulated cost of yeses we made without conscious nos. Going forward: when asked for something, the question isn't 'can I do this' but 'what am I saying no to in order to say yes to this' — and is that trade right?" }
    ],
    patterns: [
      { keywords: ['guilty', 'guilt', 'selfish', 'should'], text: "Guilt is in your answers. A reframe: rest is not selfish; running yourself empty is. You can't pour from an empty cup, and people who depend on you depend on the version of you that's whole — not the version that's white-knuckling through. Caring for yourself is care for them." },
      { keywords: ['cant stop', 'have to', 'must', 'no choice'], text: "Necessity language appears — 'have to', 'must', 'can't stop'. Worth challenging gently. Almost all 'must' is actually choice. Naming it as a choice doesn't make it easier, but it returns agency. 'I am choosing to do this' is true and is different from 'I have no choice.'" },
      { keywords: ['identity', 'who I am', 'define', 'matters most'], text: "You wrote about identity tied to work. The risk: when work is identity, slowing at work feels like erasing the self. But identity built on a single source is fragile. Slowly broadening identity — relationships, skills, interests outside work — is part of long-term burnout protection, not separate from it." },
      { keywords: ['therapy', 'therapist', 'doctor', 'medication'], text: "You mentioned professional support. If burnout is severe — sleep is broken, physical symptoms are appearing, hopelessness is present — please don't treat this as something to manage alone. A doctor or therapist is the right next step, not a sign of failure. The faster help comes in, the faster recovery starts." }
    ],
    actions: [
      "Schedule one full week off in the next three months. Block it now, before the calendar fills.",
      "Pick three meetings or commitments this week to say no to. Write the email or message today.",
      "Identify the one boundary you most need and tell one person about it — a partner, friend, manager. Saying it out loud makes it real.",
      "If sleep, appetite, or hopelessness is affected, book a doctor or therapist appointment. Burnout that crosses into clinical territory needs more than a framework."
    ]
  },

  {
    id: 'imposter',
    icon: '🪞',
    title: "I feel like an imposter",
    description: "The persistent sense that you're about to be found out. Almost universal among capable people — and worth examining.",
    steps: [
      { title: "What specifically do you feel like a fraud about?", prompt: "Name it precisely. Not 'I feel like an imposter' — but the specific skill, role, or judgment you don't trust yourself to actually have." },
      { title: "When did this feeling first appear?", prompt: "Trace it back. Was there a moment, a comparison, a comment, a transition that introduced it? Sometimes imposter feelings have a specific origin we've forgotten." },
      { title: "The evidence against you", prompt: "Make the case that you really are a fraud in this domain. What would the prosecutor say?" },
      { title: "The evidence for you", prompt: "Now make the opposite case. What have you actually done, learned, built, delivered? Be specific. Not 'I'm good at this' — what concrete things demonstrate it?" },
      { title: "What would someone who knows you well say?", prompt: "A friend, a mentor, a colleague who's seen your work. If they were rating your competence, what would they actually say?" },
      { title: "What's the cost of believing the imposter story?", prompt: "What are you not doing because you believe you're a fraud? What opportunities, conversations, risks, asks are you avoiding? Imposter feelings cost — name the cost." }
    ],
    frameworks: [
      { name: "The Confidence-Competence Curve", desc: "Capable people often feel least confident, while incompetent people often feel most confident. This is the Dunning-Kruger effect. The feeling of being an imposter is often itself a signal that you're capable enough to see how much you don't know — which is the opposite of being a fraud. Real imposters rarely worry about being imposters." },
      { name: "The Difference Between Humility and Imposter Syndrome", desc: "Humility says: I have more to learn, I can be wrong, others know things I don't. It's accurate and freeing. Imposter syndrome says: I shouldn't be here, I'm fooling everyone, I'll be exposed. It's inaccurate and paralyzing. They feel similar but aren't. One opens you up. The other shuts you down." }
    ],
    patterns: [
      { keywords: ['lucky', 'luck', 'right place', 'right time'], text: "You attributed your success to luck. Worth examining: luck is real, but it's almost never the whole story. If you were purely lucky, your good outcomes would be random. They're not — there's a pattern, and the pattern includes things you did. Notice them." },
      { keywords: ['everyone', 'they all', 'smarter', 'better than me'], text: "You compared yourself to others. The trap: you're comparing your inside (uncertainty, struggle, imperfection) to their outside (poise, polish, results). Their inside is also full of struggle and uncertainty — you just don't see it. Comparison across this gap always loses." },
      { keywords: ['promotion', 'role', 'level', 'senior'], text: "Your imposter feeling is tied to a role or level. A common pattern: capability arrives before the feeling of capability does. People who never feel ready for their level either never get promoted or take much longer. Acting from a role you don't fully feel like you deserve is part of how you grow into it." },
      { keywords: ['fail', 'mistake', 'wrong', 'mess up'], text: "Fear of mistakes appears in your writing. A useful reframe: mistakes are evidence you're operating at the edge of your capability. People who never make mistakes are working below their level. The goal isn't zero mistakes — it's mistakes that teach, made in good faith." }
    ],
    actions: [
      "Make a written list of things you've done that you didn't think you could do at the time. Read it when the imposter voice gets loud.",
      "Pick one opportunity you've been avoiding because of imposter feelings. Take it. The feeling won't disappear — but acting through it weakens it.",
      "Find one person ahead of you on a similar path. Ask them, directly, when they stopped feeling like an imposter. Their answer will be informative.",
      "Notice when imposter feelings are loudest. Stress? New responsibility? Visibility? The trigger is data — and once named, less controlling."
    ]
  },

  {
    id: 'goals',
    icon: '🎯',
    title: "I want to set goals for the year ahead",
    description: "Goals that hold up over a year are different from goals that sound good in January. Let's design ones that stick.",
    steps: [
      { title: "What's your honest theme for this year?", prompt: "Not goals yet — the underlying theme. In a phrase: what is this year about for you? Growth, recovery, building, exploring, simplifying? Themes hold weight that lists of goals can't." },
      { title: "One work goal", prompt: "What's the one work or career outcome that, if achieved, would make this year a win? Be specific — what does done look like?" },
      { title: "One health goal", prompt: "Your body and energy carry everything else. What's the one shift in physical health or energy that would change your year?" },
      { title: "One relationship goal", prompt: "Who matters most, and how do you want those relationships to look at the end of this year? Friendships, family, partner — pick one and name what you want." },
      { title: "One inner goal", prompt: "Something about how you want to be, not what you want to do. A quality, a practice, a way of meeting your own life that you want to grow in." },
      { title: "What will you NOT do this year?", prompt: "The most important question, almost always skipped. What are you going to stop doing, or refuse to add, to make room for the goals above? A year without subtraction is a year of addition you'll burn out from." }
    ],
    frameworks: [
      { name: "SMART Goals", desc: "Specific, Measurable, Achievable, Relevant, Time-bound. Useful for converting a vague aspiration into something you can tell whether you've done. 'Get healthier' fails on every dimension. 'Run a 5K by April with three runs per week' passes them all." },
      { name: "Leading vs. Lagging Indicators", desc: "Outcome goals (lose 10 pounds, get promoted, write a book) are lagging — they tell you what happened after the fact. Process goals (run three times a week, ship one substantial project per quarter, write 300 words per day) are leading — they're what you actually control. The best goal-setting pairs each outcome with the process that produces it." },
      { name: "The Stop-Doing List", desc: "Jim Collins' insight: what you don't do is as important as what you do. A genuine yearly plan includes explicit stops — meetings you'll leave, projects you'll decline, habits you'll release, relationships you'll let drift. Without the stops, the starts have nowhere to go." }
    ],
    patterns: [
      { keywords: ['everything', 'all of', 'multiple', 'list'], text: "You named many goals. A pattern: years with five goals achieve five things; years with twelve goals achieve two. Goal proliferation is the enemy of goal achievement. Worth re-asking: which one or two of these, if everything else slipped, would still make the year worth it?" },
      { keywords: ['someday', 'eventually', 'one day'], text: "Someday-language appears. The translation: a goal without a date is a wish. Pick a specific deadline for the most important goal — even an arbitrary one. Constraints create movement; open timelines don't." },
      { keywords: ['lose weight', 'get fit', 'healthy'], text: "Health came up. The pattern that works for most people: ignore weight outcomes (the lagging indicator), focus on one or two consistent behaviors (the leading indicators) for ninety days, and let the outcome follow. Outcome-focused health goals usually fail; behavior-focused ones usually work." },
      { keywords: ['save', 'money', 'invest', 'financial'], text: "Financial goals appeared. The unsexy but reliable approach: pick one number for monthly savings, set it to automate the day after payday, and don't touch it. Almost all the difference between good and bad financial years comes from the automation, not the willpower." }
    ],
    actions: [
      "Pick the two most important goals from your list. Cross out the others. The two are your real year.",
      "Translate each goal into a weekly process metric. What will you do every week, regardless of mood?",
      "Schedule a 30-minute review at the end of each month. Same time, same place. Check process, adjust if needed.",
      "Write down three things you're explicitly not doing this year. Tell someone what they are. Public commitment to subtraction is rare and powerful."
    ]
  },

  {
    id: 'future-anxiety',
    icon: '🌊',
    title: "I'm anxious about the future",
    description: "Anxiety about the future is the mind trying to control what it cannot. Let's sort what's actually in your hands from what isn't.",
    steps: [
      { title: "What specifically are you anxious about?", prompt: "Not 'the future' — be precise. Money, health, career, relationships, the world? Name the actual thing. Anxiety shrinks when made specific." },
      { title: "The worst case, in detail", prompt: "Imagine the worst version. What actually happens? Walk through it. Anxiety often grows because we won't look at the worst case directly — making it concrete almost always shrinks it." },
      { title: "If the worst happened, how would you cope?", prompt: "Be practical. What would you actually do? What resources, people, skills would you draw on? You've handled hard things before. The you-who-handles-it is more resourceful than the you-who-anticipates-it." },
      { title: "What's actually in your control?", prompt: "Within this anxiety, what part is genuinely yours to influence? Not everything is — and pretending things are when they aren't is exhausting. What can you actually move?" },
      { title: "What's not in your control?", prompt: "And the rest — what's not yours to control? Worth naming explicitly. The mind tries to control everything; the relief comes from clearly seeing what it can't." },
      { title: "One wise action this week", prompt: "Not a strategy. One concrete action — a phone call, a savings transfer, a conversation, a single thing — that addresses what's actually in your hands. Anxiety dissolves into action, even small action." }
    ],
    frameworks: [
      { name: "The Stoic Dichotomy of Control", desc: "Epictetus' core teaching: some things are in our control, some are not. Anxiety is what arises when we forget the line. Our judgments, choices, effort, and responses are ours. Outcomes, others' actions, the future, and circumstances are not. Peace comes from acting fully on the first, and accepting fully on the second." },
      { name: "Action Dissolves Anxiety", desc: "Anxiety is the mind running scenarios it cannot resolve. Action moves you out of the loop. Even small action — one phone call, one email, one transfer, one conversation — disrupts the pattern. You don't have to solve the whole future today. You only have to do one thing that's true." }
    ],
    patterns: [
      { keywords: ['money', 'savings', 'income', 'job loss', 'fired'], text: "Financial anxiety came up. A useful exercise: calculate your actual runway — how many months you could live on current savings at minimum expenses. The number is usually different from the fear. Knowing the floor doesn't solve the problem but often shrinks it from infinite to bounded." },
      { keywords: ['health', 'illness', 'sick', 'die', 'death'], text: "Health-related anxiety appears. Two notes. First, if there's a specific symptom or risk you're afraid of, see a doctor — knowing is almost always better than imagining. Second, generalized fear of mortality is human and universal — and rarely fully resolves through reasoning. It responds better to meaning, connection, and presence than to argument." },
      { keywords: ['world', 'climate', 'politics', 'news', 'global'], text: "The state of the world is in your anxiety. Worth distinguishing: there's the anxiety that motivates action (volunteering, donating, voting, organizing) and the anxiety that just spirals. The first is useful; the second isn't. If reading the news is mostly producing the second, that's worth changing." },
      { keywords: ['cant sleep', 'sleep', 'night', 'wake up'], text: "Sleep is being affected. This crosses from anxious-thinking into physical impact, and physical impact compounds the thinking. The non-negotiable next step is restoring sleep — through anything that works: a consistent schedule, reducing news intake, journaling before bed, exercise, professional support. Anxiety in a sleep-deprived mind is much worse than in a rested one." }
    ],
    actions: [
      "Write down one concrete worst-case scenario. Below it, write three steps you'd take if it happened. Most worst cases shrink under specific recovery planning.",
      "Identify one thing you're spending anxious energy on that's not in your control. Decide consciously to stop spending energy there. Re-decide when the urge returns.",
      "Take one small action this week toward what is in your control. Doesn't have to be the right one or the big one. Action breaks the loop.",
      "If anxiety is affecting sleep, appetite, or your ability to function, talk to a doctor or therapist. This isn't escalation — it's matching the support to the size of the load."
    ]
  }
];

/* ============================================================
   Stopwords for pattern matching
   ============================================================ */
const STOPWORDS_DATA = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them',
  'and', 'or', 'but', 'if', 'because', 'as', 'when', 'where', 'how', 'why',
  'this', 'that', 'these', 'those', 'in', 'on', 'at', 'to', 'from', 'of', 'for',
  'with', 'by', 'about', 'up', 'down', 'out', 'off', 'so', 'just', 'very'
]);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENARIOS, STOPWORDS_DATA };
}

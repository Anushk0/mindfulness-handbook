/* ==========================================================================
   HANDBOOK CONTENT — everything the site displays lives in this one file.

   IMPORTANT: the text below is ORIGINAL SAMPLE COPY written for this
   template. It is not taken from any published handbook. Replace it only
   with content you own, or have the author's written permission to use.

   Mini-markup you can use inside any text field:
     *words*    -> italic serif accent (the signature "accent word")
     **words**  -> bold

   Chapter block types:
     { type: "lead",     text }
     { type: "p",        text }
     { type: "h3",       text }
     { type: "list",     title?, items: [] }
     { type: "callout",  title?, text, action?: { label, href } }
     { type: "practice", title, steps: [], practiceId? }   // practiceId opens a guided practice
     { type: "prompt",   key, text }                       // key must be unique; saves to the journal
     { type: "quote",    text, cite? }

   Art keys (generated illustrations, no image files needed):
     ripple, waves, stones, clouds, horizon, leaf, sunrise, moon, path, arches
   ========================================================================== */

window.HANDBOOK = {
  meta: {
    title: "Mindfulness Handbook",
    edition: "Web edition",
    author: "The Author",
    year: 2026,
    description:
      "A gentle, practical companion to mindfulness: short chapters, guided practices and reflection prompts."
  },

  hero: {
    eyebrow: "A mindfulness handbook · Web edition",
    headline: ["Return to the *present,*", "one breath at a time."],
    lead:
      "Short chapters, guided practices and quiet prompts to help you notice more, react less and come home to yourself.",
    breathLabel: "Take one mindful breath",
    practiceId: "one-minute"
  },

  ticker: ["Pause", "Notice", "Breathe", "Soften", "Begin again"],

  welcome: {
    overlay: { small: "Welcome", large: "to the handbook" },
    heading: "There is nothing to get right here. *Only something to notice.*",
    paragraphs: [
      "Mindfulness is the simple, trainable habit of paying attention to what is happening right now, with curiosity instead of judgement.",
      "Each chapter is short. Most end with a practice you can try in a few minutes and a question to reflect on. Read in order, or open whichever chapter you need today.",
      "Go slowly. Skip what doesn't help. Come back to what does."
    ],
    signoff: "*Begin wherever you are.*",
    cta: { label: "Start reading", href: "#chapter-1" }
  },

  chapters: [
    {
      number: 1,
      title: "Understanding mindfulness",
      art: "ripple",
      minutes: 6,
      summary:
        "What mindfulness is, what it isn't, and why a few minutes a day can change how a day feels.",
      blocks: [
        { type: "lead", text: "Mindfulness is attention with a soft edge: noticing what is here, as it is, without rushing to fix it." },
        { type: "p", text: "Much of the day runs on autopilot: eating while scrolling, walking while rehearsing a conversation, lying awake replaying one that already happened. Autopilot is useful, but it also means we miss a lot of our own lives." },
        { type: "p", text: "Mindfulness is the practice of stepping out of autopilot on purpose. It isn't about emptying the mind or feeling calm all the time. It is about noticing, again and again, and returning to the present when you drift." },
        { type: "list", title: "What it is not", items: ["A way to stop thinking", "A test you can fail", "Only for quiet rooms and long retreats"] },
        { type: "callout", title: "Remember", text: "Wandering is not a mistake. The moment you notice you've wandered *is* the practice." },
        {
          type: "practice",
          title: "Try this · Five-senses check-in",
          steps: [
            "Pause wherever you are and let your shoulders drop.",
            "Name five things you can see.",
            "Notice four things you can feel: your feet, your clothes, the air.",
            "Listen for three sounds, near and far.",
            "Take one slow breath before you carry on."
          ]
        },
        { type: "prompt", key: "c1", text: "When during your day do you most often slip into autopilot?" }
      ]
    },
    {
      number: 2,
      title: "The breath as an anchor",
      art: "waves",
      minutes: 7,
      summary:
        "Using the breath as a steady place to return to when the mind is busy or the day is loud.",
      blocks: [
        { type: "lead", text: "Your breath is always with you and always in the present, which makes it the simplest place to come back to." },
        { type: "p", text: "You don't need to breathe in a special way. Start by noticing the breath as it already is: cool air at the nostrils, the rise of the chest, the gentle movement of the belly." },
        { type: "p", text: "When the mind wanders (and it will), notice where it went, then kindly guide your attention back to the next breath. Each return is like one repetition at the gym: small, and quietly strengthening." },
        {
          type: "practice",
          title: "Try this · Counting breaths",
          steps: [
            "Sit comfortably and let your eyes close or soften.",
            "Breathe in, then out, and count “one”.",
            "Continue up to ten, then begin again at one.",
            "If you lose count, smile at it and start again from one.",
            "After a few rounds, let the counting go and simply breathe."
          ]
        },
        {
          type: "callout",
          title: "Tip",
          text: "A slightly longer out-breath often feels settling. Try breathing in for four and out for six.",
          action: { label: "Open the breathing guide", href: "#practice" }
        },
        { type: "prompt", key: "c2", text: "What happens to your breath when you feel rushed? What changes when you slow it down?" }
      ]
    },
    {
      number: 3,
      title: "Coming home to the body",
      art: "stones",
      minutes: 8,
      summary:
        "Meeting physical sensations with curiosity, including a body scan for tension you didn't know you were holding.",
      blocks: [
        { type: "lead", text: "The body is often where stress shows up first: a tight jaw, raised shoulders, a fluttering stomach." },
        { type: "p", text: "A body scan is a slow tour of attention from head to toe. You're not trying to relax each part, though that may happen. You're simply checking in: what is here? Warmth, pressure, tingling, numbness, nothing at all. Every answer is welcome." },
        { type: "list", title: "Places tension likes to hide", items: ["Jaw and forehead", "Shoulders and neck", "Hands", "Belly"] },
        {
          type: "practice",
          title: "Try this · One-minute body check",
          practiceId: "body-scan",
          steps: [
            "Notice where your body meets the chair or the floor.",
            "Scan slowly from the top of your head down to your toes.",
            "Wherever you find tightness, breathe into it for a moment.",
            "Let it soften if it wants to, and let it be if it doesn't."
          ]
        },
        { type: "prompt", key: "c3", text: "Where in your body do you tend to hold stress? What does it feel like?" }
      ]
    },
    {
      number: 4,
      title: "Working with thoughts",
      art: "clouds",
      minutes: 7,
      summary:
        "Learning to watch thoughts come and go without believing every one of them or pushing them away.",
      blocks: [
        { type: "lead", text: "Thoughts are events in the mind, not facts, even the loud and convincing ones." },
        { type: "p", text: "Many of us live inside our thinking: planning, worrying, judging, replaying. Mindfulness invites a small step back, so you can see a thought *as* a thought. From there, you get to choose how to respond." },
        { type: "p", text: "One way to practise is labelling. When you notice a thought, give it a gentle name such as “planning”, “worrying” or “remembering”, then return to the breath." },
        { type: "callout", title: "An image to try", text: "Picture each thought as a cloud drifting across a wide sky. You are the sky, not the weather." },
        {
          type: "practice",
          title: "Try this · Label and let go",
          steps: [
            "Sit for two minutes and rest your attention on the breath.",
            "When a thought appears, label it silently.",
            "Notice the space between thoughts, however brief.",
            "Return to the breath as many times as you need."
          ]
        },
        { type: "prompt", key: "c4", text: "Which thought visited you most often this week? How did it change when you simply noticed it?" }
      ]
    },
    {
      number: 5,
      title: "Meeting emotions with kindness",
      art: "horizon",
      minutes: 8,
      summary:
        "Making room for difficult feelings, and offering yourself the warmth you would offer a friend.",
      blocks: [
        { type: "lead", text: "Feelings rise and fall like weather. Mindfulness helps us stay with them long enough to understand them." },
        { type: "p", text: "When a strong emotion arrives, the urge is often to push it away or get swept up in it. There is a third option: name it, notice where you feel it in the body, and breathe with it." },
        {
          type: "list",
          title: "Four gentle steps",
          items: [
            "**Name it.** “This is frustration.” “This is sadness.”",
            "**Feel it.** Where does it live in your body?",
            "**Breathe with it.** Let the breath move around the feeling.",
            "**Be kind to it.** What would you say to a friend who felt this way?"
          ]
        },
        { type: "callout", title: "Go gently", text: "If a feeling becomes overwhelming, open your eyes, feel your feet on the floor and return to ordinary breathing. You can always come back to it later." },
        { type: "prompt", key: "c5", text: "What is one kind sentence you could offer yourself on a hard day?" }
      ]
    },
    {
      number: 6,
      title: "Mindfulness in everyday life",
      art: "leaf",
      minutes: 6,
      summary:
        "Weaving small moments of presence into ordinary routines: meals, walks, conversations and screens.",
      blocks: [
        { type: "lead", text: "The goal isn't more meditation. It's a little more presence in the life you already have." },
        { type: "p", text: "Any routine can become a practice: the first sip of tea, the walk to the bus, washing your hands. Choose one activity and give it your full attention, noticing sights, sounds, textures and smells." },
        { type: "list", title: "Small anchors for the day", items: ["One mindful breath before opening your phone", "Tasting the first three bites of each meal", "Listening to someone without planning your reply", "A short pause before you sleep"] },
        {
          type: "practice",
          title: "Try this · The three-step pause",
          practiceId: "pause",
          steps: [
            "**Arrive.** Notice what you're thinking and feeling.",
            "**Gather.** Bring your attention to a few breaths.",
            "**Widen.** Sense your whole body, then carry on with your day."
          ]
        },
        { type: "prompt", key: "c6", text: "Which everyday activity could you turn into a moment of mindfulness this week?" }
      ]
    }
  ],

  /* Guided practices open in a full-screen player.
     Each step's seconds add up to the practice length.
     Add an audio file (e.g. "audio/body-scan.mp3") to play a recording alongside. */
  practices: [
    {
      id: "one-minute",
      title: "One mindful minute",
      duration: "1 min",
      when: "Any time",
      art: "sunrise",
      audio: "",
      description: "A short reset for busy moments. Follow the circle and the words.",
      steps: [
        { text: "Find a comfortable position and let your shoulders soften.", seconds: 8 },
        { text: "Notice the breath moving in… and out.", seconds: 10 },
        { text: "Breathe in as the circle grows, out as it softens.", seconds: 12 },
        { text: "If your mind wanders, gently come back to the next breath.", seconds: 12 },
        { text: "Feel your whole body sitting here, breathing.", seconds: 10 },
        { text: "One last slow breath. *Carry this calm with you.*", seconds: 8 }
      ]
    },
    {
      id: "body-scan",
      title: "Five-minute body scan",
      duration: "5 min",
      when: "Midday",
      art: "path",
      audio: "",
      description: "A slow sweep of attention from head to toe to release held tension.",
      steps: [
        { text: "Settle in. Let your eyes close, or rest your gaze on the floor.", seconds: 20 },
        { text: "Bring attention to the top of your head and your forehead. Let them soften.", seconds: 30 },
        { text: "Notice your jaw, mouth and throat. Unclench if you can.", seconds: 30 },
        { text: "Move to your shoulders and arms, all the way to your fingertips.", seconds: 40 },
        { text: "Feel your chest and belly rise and fall with each breath.", seconds: 40 },
        { text: "Notice your back, from the shoulders down to the hips.", seconds: 40 },
        { text: "Move through your legs, knees, ankles and feet.", seconds: 40 },
        { text: "Now sense your whole body at once, *breathing*.", seconds: 40 },
        { text: "When you're ready, wiggle your fingers and gently return.", seconds: 20 }
      ]
    },
    {
      id: "pause",
      title: "Three-step pause",
      duration: "3 min",
      when: "Evening",
      art: "moon",
      audio: "",
      description: "Arrive, gather and widen: a three-minute reset you can use anywhere.",
      steps: [
        { text: "*Arrive.* Sit tall and notice what's here: thoughts, feelings, sensations.", seconds: 30 },
        { text: "Let it all be as it is. Nothing to change.", seconds: 30 },
        { text: "*Gather.* Narrow your attention to the breath in your belly.", seconds: 30 },
        { text: "Stay with each in-breath and each out-breath.", seconds: 30 },
        { text: "*Widen.* Expand your attention to your whole body, breathing.", seconds: 30 },
        { text: "Carry this wider awareness into the rest of your evening.", seconds: 30 }
      ]
    }
  ],

  practiceOutro: "Well done. Notice how you feel now, *and carry it with you.*",

  breathing: {
    patterns: [
      { label: "Calm", hint: "4 · 6", phases: [["in", 4], ["out", 6]] },
      { label: "Box", hint: "4 · 4 · 4 · 4", phases: [["in", 4], ["hold", 4], ["out", 4], ["rest", 4]] },
      { label: "Unwind", hint: "4 · 7 · 8", phases: [["in", 4], ["hold", 7], ["out", 8]] }
    ]
  },

  /* Extra journal prompts (chapter prompts are collected automatically). */
  prompts: [
    { key: "g1", label: "Everyday", text: "What did you notice today that you usually rush past?" },
    { key: "g2", label: "Everyday", text: "What is one thing you're grateful for right now, however small?" }
  ],

  quote: {
    text: "You don't have to quiet the mind. Only to *notice* it, kindly, and again.",
    cite: "A note to return to"
  },

  author: {
    name: "The Author",
    role: "Writer & mindfulness facilitator",
    image: "", // e.g. "images/author.jpg"; leave empty to show the illustration
    note: [
      "This handbook grew out of conversations with people who wanted something simple: a few minutes of calm they could actually fit into a crowded day.",
      "Nothing here asks you to become someone else. It only asks you to notice, and to be a little kinder to yourself while you do."
    ]
  },

  disclaimer: {
    title: "Please read",
    text:
      "This handbook offers general wellbeing practices. It is not a substitute for medical or psychological diagnosis, treatment or advice. If you are struggling with your mental health, please speak to a qualified professional. In an emergency, contact your local emergency services."
  },

  feedback: {
    heading: "How did the handbook *feel*?",
    text: "Your thoughts help shape the next edition. It takes about three minutes.",
    label: "Share feedback",
    pendingLabel: "Form coming soon",
    url: "" // paste your form link here, e.g. "https://forms.gle/…"
  },

  footer: {
    blurb: "A gentle web companion for building everyday mindfulness, one breath at a time.",
    copyright: "" // leave empty to use "© {year} {author}. All rights reserved."
  }
};

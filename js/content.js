/* ==========================================================================
   HANDBOOK CONTENT — everything the handbook page displays lives in this file.

   The chapters follow the sections and topics of "Mindfulness Handbook:
   Embark Edition" by Dr Priyal Panchal. The wording is written for this
   website. One short line in `quote` is the author's own, with credit, and
   `author.bio` is the author's bio note as supplied. To use the author's exact
   text elsewhere, replace the fields below with it.

   Mini-markup you can use inside any text field:
     *words*    -> italic serif accent (the signature "accent word")
     **words**  -> bold

   Chapter block types:
     { type: "lead",      text }
     { type: "p",         text }
     { type: "h3",        text }
     { type: "list",      title?, items: [] }
     { type: "cards",     cols?, items: [{ title, text, note? }] }
     { type: "callout",   title?, text, action?: { label, href } }
     { type: "practice",  title, steps: [], practiceId? }   // practiceId opens a guided practice
                                                            // a step can be { text, audio } to add a Listen button
     { type: "prompt",    key, text }                       // key must be unique; saves to the journal
     { type: "quote",     text, cite? }

   Worksheets (answers are saved in the visitor's browser):
     { type: "choices",   key, title, max, options: [] }
     { type: "rating",    key, title, hint, items: [{ label, hint }] }  // A to D
     { type: "checklist", key, title, reset, groups: [{ title, note, items: [] }] }
     { type: "matrix",    key, title, cells: [{ key, label, hint }] }   // 2 x 2 planner

   Art keys (generated illustrations, no image files needed):
     ripple, waves, stones, clouds, horizon, leaf, sunrise, moon, path, arches,
     quadrants, bridge, network, pages
   ========================================================================== */

window.HANDBOOK = {
  meta: {
    title: "Mindfulness Handbook",
    edition: "Embark Edition",
    author: "Dr Priyal Panchal",
    year: 2026,
    description:
      "Everyday tools from positive psychology, yoga and journaling to help you stay steady at work and in life."
  },

  hero: {
    eyebrow: "Mindfulness Handbook · Embark Edition",
    headline: ["Keep your *balance,*", "one small habit at a time."],
    lead: "Everyday tools from positive psychology, yoga and journaling to help you stay steady at work and in life.",
    breathLabel: "Take one mindful minute",
    practiceId: "one-minute"
  },

  ticker: ["Self", "Emotions", "Excellence", "Pause", "Breathe", "Begin again"],

  welcome: {
    overlay: { small: "Welcome", large: "to the Embark Edition" },
    heading: "You don't need to be struggling *to look after your mind.*",
    paragraphs: [
      "This handbook offers simple tools for keeping your mental health in good shape at work and in everyday life. Think of it as prevention: small habits that help before things get hard.",
      "It draws on positive and organisational psychology, yoga, bibliotherapy, and Indian and Japanese wisdom, and it supports UN Sustainable Development Goal 3: Good Health and Well-Being.",
      "You'll move through three sections: **Self**, **Emotions** and **Excellence**. Most chapters end with something to try and a question to answer."
    ],
    signoff: "*Begin wherever you are.*",
    cta: { label: "Start with Section A", href: "#chapter-1" }
  },

  sections: [
    { id: "A", title: "Self", blurb: "Get to know how you show up, what you stand for and what sets you off." },
    { id: "B", title: "Emotions", blurb: "Decide what happiness means to you, then learn to build it on purpose." },
    { id: "C", title: "Excellence", blurb: "Skills for doing well without wearing yourself out." }
  ],

  chapters: [
    /* ---------- Section A: Self ---------- */
    {
      number: 1,
      section: "A",
      title: "Who you are on a good day",
      art: "clouds",
      minutes: 3,
      summary: "Choose the words that describe how you usually take on the world.",
      blocks: [
        { type: "lead", text: "Before you try to change anything, get a clear picture of how you tend to show up." },
        { type: "p", text: "We all have a default style when things get difficult. Some people take charge, some work out what's really going on, some look after everyone else. Naming your style makes it easier to use on purpose." },
        {
          type: "choices",
          key: "a-roles",
          title: "Pick the three words closest to you",
          max: 3,
          options: ["Leader", "Fighter", "Optimist", "Builder", "Decoder", "Healer", "Magician"]
        },
        { type: "callout", title: "If none of them fit", text: "Pick the ones you'd like to grow into. Aiming at a role can shape your choices long before it feels true." },
        { type: "prompt", key: "c1", text: "Where did one of your three words show up this week?" }
      ]
    },
    {
      number: 2,
      section: "A",
      title: "Write your own pledge",
      art: "path",
      minutes: 4,
      summary: "A few lines, in your own words, about how you intend to live and work.",
      blocks: [
        { type: "lead", text: "A pledge turns good intentions into a few lines you can hold yourself to." },
        { type: "p", text: "Write it for yourself, not for anyone else. It should describe the personal culture you want to live by and give you something to check your decisions against, especially on a bad day." },
        {
          type: "practice",
          title: "Try this · Draft it in ten minutes",
          steps: [
            "Write down three values you won't trade away.",
            "Turn each one into a sentence that starts with “I will…”.",
            "Add two or three rules that keep you steady when things go wrong.",
            "Finish with a couple of long-term goals.",
            "Read it aloud once a week, and edit it whenever it stops sounding like you."
          ]
        },
        { type: "prompt", key: "c2", text: "Write your pledge here." }
      ]
    },
    {
      number: 3,
      section: "A",
      title: "Triggers and patterns",
      art: "ripple",
      minutes: 4,
      summary: "Why the same event stresses you one day and not the next, and how to spot your patterns.",
      blocks: [
        { type: "lead", text: "One email can wreck your morning and leave a colleague completely unmoved." },
        { type: "p", text: "Stress isn't only the event. It is the event plus how you read it in that moment, which is why triggers differ between people and can even differ for you from one week to the next." },
        { type: "p", text: "A lot of lost balance comes from mental time travel: going back over what went wrong, or rehearsing what might. Once you can see which situations send you there, you can catch it earlier and come back to now." },
        {
          type: "practice",
          title: "Try this · Map one trigger",
          practiceId: "trigger-pause",
          steps: [
            "Note the situation: where you were and who was there.",
            "Name exactly what set you off.",
            "Notice what happened in your body and your thoughts.",
            "Write down what you did next.",
            "Decide what you'd like to do next time."
          ]
        },
        {
          type: "callout",
          title: "The theory",
          text: "Stress is only one reason happiness can go missing. See how it differs from burnout, sadness and depression.",
          action: { label: "Read more on Happiness at Work", href: "happiness-at-work.html#part-1" }
        },
        { type: "prompt", key: "c3", text: "Which situation has set you off most often lately? What do you notice just before it happens?" }
      ]
    },

    /* ---------- Section B: Emotions ---------- */
    {
      number: 4,
      section: "B",
      title: "Your own definition of happiness",
      art: "sunrise",
      minutes: 3,
      summary: "Find the moments when time disappeared, and work out what they have in common.",
      blocks: [
        { type: "lead", text: "Happiness is easier to build once you know what yours looks like." },
        { type: "p", text: "It's tempting to treat happiness as something that turns up by luck. This section treats it as something you make, step by step, starting with a definition that belongs to you." },
        {
          type: "practice",
          title: "Try this · Find your moment",
          steps: [
            "Close your eyes and remember a time you were so absorbed that the clock surprised you.",
            "Where were you, what were you doing and who was with you?",
            "Ask what made that moment feel the way it did.",
            "Put it into a sentence or two."
          ]
        },
        { type: "prompt", key: "c4a", text: "What does happiness mean to you in your personal life?" },
        { type: "prompt", key: "c4b", text: "What does happiness mean to you at work?" },
        { type: "callout", title: "Then hold it lightly", text: "Once it's written down, stop hunting for it. Leave room in your week for those moments and let them arrive." }
      ]
    },
    {
      number: 5,
      section: "B",
      title: "What shapes your happiness",
      art: "stones",
      minutes: 3,
      summary: "A quick rating of four areas of life, to repeat every two weeks.",
      blocks: [
        { type: "lead", text: "A short check-in shows where life feels full and where it's running thin." },
        {
          type: "rating",
          key: "b-factors",
          title: "Rate each area today",
          hint: "A is very satisfied and D is not satisfied at all. Come back every two weeks and see what has moved.",
          items: [
            { label: "Learning, growth and achievement", hint: "New skills, a shift in mindset, or finishing what you set out to do" },
            { label: "Social life", hint: "The ordinary warmth you share with friends, colleagues and strangers" },
            { label: "Close relationships", hint: "How connected you feel to your family and the people nearest you" },
            { label: "Comforts and resources", hint: "Having what you need, from the essentials to your favourite comfort food" }
          ]
        },
        { type: "prompt", key: "c5", text: "Which rating surprised you? What's one small change that could lift it?" }
      ]
    },
    {
      number: 6,
      section: "B",
      title: "Happy hormones",
      art: "waves",
      minutes: 4,
      summary: "Small activities that can lift your mood, and a checklist to cover them all in a week.",
      blocks: [
        { type: "lead", text: "What you do changes how you feel, sometimes faster than what you think." },
        { type: "p", text: "In the Guru–shishya tradition, a teacher might set a student a task that seemed unrelated to the lesson, until the student was in the right frame of mind to learn. Modern physiology points the same way: activity affects mood." },
        {
          type: "checklist",
          key: "b-hormones",
          title: "Try to cover all four this week",
          reset: "Start a new week",
          groups: [
            { title: "Dopamine", note: "reward and motivation", items: ["Choose instrumental music to suit your pace: slow when you're wound up, upbeat when you need momentum", "Break a job into very small tasks and tick them off"] },
            { title: "Oxytocin", note: "trust and connection", items: ["Thank someone for something specific", "Check in on a colleague, or bring a joke to lunch"] },
            { title: "Serotonin", note: "calm and contentment", items: ["Snack on nuts, seeds or fruit", "Take a short walk in daylight"] },
            { title: "Endorphins", note: "relief and uplift", items: ["Do something playful with your hands: doodle, colour or solve a puzzle", "Do the stretches in Chapter 8"] }
          ]
        },
        { type: "callout", title: "A simple model", text: "These labels are a friendly shorthand. Brain chemistry is far more complicated, and no checklist replaces proper care if a low mood stays with you." },
        { type: "prompt", key: "c6", text: "Which of the four do you tend to miss? What could you do about it this week?" }
      ]
    },

    /* ---------- Section C: Excellence ---------- */
    {
      number: 7,
      section: "C",
      title: "Psychological capital and affirmations",
      art: "horizon",
      minutes: 5,
      summary: "Four inner resources you can grow on purpose, and words to keep them going.",
      blocks: [
        { type: "lead", text: "Money is one kind of capital. Your inner resources are another, and they grow when you invest in them." },
        { type: "p", text: "Psychological capital is what helps you get past obstacles. It has four parts, easy to remember as HERO." },
        {
          type: "cards",
          items: [
            { title: "Hope", text: "Believing a better outcome is possible.", note: "**Grow it:** picture where you're headed, mark the milestones and celebrate small wins." },
            { title: "Efficacy", text: "Trusting that you can do it.", note: "**Grow it:** train one skill at a time, ask for honest feedback and learn from someone you admire." },
            { title: "Resilience", text: "Staying upright when life knocks you.", note: "**Grow it:** write down what past difficulties taught you, keep moving or meditating, and stay close to people you can talk to." },
            { title: "Optimism", text: "Keeping a hopeful view when a negative one would be easier.", note: "**Grow it:** list what you're grateful for, ask what a failure taught you and let yourself laugh." }
          ]
        },
        {
          type: "callout",
          title: "Why bother if you're fine?",
          text: "Therapy helps when things have gone wrong. Habits like these are preventive: they make it less likely that things will.",
          action: { label: "See the research behind it", href: "happiness-at-work.html#part-3" }
        },
        { type: "h3", text: "Affirmations" },
        { type: "p", text: "An affirmation is a short, believable sentence you say when you need steadiness. The best ones are in your own words and tied to something you're actually doing." },
        {
          type: "list",
          title: "A few to borrow",
          items: ["I can take this one step at a time.", "Today's effort counts, even if nobody sees it.", "I've handled hard days before.", "I can pause before I respond."]
        },
        { type: "prompt", key: "c7a", text: "What three sentences would give you hope on a difficult morning?" },
        { type: "prompt", key: "c7b", text: "Now write five more, based on the rules you live by." }
      ]
    },
    {
      number: 8,
      section: "C",
      title: "Yoga at your desk",
      art: "leaf",
      minutes: 4,
      summary: "Five gentle movements to do every day, and the four pillars of a yogic life.",
      blocks: [
        { type: "lead", text: "Yoga is more than poses and breathing. It's also a way of resting and reconnecting with your body." },
        {
          type: "practice",
          title: "Try this · The five daily basics",
          practiceId: "desk-reset",
          steps: [
            { text: "**Eyes.** Keep your head still and look up, down, right and left.", audio: "eyes" },
            { text: "**Neck.** Lower your chin to your chest, then turn slowly to look over each shoulder.", audio: "neck" },
            { text: "**Spine.** Rest one forearm on the back of your chair and twist gently towards it. Change sides.", audio: "spine" },
            { text: "**Shoulders.** Put your fingertips on your collarbones, lift your elbows out to the sides and circle them slowly.", audio: "shoulders" },
            { text: "**Knees.** Sit back, lift one foot and circle your lower leg five times each way. Change legs.", audio: "knees" }
          ]
        },
        { type: "callout", title: "Go gently", text: "Move slowly and stop if anything hurts. If you have an injury or a medical condition, check with a doctor first." },
        {
          type: "list",
          title: "The four pillars of a yogic lifestyle",
          items: [
            "**Aachar, how you behave.** Act with care and attention, towards others and yourself.",
            "**Vichaar, how you think.** When a thought loop turns negative, steer it towards something useful.",
            "**Aahaar, how you eat.** Keep portions modest, keep mealtimes regular and stop short of full.",
            "**Vihaar, how you play.** Spend time on something so enjoyable that the hours slip by."
          ]
        },
        { type: "prompt", key: "c8", text: "Which pillar needs the most attention from you right now?" }
      ]
    },
    {
      number: 9,
      section: "C",
      title: "Goals and priorities",
      art: "quadrants",
      minutes: 4,
      summary: "Sort your day by what's urgent and what matters, then plan around it.",
      blocks: [
        { type: "lead", text: "Being busy and moving forward aren't the same thing." },
        { type: "p", text: "Start the day by listing your tasks, then ask two questions of each: how urgent is it, and how important is it? The answers put it in one of four boxes, in a grid widely known as the Eisenhower Matrix." },
        {
          type: "matrix",
          key: "c-plan",
          title: "Today's priority planner",
          cells: [
            { key: "do", label: "Do first", hint: "Urgent and important" },
            { key: "schedule", label: "Schedule", hint: "Important, not urgent" },
            { key: "delegate", label: "Delegate", hint: "Urgent, less important" },
            { key: "drop", label: "Drop", hint: "Neither urgent nor important" }
          ]
        },
        { type: "p", text: "At the end of the day, look back. Did your time go where your goals are? If not, shift something tomorrow." },
        {
          type: "callout",
          title: "Make your goals concrete",
          text: "A clear goal is easier to prioritise than a vague wish.",
          action: { label: "SMART goals explained", href: "happiness-at-work.html#part-3" }
        },
        { type: "prompt", key: "c9", text: "What keeps landing in your “urgent” box that shouldn't be there?" }
      ]
    },
    {
      number: 10,
      section: "C",
      title: "Handling conflict",
      art: "bridge",
      minutes: 4,
      summary: "Five moves for working through disagreement, and a log of what works for you.",
      blocks: [
        { type: "lead", text: "Most conflict at work comes from misunderstanding or competing needs, and both can be worked with." },
        {
          type: "list",
          title: "Five moves that help",
          items: [
            "**Collaborate.** Look for an outcome both sides can live with, instead of a winner.",
            "**Acknowledge.** Show you understand why the other person wants what they want before you answer.",
            "**Meet halfway.** Offer part of what's being asked now and agree on the rest.",
            "**Talk it through.** A short conversation clears up what a long email thread can't.",
            "**Prepare.** Before a difficult discussion, read up on the issue and the other viewpoints."
          ]
        },
        {
          type: "callout",
          title: "Ground rules",
          text: "If you still disagree, do it respectfully, and keep aiming for a result that works for both of you.",
          action: { label: "How groups decide and resolve conflict", href: "happiness-at-work.html#part-4" }
        },
        { type: "prompt", key: "c10", text: "Log a conflict you handled well. What did you do that worked?" }
      ]
    },
    {
      number: 11,
      section: "C",
      title: "Social capital",
      art: "network",
      minutes: 4,
      summary: "Seven qualities that build trust and goodwill around you.",
      blocks: [
        { type: "lead", text: "Economic capital is what you have. Social capital is the trust and goodwill between you and the people around you." },
        { type: "p", text: "It grows through everyday behaviour. Try practising these seven at work." },
        {
          type: "list",
          items: [
            "**Empathy.** Ask what's going on before you decide what you think.",
            "**Gratitude.** Tell someone exactly what their help made possible.",
            "**Kindness.** Notice who's on the edge of the group and bring them in.",
            "**Humour.** Use lightness to ease tension, never at someone's expense.",
            "**Altruism.** Give time or know-how with nothing expected back.",
            "**Humility.** Pass the credit along before you accept any.",
            "**Compassion.** Quietly change something to ease another person's load."
          ]
        },
        {
          type: "callout",
          title: "The theory",
          text: "Researchers describe different kinds of social capital, and what each one gives you.",
          action: { label: "Bonding, bridging and linking", href: "happiness-at-work.html#part-4" }
        },
        { type: "prompt", key: "c11", text: "Which of the seven comes easiest to you? Which one will you practise this week?" }
      ]
    },
    {
      number: 12,
      section: "C",
      title: "Journaling",
      art: "pages",
      minutes: 4,
      summary: "What to track, why reading back matters, and a page for short breaks.",
      blocks: [
        { type: "lead", text: "A few lines a day can show you patterns you'd never spot otherwise." },
        {
          type: "list",
          title: "Journals worth keeping",
          items: [
            "**Thoughts** that keep coming back",
            "**Emotions**, and what set them off",
            "**Food, mood and energy:** what you ate and how you felt afterwards",
            "**Goals:** what you did that moved you closer",
            "**Conflicts:** what you tried and how it went",
            "**Tasks:** how you actually get things done"
          ]
        },
        { type: "p", text: "The value comes from reading it back. Look for what repeats, then choose one small thing to change." },
        {
          type: "callout",
          title: "Keep a page for short breaks",
          text: "Fill it with things that give your mind a rest: a mandala to colour, a puzzle, a joke, a note to help you wind down.",
          action: { label: "Open your journal", href: "#reflect" }
        },
        { type: "prompt", key: "c12", text: "Today: what did you eat, and how were your mood and energy afterwards?" }
      ]
    }
  ],

  /* Chair yoga recordings, one for each of the five daily basics.
     Put the files in the audio/ folder and add each path here, for example
     "audio/chair-yoga-eyes.mp3". Until a stretch has a file, it shows no Listen
     button and the guided practice runs without that sound. */
  recordings: {
    eyes: "",
    neck: "",
    spine: "",
    shoulders: "",
    knees: ""
  },

  /* Guided practices open in a full-screen player.
     Each step's seconds add up to the practice length.
     Add an audio file (e.g. "audio/desk-reset.mp3") to play one recording
     alongside the whole practice. Or give a step `audio` (a name from
     `recordings`) to start that recording when the step begins, and make the
     steps it covers at least as long as the recording. */
  practices: [
    {
      id: "one-minute",
      title: "Back to the present",
      duration: "1 min",
      when: "Any time",
      art: "moon",
      audio: "",
      description: "For when your mind is stuck on what happened or what might. Follow the circle and the words.",
      steps: [
        { text: "Stop for a moment and let your shoulders drop.", seconds: 8 },
        { text: "Notice where your mind is: the past, or the future?", seconds: 10 },
        { text: "Feel your feet on the floor. *This is where you are.*", seconds: 12 },
        { text: "Follow one slow breath in, and one slow breath out.", seconds: 12 },
        { text: "If a thought pulls you away, come back to the next breath.", seconds: 10 },
        { text: "One more breath. *Carry on from here.*", seconds: 8 }
      ]
    },
    {
      id: "desk-reset",
      title: "Five-stretch desk reset",
      duration: "3 min",
      when: "At your desk",
      art: "leaf",
      audio: "",
      description: "The five daily basics for your eyes, neck, spine, shoulders and knees, paced for you.",
      steps: [
        { text: "Sit tall with both feet on the floor. Move slowly, and stop if anything hurts.", seconds: 12 },
        { text: "*Eyes.* Keep your head still. Look up, down, right and left.", seconds: 20, audio: "eyes" },
        { text: "*Neck.* Lower your chin towards your chest and feel the back of your neck lengthen.", seconds: 15, audio: "neck" },
        { text: "Turn your head slowly to look over your right shoulder, then your left.", seconds: 20 },
        { text: "*Spine.* Rest your right forearm on the back of your chair and twist gently towards it.", seconds: 18, audio: "spine" },
        { text: "Come back to centre, then twist the other way.", seconds: 18 },
        { text: "*Shoulders.* Fingertips on your collarbones, elbows out. Circle your elbows slowly.", seconds: 20, audio: "shoulders" },
        { text: "*Knees.* Lift your right foot and circle your lower leg five times each way.", seconds: 22, audio: "knees" },
        { text: "Now the left leg. Five circles each way.", seconds: 22 },
        { text: "Rest your hands. Notice how your body feels now.", seconds: 13 }
      ]
    },
    {
      id: "trigger-pause",
      title: "Pause before you react",
      duration: "2 min",
      when: "After a trigger",
      art: "ripple",
      audio: "",
      description: "Something set you off. Use this before you reply, decide or walk away.",
      steps: [
        { text: "Something set you off. Stop here for a moment.", seconds: 15 },
        { text: "Name it quietly: what happened, and what are you telling yourself about it?", seconds: 25 },
        { text: "Find where it sits in your body: your jaw, chest or stomach.", seconds: 20 },
        { text: "Let each breath out be a little longer than the breath in.", seconds: 25 },
        { text: "Ask yourself what response you'd be glad of next week.", seconds: 20 },
        { text: "*Choose your next step.* Then take it.", seconds: 15 }
      ]
    }
  ],

  practiceOutro: "Well done. Notice how you feel now, *and take it with you.*",

  breathing: {
    patterns: [
      { label: "Calm", hint: "4 · 6", phases: [["in", 4], ["out", 6]] },
      { label: "Box", hint: "4 · 4 · 4 · 4", phases: [["in", 4], ["hold", 4], ["out", 4], ["rest", 4]] },
      { label: "Unwind", hint: "4 · 7 · 8", phases: [["in", 4], ["hold", 7], ["out", 8]] }
    ]
  },

  /* Extra journal prompts (chapter prompts are collected automatically).
     t-give and t-receive also appear on the Happiness at Work page. */
  prompts: [
    { key: "g1", label: "Everyday", text: "What's one small thing you'd like to do differently tomorrow?" },
    { key: "g2", label: "Everyday", text: "Who helped you today, and what did they do?" },
    { key: "t-receive", label: "Happiness at Work", text: "Think of a time someone showed you empathy, gratitude, kindness, humour, altruism, humility or compassion. What did they do?" },
    { key: "t-give", label: "Happiness at Work", text: "Now think of a time you showed one of them. What did it change?" }
  ],

  quote: {
    text: "“It is meant to be used with sincerity, sensitivity, and respect for individual journeys.”",
    cite: "Dr Priyal Panchal, Author's Note"
  },

  author: {
    name: "Dr Priyal Panchal",
    role: "Author, Mindfulness Handbook",
    image: "", // e.g. "images/author.jpg"; leave empty to show the illustration
    note: [
      "This handbook began with news reports of working professionals and young students losing their lives, and with the hope that better everyday mental health habits might help, even a little. World Mental Health Day 2025, with its focus on access to services, shaped where it went next.",
      "It is a mental health management aid, grounded in positive psychology and bibliotherapy. The Embark Edition is the first of three, and an app version is being designed to reach more people."
    ],
    // the author's bio note, word for word as supplied
    bio: [
      "Dr. Priyal Panchal is an Indian poet with a doctoral thesis about Poetry. She won the 1st prize for her pattern poem at the TATA Lit Live fest in 2015. Her poems have been published in anthologies by reputed institutions such as the Sahitya Akademi and the University of Mumbai.",
      "Currently, she is working with the NMIMS University as an Assistant Professor at their Mukesh Patel School of Technology Management and Engineering. She has published papers, won best paper prizes, presented at International Conferences (like ICSD), and co-edited a book. She has been invited to deliver talks, guest lectures, and workshops at various colleges on a variety of topics ranging from Creative Writing to Emerging Avenues for Multidisciplinary Research.",
      "Her academic acumen satiates her mind, and her poetry satiates her soul. She is a certified yoga teacher and a positive psychology enthusiast."
    ]
  },

  /* The person who designed and built this website. */
  builder: {
    name: "Anushk Agrawal",
    role: "Designer and developer",
    bio: [
      "Anushk designed and built this website, turning the Embark Edition flipbook into something to use as well as read: chapters at your own pace, guided practices, worksheets and a private journal that stays on your device."
    ]
  },

  /* The bio notes band, right after About. */
  people: {
    eyebrow: "Bio notes",
    heading: "The people *behind* it",
    authorLabel: "About the author",
    builderLabel: "About the website"
  },

  disclaimer: {
    title: "Please read",
    text:
      "This handbook supports everyday mental health management. It doesn't replace professional medical, psychological or psychiatric advice, diagnosis or treatment, and the author accepts no liability for how it is used. If you're struggling, please talk to a qualified professional. In India, Tele-MANAS offers free support on 14416, day and night. In an emergency, call 112.",
    rights:
      "Based on Mindfulness Handbook: Embark Edition © Dr Priyal Panchal, 2026. Please don't copy, adapt or redistribute this material without the author's written permission."
  },

  /* The next-edition band. */
  feedback: {
    heading: "Ready to go *deeper*?",
    text: "The Embrace Edition is a workbook that builds on these activities, adding chair yoga, relaxation, body positivity, stress management, work-life balance, nutrition, bibliotherapy, group behaviour and leadership. The Enlighten Edition follows it."
  },

  footer: {
    blurb: "Everyday tools for a steadier mind, at work and in life.",
    copyright: "Based on Mindfulness Handbook: Embark Edition © Dr Priyal Panchal, 2026.",
    credit: "Website designed and built by **Anushk Agrawal**"
  }
};

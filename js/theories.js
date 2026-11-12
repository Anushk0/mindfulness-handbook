/* ==========================================================================
   HAPPINESS AT WORK — everything the second page displays lives in this file.

   The topics follow the Happiness at Work course slides by Dr Priyal Panchal.
   The explanations and the practice scenarios are written for this website.

   Each part has topics, and each topic is a list of blocks. It uses the block
   types listed in content.js, plus:
     { type: "table",   title?, head: [], rows: [[]] }
     { type: "chips",   title?, words?, items: ["text" | { text, lang }] }
     { type: "compare", left: col, right: col }
         col = { title, tag?, text?, details?: [{ title, text }] }
     { type: "formula", terms: [{ label, note }], result }
     { type: "quiz",    title, questions: [{ q, options: [], answer, why }] }
   ========================================================================== */

window.THEORIES = {
  meta: {
    title: "Happiness at Work",
    description: "The main theories of well-being, motivation and teamwork, with practical activities."
  },

  hero: {
    eyebrow: "The ideas behind the handbook",
    headline: ["What helps people", "*thrive* at work?"],
    lead: "The main theories of well-being, motivation and teamwork, with practical activities. Topics follow the Happiness at Work course taught by Dr Priyal Panchal."
  },


  parts: [
    /* ---------- Part 1 ---------- */
    {
      short: "What happiness is",
      eyebrow: "Well-being",
      title: "What is *happiness*?",
      lead: "People have argued about this for more than two thousand years. Psychology has made it measurable, without settling the argument.",
      topics: [
        {
          id: "definitions",
          title: "Many answers to one question",
          blocks: [
            {
              type: "cards",
              items: [
                { title: "Aristotle", text: "Treated happiness as something you do: living and acting well, over a whole life." },
                { title: "Noah Webster, 1825", text: "His American dictionary tied it to the pleasant feeling of enjoying something good." },
                { title: "Sigmund Freud", text: "Doubted that lasting happiness was ever part of the human design." },
                { title: "Eric Hoffer", text: "Warned that the hunt for happiness is itself a leading cause of unhappiness." },
                { title: "Darrin McMahon", text: "A historian who named a modern trap: feeling unhappy about not being happy." },
                { title: "Alan Watts", text: "Pointed out that the inside of a circle depends on its outside, so a person's happiness can't be separated from their world." }
              ]
            },
            { type: "p", text: "The American Psychological Association takes a simpler line, and describes happiness as a positive emotion that combines joy and satisfaction with a sense of being well." },
            { type: "quote", text: "The mind is its own place, and in itself can make a Heaven of Hell, a Hell of Heaven.", cite: "John Milton, Paradise Lost (1667)" }
          ]
        },
        {
          id: "culture",
          title: "A word in every language",
          blocks: [
            {
              type: "chips",
              words: true,
              items: [
                { text: "सुख", lang: "hi" },
                { text: "幸福", lang: "zh" },
                { text: "bonheur", lang: "fr" },
                { text: "felicidad", lang: "es" },
                { text: "Glück", lang: "de" },
                { text: "lycka", lang: "sv" },
                { text: "счастье", lang: "ru" },
                { text: "행복", lang: "ko" },
                { text: "felicità", lang: "it" },
                { text: "kebahagiaan", lang: "id" },
                { text: "mutluluk", lang: "tr" },
                { text: "hạnh phúc", lang: "vi" }
              ]
            },
            { type: "p", text: "Every culture has a word for happiness, and some have several, but the meaning shifts from place to place. Research on *cultural fit* suggests people tend to feel better when their own values match those around them." },
            {
              type: "compare",
              left: { title: "Collectivist cultures", tag: "For example, Japan", text: "Group harmony tends to matter more than any one person's happiness." },
              right: { title: "Individualist cultures", tag: "For example, the United States", text: "A person's own happiness takes centre stage." }
            },
            { type: "p", text: "It changes over a lifetime too. Later in life, happiness is often tied to stability and security. Earlier on, it leans towards freedom and self-expression. The same person can be happy for different reasons at different times." }
          ]
        },
        {
          id: "swb",
          title: "Subjective well-being",
          byline: "Ed Diener",
          blocks: [
            { type: "p", text: "Ed Diener, nicknamed Dr Happiness, helped turn happiness into something researchers could measure. His Satisfaction with Life Scale is still widely used." },
            {
              type: "formula",
              terms: [
                { label: "Positive feelings", note: "Pleasant emotions, day to day" },
                { label: "Few negative feelings", note: "Less pain, worry and sadness" },
                { label: "Life satisfaction", note: "How your life measures up to what you hoped for" }
              ],
              result: "Subjective well-being"
            },
            { type: "p", text: "Theories of well-being tend to describe the same loop. Having your needs met, moving towards goals and doing engaging activities lead to a sense of fulfilment, which shapes both how you feel and how you judge your life. Your general outlook colours all of it." },
            {
              type: "list",
              title: "What it's linked to",
              items: [
                "**Demographics:** age, gender, race and ethnicity",
                "**Socioeconomic status:** income, education, work and family setup",
                "**Health and functioning:** illness, disability, sleep and activity",
                "**Personality:** traits such as optimism and self-esteem",
                "**Social support:** how many people you have, and how good those ties are",
                "**Religion and culture:** what people believe, and who they compare themselves with",
                "**Place:** neighbourhood, and access to food, water, transport and green space"
              ]
            }
          ]
        },
        {
          id: "two-selves",
          title: "Two selves, two stories",
          byline: "Daniel Kahneman",
          blocks: [
            { type: "p", text: "Psychologist Daniel Kahneman drew a line between living through something and remembering it." },
            {
              type: "compare",
              left: { title: "The experiencing self", text: "Lives each moment as it happens." },
              right: { title: "The remembering self", text: "Looks back and tells the story, reinterpreting and adding colour as it goes." }
            },
            {
              type: "callout",
              title: "Why it matters",
              text: "When someone asks how your month was, memory answers, and memory edits. Journaling as you go gives you a truer record.",
              action: { label: "Read the journaling chapter", href: "index.html#chapter-12" }
            }
          ]
        },
        {
          id: "missing",
          title: "When happiness is missing",
          blocks: [
            {
              type: "table",
              title: "Four words that get mixed up",
              head: ["", "What it is", "Worth knowing"],
              rows: [
                ["Stress", "An emotional response to psychological strain", "Everyone has it. It becomes a problem when it doesn't let up."],
                ["Burnout", "A syndrome caused by chronic stress at work", "It shows up as exhaustion, detachment from the job and feeling ineffective."],
                ["Sadness", "An emotional response, usually to losing something you value", "Mild or strong, it's a normal part of life and tends to ease."],
                ["Depression", "A low state that interferes with daily life", "It needs professional care. Willpower isn't the fix."]
              ]
            },
            { type: "callout", title: "If this sounds like you", text: "Please talk to a doctor or counsellor. In India, Tele-MANAS offers free support on 14416, day and night." }
          ]
        }
      ]
    },

    /* ---------- Part 2 ---------- */
    {
      short: "Happiness at work",
      eyebrow: "Motivation",
      title: "Happiness *at work*",
      lead: "It's more than liking your job. Here's how researchers break it down, and what seems to drive it.",
      topics: [
        {
          id: "three-faces",
          title: "Three faces of happiness at work",
          blocks: [
            {
              type: "cards",
              cols: 3,
              items: [
                { title: "Engagement", text: "Being absorbed and energised by what you do, and giving more than the minimum." },
                { title: "Job satisfaction", text: "How content you feel when you think about your job and your experience of it." },
                { title: "Affective commitment", text: "An emotional tie to the organisation. You stay because you want to." }
              ]
            },
            { type: "p", text: "Measuring all three shows an organisation where the problems are, and whether things are getting better." }
          ]
        },
        {
          id: "herzberg",
          title: "Two-factor theory",
          byline: "Frederick Herzberg",
          blocks: [
            { type: "p", text: "Herzberg argued that satisfaction and dissatisfaction aren't two ends of one line. Different things drive each, so fixing a complaint doesn't create motivation. Open each factor to see what it covers." },
            {
              type: "compare",
              left: {
                title: "Motivators",
                tag: "Satisfiers",
                text: "Having them makes people want to do well.",
                details: [
                  { title: "Growth and achievement", text: "Learning, advancing and finishing things that matter. Among the strongest drivers of intrinsic motivation." },
                  { title: "The work itself", text: "Work that feels meaningful, with some freedom in how you do it." },
                  { title: "Responsibility", text: "Being trusted with something important builds ownership." },
                  { title: "Recognition", text: "A sincere thank-you or public credit meets a basic need, and it doesn't have to cost money." }
                ]
              },
              right: {
                title: "Hygiene factors",
                tag: "Dissatisfiers",
                text: "Missing them causes complaints. Having them only brings people to neutral.",
                details: [
                  { title: "Salary", text: "Unfair pay upsets people, but raising pay beyond fair rarely lifts motivation for long. Fairness compared with colleagues and the market often matters more than the figure." },
                  { title: "Working conditions", text: "Physical (space, chairs, temperature, cleanliness), psychological (workload, management style, safety) and digital (reliable tools and connections)." },
                  { title: "Relationships", text: "Trust, teamwork, belonging and psychological safety. People often leave bad managers and toxic teams, not the job." },
                  { title: "Company policy", text: "Rules and administration that feel fair and sensible." },
                  { title: "Job security", text: "Knowing your role is likely to last." }
                ]
              }
            },
            { type: "callout", title: "The takeaway", text: "Fix the hygiene factors to stop people being unhappy. Invest in the motivators to make them want to give their best. Both feed engagement, commitment and satisfaction." },
            {
              type: "quiz",
              title: "Try it · Which factor is it?",
              questions: [
                {
                  q: "A lab technician's careful checks prevent a costly error, for the third time this year. Nobody mentions it, and the technician stops staying late to double-check.",
                  options: ["Salary", "Recognition", "Working conditions", "Job security"],
                  answer: 1,
                  why: "Recognition is a motivator. The work is good and the effort is real, but it goes unseen."
                },
                {
                  q: "A call centre pays above the market rate, but the headsets crackle, the software freezes and there's nowhere quiet to take a break.",
                  options: ["Working conditions", "Achievement", "Responsibility", "Recognition"],
                  answer: 0,
                  why: "Working conditions are a hygiene factor. Poor ones create daily friction, whatever the pay."
                },
                {
                  q: "A developer turns down a 10% raise elsewhere to stay in a team where they're learning from a mentor and taking on harder problems.",
                  options: ["Job security", "Salary", "Growth and achievement", "Company policy"],
                  answer: 2,
                  why: "Growth is a motivator, and it can outweigh a modest pay rise."
                },
                {
                  q: "A well-paid hospital team dreads its shifts. Two senior staff argue constantly and blame juniors for mistakes.",
                  options: ["Achievement", "Relationships", "Recognition", "The work itself"],
                  answer: 1,
                  why: "Relationships are a hygiene factor. Good pay doesn't make a toxic team bearable."
                },
                {
                  q: "A junior accountant is asked to run a client meeting alone for the first time. There's no pay change, but they go home buzzing.",
                  options: ["Responsibility", "Salary", "Working conditions", "Company policy"],
                  answer: 0,
                  why: "Responsibility is a motivator. Being trusted is rewarding in itself."
                },
                {
                  q: "A designer learns that a colleague in the same role, with the same experience, earns far more.",
                  options: ["Recognition", "The work itself", "Growth and achievement", "Salary"],
                  answer: 3,
                  why: "Pay is a hygiene factor, and fairness is the sharpest part of it."
                }
              ]
            }
          ]
        },
        {
          id: "eei",
          title: "The Employee Experience Index",
          byline: "IBM Smarter Workforce Institute",
          blocks: [
            { type: "p", text: "IBM's index connects workplace practices to how people actually experience work, across five dimensions." },
            {
              type: "chips",
              items: ["Belonging", "Purpose", "Achievement", "Happiness", "Vigour"]
            },
            {
              type: "list",
              items: [
                "**Belonging:** feeling part of a team or organisation",
                "**Purpose:** understanding why your work matters",
                "**Achievement:** a sense of accomplishment",
                "**Happiness:** pleasant feelings that come from work",
                "**Vigour:** energy and enthusiasm on the job"
              ]
            }
          ]
        },
        {
          id: "mckee",
          title: "Three things people need",
          byline: "Annie McKee",
          blocks: [
            {
              type: "cards",
              cols: 3,
              items: [
                { title: "A vision of the future", text: "You can see how where you're going connects to what you care about." },
                { title: "A sense of purpose", text: "You believe your work makes a difference." },
                { title: "Good relationships", text: "You have people at work you like and trust." }
              ]
            }
          ]
        },
        {
          id: "payoff",
          title: "Why it pays off",
          blocks: [
            { type: "p", text: "Organisational citizenship behaviour is the helpful extra that nobody asks or pays for: mentoring a newcomer, covering for a colleague, suggesting a better way. People who are happy and feel they belong do more of it, and it's linked with lower staff turnover." },
            {
              type: "list",
              title: "Research also links happiness at work with",
              items: ["Better performance, sustained over time", "Better customer service", "Higher job satisfaction", "Keeping good people for longer", "Stronger long-term results for the organisation"]
            }
          ]
        },
        {
          id: "daily",
          title: "What helps, day to day",
          blocks: [
            {
              type: "list",
              items: [
                "Work somewhere your values fit",
                "Keep an eye on stress levels across the team",
                "Check in on your own fatigue and health",
                "Protect flexibility and time away from work",
                "Build a supportive, inclusive culture",
                "Keep growing, personally and professionally",
                "Recognise what others do, and what you've done yourself"
              ]
            }
          ]
        }
      ]
    },

    /* ---------- Part 3 ---------- */
    {
      short: "Inner resources",
      eyebrow: "Strengths",
      title: "Building *inner resources*",
      lead: "Positive psychology at work looks at what's going right, and how to get more of it.",
      topics: [
        {
          id: "pop",
          title: "Positive organisational psychology",
          byline: "Donaldson and Ko, 2010",
          blocks: [
            { type: "p", text: "This field studies positive experiences and traits at work, and uses what it finds to make organisations more effective and better places to be." },
            { type: "p", text: "It leans on neuroplasticity: the brain keeps changing with practice, so the way we behave at work can be learned and strengthened." }
          ]
        },
        {
          id: "psycap",
          title: "Psychological capital",
          byline: "Fred Luthans and colleagues",
          blocks: [
            { type: "p", text: "PsyCap describes a positive state that can be developed. Like financial capital, it can be built up and drawn on. It has four parts, known as HERO." },
            {
              type: "cards",
              items: [
                { title: "Hope", text: "Setting goals and seeing ways to reach them.", note: "**Build it:** plan ahead and set well-defined goals." },
                { title: "Efficacy", text: "Believing you can handle the task in front of you.", note: "**Build it:** step outside your comfort zone and test your skills." },
                { title: "Resilience", text: "Bouncing back after adversity or failure.", note: "**Build it:** list your resources and strengthen your support network." },
                { title: "Optimism", text: "Expecting good things ahead.", note: "**Build it:** practise positive self-talk and look for another angle." }
              ]
            },
            { type: "p", text: "Why these four? They can be measured, they respond to practice and they affect how well people work. That separates them from fixed traits like general intelligence." },
            { type: "p", text: "Higher PsyCap is linked with more engaged, innovative and healthy employees. Contingency plans help too: knowing what you'll do if things go wrong keeps hope alive." },
            {
              type: "callout",
              title: "Put it into practice",
              text: "The handbook has everyday ways to grow all four.",
              action: { label: "Read the chapter", href: "index.html#chapter-7" }
            },
            {
              type: "quiz",
              title: "Try it · Which strength is this?",
              questions: [
                {
                  q: "When funding for a project is cut, Tara takes a few days to absorb it, talks it over with a friend and comes back with a smaller plan.",
                  options: ["Hope", "Efficacy", "Resilience", "Optimism"],
                  answer: 2,
                  why: "Resilience is recovering from a setback and carrying on."
                },
                {
                  q: "Asked to present to the board for the first time, Arjun is nervous but sure that, with practice, it will go well.",
                  options: ["Hope", "Efficacy", "Resilience", "Optimism"],
                  answer: 1,
                  why: "Efficacy is belief in your own ability to do the task."
                },
                {
                  q: "Sana wants to move into data science, and has mapped out three routes, with a fallback in case the first doesn't work.",
                  options: ["Hope", "Efficacy", "Resilience", "Optimism"],
                  answer: 0,
                  why: "Hope combines a goal with more than one way of getting there."
                },
                {
                  q: "The team has just lost a big client. Dev expects things to pick up, and points to two good signs in the pipeline.",
                  options: ["Hope", "Efficacy", "Resilience", "Optimism"],
                  answer: 3,
                  why: "Optimism is expecting good outcomes and looking for reasons to."
                }
              ]
            }
          ]
        },
        {
          id: "smart",
          title: "SMART goals",
          byline: "George Doran, 1981",
          blocks: [
            { type: "p", text: "Hope needs a plan. SMART turns a wish into something you can act on." },
            {
              type: "list",
              items: [
                "**Specific:** say exactly what you'll do.",
                "**Measurable:** decide how you'll know you've done it.",
                "**Achievable:** make it a stretch, but possible.",
                "**Relevant:** connect it to something that matters to you.",
                "**Time-bound:** give it a deadline."
              ]
            },
            { type: "callout", title: "Example", text: "“Read more” becomes “Read 10 pages at lunch, four days a week, until the end of the month.”" },
            { type: "p", text: "People swap the words for each letter (S can also mean significant or stretching). What counts is the checklist." }
          ]
        }
      ]
    },

    /* ---------- Part 4 ---------- */
    {
      short: "People together",
      eyebrow: "Relationships",
      title: "People *together*",
      lead: "Nobody is happy at work alone. These ideas explain what connections give us, and how groups decide.",
      topics: [
        {
          id: "social",
          title: "Social capital",
          byline: "Pierre Bourdieu, Robert Putnam",
          blocks: [
            { type: "p", text: "Bourdieu described social capital as the resources you can reach through your relationships. Put simply, it's what your connections make possible." },
            {
              type: "cards",
              cols: 3,
              items: [
                { title: "Bonding", text: "Close ties with people like you.", note: "Family, friends, neighbours" },
                { title: "Bridging", text: "Ties across different groups.", note: "Other departments, community groups" },
                { title: "Linking", text: "Ties to people and institutions with power.", note: "Local government, NGOs" }
              ]
            },
            {
              type: "chips",
              title: "What it's made of",
              items: ["Trust and safety", "Participation", "Reciprocity", "Proactivity", "Shared values", "Diversity", "Belonging", "Networks"]
            },
            {
              type: "table",
              title: "Seven qualities that build it",
              head: ["Quality", "At work", "In society"],
              rows: [
                ["Empathy", "Smoother collaboration and conflict resolution", "Less prejudice between groups"],
                ["Gratitude", "Better morale, especially when leaders show it", "More reciprocity and volunteering"],
                ["Kindness", "A warmer climate and better teamwork", "More cooperation"],
                ["Humour", "Less stress and more creativity", "Resilience, and dialogue across differences"],
                ["Altruism", "More mentoring and knowledge-sharing", "Philanthropy and crisis support"],
                ["Humility", "Openness to feedback and less toxic competition", "Dialogue across ideological divides"],
                ["Compassion", "Humane policies and leadership", "Less marginalisation"]
              ]
            },
            { type: "prompt", key: "t-receive", text: "Think of a time someone showed you one of these qualities. What did they do?" },
            { type: "prompt", key: "t-give", text: "Now think of a time you showed one of them. What did it change?" }
          ]
        },
        {
          id: "groups",
          title: "Group dynamics",
          byline: "Kurt Lewin",
          blocks: [
            { type: "p", text: "Lewin saw a group as a living system: change one part and the effects spread through the whole. A group, in this sense, is a small number of people with a shared goal who know they belong together." },
            { type: "p", text: "Healthy dynamics lift performance, team spirit and satisfaction, and a group's decisions can be better than an individual's." },
            {
              type: "practice",
              title: "How a group reaches a decision",
              steps: ["Identify the goal.", "Analyse the situation and the information.", "Discuss the different viewpoints.", "Brainstorm possible solutions.", "Evaluate them and choose.", "Put it into practice together.", "Monitor the outcome."]
            },
            {
              type: "table",
              title: "Seven ways to decide",
              head: ["Method", "How it works"],
              rows: [
                ["Authority", "One person decides. Fast, but others may not commit."],
                ["Majority", "The largest number wins. Clear, but it can leave a losing side."],
                ["Negative minority", "Options are voted out, least popular first, until one remains."],
                ["Ranking", "Everyone orders the options and the best combined score wins."],
                ["Unanimity", "Everyone must fully agree. Strong, but slow."],
                ["Consensus", "Everyone can accept the result, even if it isn't their first choice."],
                ["Combining ideas", "The best parts of several proposals are merged."]
              ]
            },
            {
              type: "practice",
              title: "Working through conflict",
              steps: ["Acknowledge the disagreement.", "Share perspectives.", "Build an understanding of the other view.", "Reassess your own idea.", "Work on it together.", "Put resolving it ahead of winning."]
            },
            {
              type: "callout",
              title: "Try it with your team",
              text: "Pick any topic. In a group of five, each person writes five adjectives for it. Agree on just three, then talk about how you got there.",
              action: { label: "More on handling conflict", href: "index.html#chapter-10" }
            }
          ]
        }
      ]
    }
  ],

  cta: {
    heading: "Now *try it* for yourself",
    text: "The handbook turns these ideas into short exercises, stretches and journal prompts you can use today."
  }
};

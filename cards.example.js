/* The deck. Copy to cards.js and replace with your own.
 *
 * Cards are OPTIONS, not prompts. Each one should come out of research you
 * already did — a card the room cannot check is a card the room will guess at.
 * Four fields, and every one of them is load-bearing:
 *
 *   name   the job, in the words the person with it would use
 *   who    who actually has this job. "Everyone" means you have not found them
 *   today  what they do about it right now. There is always something
 *   bet    the assumption that has to hold for this to be worth doing
 *
 * `bet` is the field people skip and the one the second axis is built on.
 */
window.ROOMREAD = {
  max: 3,

  copy: {
    title:      "Where should we start?",
    eyebrow:    "Where should we start?",
    footer:     "Your team \u00b7 your session",
    axisA:      "Back it",
    axisADone:  "Backed",
    axisB:      "Name an assumption",
    axisBDone:  "Flagged",
    axisBPrompt:"The assumption that could kill it",
  },

  cards: [
    { name: "Requests that arrive as messages", note: "Work that starts in a DM.", jobs: [
      { id:"a1", name:"Know what was asked of me this week",
        who:"Anyone whose queue lives in other people's messages",
        today:"Scrolling back through threads on Monday and hoping nothing was missed.",
        bet:"That the cost is the missing, not the volume. If people are simply overloaded, surfacing more of it makes things worse." },
      { id:"a2", name:"Tell an urgent request from a loud one",
        who:"Teams with no intake process",
        today:"Whoever asks most recently, or most insistently, goes first.",
        bet:"That the team would actually honour a priority order once it existed." },
      { id:"a3", name:"Answer the same question for the fourth time",
        who:"Whoever is closest to the system",
        today:"Answering it again, and meaning to write it down.",
        bet:"That people would look somewhere before asking. Most documented answers are never read." },
    ]},

    { name: "Work that has to be checked", note: "Someone reviews it before it counts.", jobs: [
      { id:"b1", name:"Catch the error before the customer does",
        who:"Anyone shipping work that is hard to take back",
        today:"A second pair of eyes, when one is available.",
        bet:"That the errors that matter are the kind a checklist catches. The expensive ones usually are not." },
      { id:"b2", name:"Know whether the review actually happened",
        who:"Whoever is accountable when it did not",
        today:"Asking. Or finding out afterwards.",
        bet:"That making review visible does not turn it into a box-tick, which is the usual result." },
      { id:"b3", name:"Explain why something was rejected",
        who:"Reviewers, repeatedly, to the same people",
        today:"A comment, usually written in a hurry.",
        bet:"That the reason is knowable at review time. Often the real reason is context the reviewer cannot write down." },
    ]},

    { name: "Things nobody owns", note: "Everyone agrees it matters.", jobs: [
      { id:"c1", name:"Keep a shared document true",
        who:"Whoever wrote it, forever",
        today:"It drifts, and then people stop trusting it, and then they stop reading it.",
        bet:"That staleness is the reason it is unused. It may never have been useful." },
      { id:"c2", name:"Find the decision we already made",
        who:"Anyone re-opening a settled question",
        today:"Asking the person who was there. If they are still here.",
        bet:"That decisions were recorded at the time. Mostly they were made in a room." },
      { id:"c3", name:"Notice a process has quietly stopped working",
        who:"Nobody, which is the problem",
        today:"It surfaces as a failure somewhere downstream, months later.",
        bet:"That there is a signal to watch. If the only signal is the failure, there is nothing to build." },
    ]},
  ],
};

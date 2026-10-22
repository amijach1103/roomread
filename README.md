# roomread

A workshop tool I built in September 2026 for facilitators who need a room to choose between options. Each person backs a few options and names the assumption that could kill one, and the answers go up on the projector while everyone is still there. It's one HTML page, one config file, and a Google Apps Script that writes to a Sheet. There's no build step, and participants don't need accounts.

[METHOD.md](METHOD.md) explains the design decisions, which are the part worth reusing.

## How it works

- Participants open a link on their phone, back up to three options, flag up to three with the assumption that could kill them, and write a sentence about each.
- The projector shows the same page with `#present` at the end of the address. It refreshes every eight seconds.
- To close, you put the responses on screen and ask an AI what the room just said, live.

## Why two questions at once

If you only ask what people like, you measure enthusiasm. Rooms have plenty of it, everyone leaves agreeing, and the idea fails later on a risk someone in the room could have named that day. Asking for the risk at the same time as the appetite, from the same person, about the same option, is the point. It also gives the skeptic in the room a sanctioned way to be skeptical, so the objection arrives as data instead of friction.

## Try it in ten seconds

```bash
cp cards.example.js cards.js
cp config.example.js config.js
open index.html
```

With no Sheet connected, the page runs as a full preview: everything works and nothing is saved. That's on purpose, so you can hand someone the file and they understand the tool without deploying anything.

## Setting it up for a real session

1. **A Sheet.** Make one. Copy its id out of the URL.
2. **The collector.** `script.google.com` → new project → paste [`collector/Code.gs`](collector/Code.gs) → set `SHEET_ID` → Deploy → New deployment → **Web app**, Execute as: Me, Who has access: Anyone. Copy the `/exec` URL.
3. **Connect them.** Put that URL in `config.js`.
4. **Host the page.** Anywhere static.
5. **Test on a phone before the day.** Back one, flag one, Send, and check a row lands in the Sheet. Then open the URL with `#present`.

## Testing

`node smoke.js` runs the page's script and does what a participant does: open a group, open a card, back it, hit the limit, back and flag the same card. I added it after a real failure: an edit deleted the constant that held the pick limit, the page still loaded, and every card quietly stopped responding. Only running the code catches that.

## Writing your own options

`cards.example.js` has the format and nine examples. Each option has four fields:

| Field | What it holds |
|---|---|
| `name` | the job, in the words of the person who has it |
| `who` | who actually has it. "Everyone" means you haven't found them yet |
| `today` | what they do about it right now. There's always something |
| `bet` | the assumption that has to hold for this to be worth doing |

People tend to skip `bet`, and it's the field the second question is built on.

## What you get

One row per pick, with each participant's own sentence in the `why` column. The counts tell you what was popular; the sentences tell you what people meant, and they're what holds up when it's time to decide. Anything a participant types that starts with `=`, `+`, `-` or `@` is escaped, so it can't land in the Sheet as a formula.

---

More of my work: [github.com/amijach1103](https://github.com/amijach1103) · MIT license

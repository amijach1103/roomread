# How to run this, and why it is built this way

The code here is small. The decisions are the part worth copying.

---

## 1 · The cards are options, not prompts

Every card comes out of research done before the session. Four fields: the job
in the words of the person who has it, **who** actually has it, what they do
**today**, and the **bet**: the assumption that has to hold for it to be worth
doing.

⛔ **Do not ask a room to generate options.** You get the loudest person's list,
scored by how recently everyone heard it. Asking a room to *choose among
sourced options* is a different activity with a different output, and it is the
one that produces a decision you can act on the next morning.

A card the room cannot check is a card the room will guess at.

## 2 · The constraint is the instrument

**Back up to three.** Not "vote for what you like."

Unlimited voting measures enthusiasm, which is abundant and free. A cap forces
a trade, and a trade is information. The moment someone has to drop their
fourth pick, they have to say, at least to themselves, why the other three
matter more.

Three is not sacred. `max` is one line of config. But there is a number, and it
is small.

## 3 · Two axes, not one

Every card can be **backed** and, separately, **flagged with the assumption
that could kill it.** A card can be both, and the ones that are both are the
most interesting rows in the sheet.

⭐ **This is the decision that matters most.** A one-axis instrument measures
appetite. Rooms have plenty of appetite, everyone leaves agreeing, and the
project fails eighteen months later on a risk somebody in that room could have
named on the day. Asking for the risk *at the same time as the enthusiasm*, from
the same person, about the same card, is how you find out what people actually
believe.

The second axis also does something to the room: it gives the sceptic a
sanctioned way to be sceptical, so the objection lands as data instead of as
friction.

## 4 · Nothing for a participant to install, join, or log into

A page, a URL, and a Google Sheet. No accounts, no app, no build step, no
dependencies. Participants open a link on the phone in their hand.

Every step you add between "here is the link" and "I have answered" costs you
responses, and it costs you the least confident people first, which are
usually the ones whose answer you most needed.

## 5 · It works with no backend at all

Open `index.html` with an empty `config.js` and the whole instrument runs as a
preview. Every interaction works; nothing is saved.

⭐ **This is not a dev convenience.** It means you can show someone the thing
itself rather than describe it, before anything is deployed. Most workshop
tooling cannot be demonstrated until it is finished, which is why most of it is
designed by argument.

## 6 · Read it back live

Open the same URL with `#present` on the projector. It polls every eight
seconds and shows the room to itself while the room is still in it.

Sending answers into a void and promising a summary later is a different
activity: a survey. People answer surveys differently, and less.

## 7 · Close by synthesising in front of them

Put the responses on screen and ask an AI what the room just said, live, with
everyone watching.

⭐ **No engineering. It is the beat people remember**, and it is the honest
version of the claim most decks only assert: that AI is useful for going wide
and a human is needed to converge. Doing it on their data, in the room, is the
proof. Saying it on a slide is not.

## 8 · Have a fallback and never mention it

If the page is down: read the cards off the slide and take answers out loud.
The live synthesis still works: type what people say straight in.

⛔ **Do not announce the fallback.** A room told the tool might fail spends the
session watching the tool.

## 9 · Sanitise every field before it reaches the sheet

Anything arriving that starts with `=`, `+`, `-` or `@` gets a leading
apostrophe. Otherwise a participant's answer lands in a spreadsheet cell as a
live formula.

It is four lines. It is in `collector/Code.gs`. In a workshop tool nobody will
ever run again, it still belongs there, because the thing you are demonstrating
is how you work.

---

## Running it

**Before:** write the cards, deploy the collector, put the `/exec` URL in
`config.js`, host the page anywhere static. Test on a phone: back one, flag one,
send, and check a row appears.

**On the day:** share the plain URL with the room, keep `#present` on the
projector, close with the live synthesis.

**After:** the sheet has one row per pick, with the participant's own words in
the `why` column. ⭐ **The `why` column is the output.** The counts tell you what
was popular; the sentences tell you what was meant, and they are the only part
that survives contact with a decision.

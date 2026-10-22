/* Smoke test. Runs the page's script in Node against a minimal DOM stub and
 * exercises the paths a participant actually takes.
 *
 * It exists because of a real failure: a patch silently deleted `const MAX`,
 * the file still PARSED, and every card stopped responding to clicks. A syntax
 * check passes a missing constant. Only running the code catches it.
 *
 *   node smoke.js
 */
const fs = require("fs"), vm = require("vm");

const el = () => ({ innerHTML: "", onclick: null, dataset: {}, value: "",
                    querySelectorAll: () => [], querySelector: () => el(),
                    addEventListener(){}, focus(){}, scrollIntoView(){},
                    getBoundingClientRect: () => ({top:0,height:0}),
                    classList:{add(){},remove(){},toggle(){}} });

const nodes = { app: el(), modal: el() };
const sandbox = {
  console,
  document: {
    getElementById: id => nodes[id] || el(),
    querySelectorAll: () => [],
    addEventListener(){},
  },
  location: { hash: "" },
  setInterval: () => 0,
  setTimeout: () => 0,
  fetch: async () => { throw new Error("offline in smoke test"); },
  alert: () => {},
  scrollTo: () => {},
  scrollY: 0,
  matchMedia: () => ({matches:false, addEventListener(){}}),
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("cards.example.js", "utf8"), sandbox, {filename:"cards.example.js"});

const html = fs.readFileSync("index.html", "utf8");
const script = html.match(/<script>\n([\s\S]*?)\n<\/script>/)[1];
// expose the internals the test drives
// Export by name, tolerating an identifier the page no longer defines — the
// point of this file is to REPORT a missing one, not to die on it.
const EXPORTS = ["open","toggle","toggleCat","renderAll","post","JOBS","CATS","MAX","state"];
const exportLine = "\n;globalThis.__t = {" +
  EXPORTS.map(n => `${n}: (typeof ${n} === "undefined" ? undefined : ${n})`).join(", ") + "};";
try {
  vm.runInContext(script + exportLine, sandbox, {filename:"index.html"});
} catch (e) {
  console.log("  FAIL  the page script did not run\n        " + e.message);
  process.exit(1);
}

const t = sandbox.__t;
let failed = 0;
const ok = (name, fn) => {
  try { fn(); console.log("  PASS  " + name); }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message}`); failed++; }
};
const assert = (c, m) => { if (!c) throw new Error(m); };

ok("the deck loaded", () => assert(t.CATS.length > 0 && Object.keys(t.JOBS).length > 0,
    "no cards — check cards.js loads before the page script"));

ok("the pick cap is defined", () => {
  assert(typeof t.MAX === "number" && t.MAX > 0, "MAX is not a number — this is the bug the file exists for");
});

ok("every card has every field the page renders", () => {
  for (const j of Object.values(t.JOBS))
    for (const f of ["id", "name", "who", "today", "bet"])
      assert(typeof j[f] === "string" && j[f].length, `card ${j.id} is missing ${f}`);
});

ok("opening a group renders", () => { t.toggleCat(0); assert(nodes.app.innerHTML.length > 0, "empty page"); });

ok("opening a card renders the detail panel", () => {
  const id = Object.keys(t.JOBS)[0];
  t.open(id);
  assert(nodes.modal.innerHTML.includes(t.JOBS[id].name), "detail panel did not render the card");
});

ok("backing a card sticks, and the cap holds", () => {
  const ids = Object.keys(t.JOBS);
  ids.forEach(id => t.toggle("green", id));
  assert(Object.keys(t.state.green).length === t.MAX,
         `expected the cap of ${t.MAX}, got ${Object.keys(t.state.green).length}`);
});

ok("a card can be backed and flagged at once", () => {
  const id = Object.keys(t.state.green)[0];
  t.toggle("pink", id);
  assert(id in t.state.green && id in t.state.pink, "the two axes are not independent");
});

(async () => {
  try {
    sandbox.fetch = async () => ({ ok: true, status: 200,
                                   json: async () => ({ ok: false, error: "bad sheet id" }) });
    let threw = false;
    try { await t.post({}); } catch (e) { threw = true; }
    assert(threw, "post() reported a rejected save as sent");
    console.log("  PASS  a save the collector rejects is reported, not swallowed");
  } catch (e) {
    console.log(`  FAIL  a save the collector rejects is reported, not swallowed\n        ${e.message}`);
    failed++;
  }
  console.log(failed ? `\n${failed} failed` : "\nall passed");
  process.exit(failed ? 1 : 0);
})();

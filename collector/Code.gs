/**
 * roomread — response collector.
 *
 * A Google Apps Script Web App. It receives one submission per participant and
 * writes one row per pick into a Sheet. That is the entire backend.
 * Deploy: Apps Script > Deploy > New deployment > Web app
 *   Execute as:      Me
 *   Who has access:  Anyone
 * Copy the /exec URL into config.js in the GitHub repo.
 */
var SHEET_ID = 'PUT_YOUR_SHEET_ID_HERE';  // the long id in the Sheet's URL

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    var now = new Date().toISOString();
    var rid = Utilities.getUuid();
    var rows = [];
    (body.compelling || []).forEach(function (x) {
      rows.push([now, rid, 'backed', safe(x.job), safe(x.label), safe(x.why)]);
    });
    (body.watchouts || []).forEach(function (x) {
      rows.push([now, rid, 'assumption', safe(x.job), safe(x.label), safe(x.why)]);
    });
    if (rows.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
    }
    return json({ ok: true, saved: rows.length });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    var last = sheet.getLastRow();
    if (last < 2) return json({ ok: true, responses: 0, rows: [] });
    var values = sheet.getRange(2, 1, last - 1, 6).getValues();
    var ids = {}, rows = [];
    values.forEach(function (r) {
      ids[r[1]] = 1;
      rows.push({ kind: r[2], job: r[3], label: r[4], comment: r[5] });
    });
    return json({ ok: true, responses: Object.keys(ids).length, rows: rows });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Never let a typed answer land in a cell as a live formula. */
function safe(v) {
  var s = (v === null || v === undefined) ? '' : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

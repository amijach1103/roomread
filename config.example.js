/* Copy to config.js. One line: the Apps Script Web App /exec URL.
 *
 * With no endpoint the page still runs as a full preview — every interaction
 * works and nothing is saved. That is deliberate: you should be able to hand
 * someone the file and have them understand the instrument in ten seconds,
 * without deploying anything.
 */
window.ROOMREAD = Object.assign(window.ROOMREAD || {}, {
  endpoint: "",
});

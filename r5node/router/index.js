/*eslint-env node, es6 */
"use strict";

module.exports = (app, server) => {
	app.use("/node", require("./routes/sampleData")(server));
	app.use("/node/sample", require("./routes/sampleData")(server));
};
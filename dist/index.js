"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const App_1 = require("./App");
const serverConfig_1 = require("./config/serverConfig");
// Configure server
const port = process.env.PORT || serverConfig_1.Server.port || 3000;
// Launch the server
App_1.default.listen(port, (err) => {
    // Handle any errors if the y appear
    if (err) {
        return new Error(err);
    }
    // Otherwise, just indicate that the server is listening.
    return console.log(`Server is online and listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
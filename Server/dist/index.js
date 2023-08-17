"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
console.log("starting");
const PORT = 2000;
const app = (0, express_1.default)();
app.get("/api/", (req, res) => {
    res.send({ "test": "hello" });
});
// app.use
app.listen(PORT, () => console.log(`Server Runining on ${PORT}`));
//# sourceMappingURL=index.js.map
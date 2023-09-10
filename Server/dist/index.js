"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./Routes/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//? to-do's
// ##info api
// check if connected to Mysql then connect to server
// ###send Cookies
// Add Routes and Controllers
// Routes
// ###Pro Error Handling
//* hash password
// ###login and signup
// ###res.status(200).json({user : user._id})
// ###cookie vaildation
// ###auth middleware
const PORT = 2000;
const app = (0, express_1.default)();
//* middleWares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "https://bookmarks-devaxmed.onrender.com" }));
app.use((req, res, next) => {
    console.log(">>>>>>>>>>> # API Info # <<<<<<<<<<<<<<<<\n");
    console.log("header :>>", req.header);
    console.log('req.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next();
});
app.use(routes_1.default);
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
// curl -H Origin:https://bookmark-devaxmed.onrender.com --head http://bookmarks-devaxmed.onrender.com

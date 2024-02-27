"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database = __importStar(require("./config/database"));
const index_route_1 = __importDefault(require("./routes/client/index.route"));
const express_flash_1 = __importDefault(require("express-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express_1.default.static(`${__dirname}/public`));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
//flash
app.use((0, cookie_parser_1.default)(process.env.SECRET_FLASH_KEY));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_FLASH_KEY,
    resave: false,
    saveUninitialized: true,
}));
app.use((0, express_flash_1.default)());
//end flash
database.connect();
(0, index_route_1.default)(app);
//setup quantity cart
app.locals.quantityCart = 0;
//end quantity cart
//setup alert cart data
app.locals.cartData = {};
//end setup alert cart data
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server running");
});
//# sourceMappingURL=index.js.map
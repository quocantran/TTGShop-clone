"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_route_1 = __importDefault(require("./home.route"));
const products_route_1 = __importDefault(require("./products.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const collections_route_1 = __importDefault(require("./collections.route"));
const account_route_1 = __importDefault(require("./account.route"));
const cartMiddleware_1 = __importDefault(require("../../middleware/cartMiddleware"));
const cart_route_1 = __importDefault(require("./cart.route"));
function routes(app) {
    app.use(cartMiddleware_1.default);
    app.use("/", home_route_1.default);
    app.use("/", products_route_1.default);
    app.use("/", collections_route_1.default);
    app.use("/account", account_route_1.default);
    app.use("/", cart_route_1.default);
    app.use("/", auth_route_1.default);
    app.use(function (req, res, next) {
        res.render("client/pages/404/index.pug");
    });
}
exports.default = routes;
//# sourceMappingURL=index.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("device"));
const checkDevice = (req, res, next) => {
    const userDevice = (0, device_1.default)(req.headers["user-agent"]);
    if (userDevice.is("phone")) {
        return res.render("client/pages/mobile/index.pug");
    }
    next();
};
exports.default = checkDevice;
//# sourceMappingURL=checkdeviceMiddleware.js.map
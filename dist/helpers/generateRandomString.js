"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomNumberString(length) {
    const digits = "0123456789";
    let randomNumberString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomNumberString += digits[randomIndex];
    }
    return randomNumberString;
}
exports.default = generateRandomNumberString;
//# sourceMappingURL=generateRandomString.js.map
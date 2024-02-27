"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatPrice(price) {
    let formattedPrice = price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return formattedPrice.replace(/\u00a0₫/gi, "₫");
}
exports.default = formatPrice;
//# sourceMappingURL=convertMoney.js.map
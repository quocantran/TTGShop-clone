"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertImage(data) {
    for (const item of data) {
        item.image_url = item.image_url.replace("small", "large");
    }
    return data;
}
exports.default = convertImage;
//# sourceMappingURL=convertImage.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioExtract = void 0;
const child_process_1 = require("child_process");
async function audioExtract(filePath, outPath) {
    const child = (0, child_process_1.spawnSync)('ffmpeg', ['-i', filePath, '-vn', outPath]);
    if (child.status !== 0) {
        throw new Error('Audio extraction failed');
    }
    return true;
}
exports.audioExtract = audioExtract;
//# sourceMappingURL=audio-extract.js.map
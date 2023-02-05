"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoDownload = void 0;
const nodejs_file_downloader_1 = __importDefault(require("nodejs-file-downloader"));
async function videoDownload(video) {
    const downloader = new nodejs_file_downloader_1.default({
        fileName: `${video.id}.mp4`,
        url: video.url,
        maxAttempts: 3,
        directory: './downloads'
    });
    const result = await downloader.download();
    if (result.downloadStatus !== 'COMPLETE') {
        throw new Error('Video download failed');
    }
    return result.filePath;
}
exports.videoDownload = videoDownload;
//# sourceMappingURL=video-download.js.map
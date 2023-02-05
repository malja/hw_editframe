"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleVideoCompose = void 0;
async function simpleVideoCompose(client, options) {
    const defaults = {
        audioUrl: "",
        text: {
            value: "Hello World!",
            position: {
                x: 0,
                y: 0
            },
            size: 15,
            color: "#FF0000"
        },
        imageUrl: ""
    };
    options = Object.assign(defaults, options);
    const composition = await client.videos.new({
        duration: 7,
        dimensions: {
            width: 800,
            height: 600
        }
    });
    composition.addText({
        text: options.text.value,
        color: options.text.color,
        fontSize: options.text.size
    }, {
        position: options.text.position
    });
    composition.addAudio(options.audioUrl);
    composition.addImage(options.imageUrl);
    const response = await composition.encodeSync();
    if (!response.isReady || response.isFailed) {
        throw new Error('Video was not processed properly');
    }
    return {
        url: response.downloadUrl,
        id: response.id
    };
}
exports.simpleVideoCompose = simpleVideoCompose;
//# sourceMappingURL=simple-video-compose.js.map
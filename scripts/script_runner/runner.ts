import Queue from 'bull'
import {simpleVideoCompose} from "@ef/video_composer";
import {Editframe} from "@editframe/editframe-js";
import {videoDownload} from "@ef/video_composer/src/video-download";
import {audioExtract} from "@ef/video_composer/src/audio-extract";
import dotenv from "dotenv";
dotenv.config()

console.log("Running in:", process.cwd())

function start() {
  console.log('Starting queue consumer')

  const queue = new Queue('video-compose', {
    redis: {
      port: parseInt(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    }
  })

  console.log('Queue created')

  const client = new Editframe({
    clientId: process.env.EDITFRAME_CLIENT_ID,
    token: process.env.EDITFRAME_API_TOKEN
  })

  console.log('Editframe client created')

  queue.process(async (job, done) => {
    console.log('Job received', job)

    const compositionResult = await simpleVideoCompose(client, job.data)
    /*
    const compositionResult = {
      url: "https://api.editframe.com/v2/videos/YLbOanpqNX/download?client_id=7zxzrM6GAMjNmoDqK63QXe",
      id: "YLbOanpqNX"
    }
    */

    await job.progress(33)

    console.log('Composition done')

    const downloadedVideoPath = await videoDownload(compositionResult)
    await job.progress(66)

    console.log('Downloaded')

    await audioExtract(downloadedVideoPath, `./audio/${compositionResult.id}.mp3`)
    await job.progress(100)
    console.log('Audio extracted')
    done();
  })

  queue.on('exit', (worker, code, signal) => {
    console.error('Worker died')
  })
}

start()

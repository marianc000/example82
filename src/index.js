import express from 'express';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

//
// HTTP GET route we can use to check if the service is handling requests.
//
app.get("/live", (req, res) => {
    res.sendStatus(200);
});

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => { // Route for streaming video.

    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });

    createReadStream(videoPath).pipe(res);
});

// if (fileURLToPath(import.meta.url) === process.argv[1])
//
// Starts the HTTP server.
//
const server = app.listen(PORT, () => {
    console.log(`Microservice online:` + PORT);
});

export { app, server };

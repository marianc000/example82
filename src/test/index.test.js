import request from "supertest";
import { app, server } from "../index.js";

describe("video streaming microservice", () => {

    test("microservice can handle requests", async () => {

        const response = await request(app).get("/live"); // Makes a request to the "/live" route.
        expect(response.status).toBe(200); // Verify that a HTTP status code 200 is returned, indicating success.
        
        await new Promise(resolve => server.close(() => {
            console.log('HTTP server closed');
            resolve();
        }));
    });
});
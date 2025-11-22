import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),   // Block SQLi, XSS, injections

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Only Google, Bing
    }),

    tokenBucket({
      mode: "LIVE",
      interval: 10,   // every 10 seconds
      capacity: 10,   // max 10 requests
      refillRate: 5,  // add 5 tokens every interval
    }),
  ],
});

export default aj;

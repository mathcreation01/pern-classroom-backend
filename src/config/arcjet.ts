import arcjet, { detectBot, shield, slidingWindow} from "@arcjet/node";

if(!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY environment variable is not set");
}
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", 
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      interval: '2s', // 1 minute
      max: 5, // Max 100 requests per interval
    }),
      // Tracked by IP address by default, but this can be customized
    
  ],
});

export default aj;
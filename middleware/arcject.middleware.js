import aj from "../config/arcjet.config.js";
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // Block if spoofed bot
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Forbidden - Spoofed Bot" });
    }

    // Block hosting / VPN IPs
    if (decision.ip.isHosting()) {
      return res.status(403).json({ error: "Forbidden - Hosting IP" });
    }

    // Block bot detection
    if (decision.reason?.isBot()) {
      return res.status(403).json({ error: "Bot Detected" });
    }

    // Rate limit exceeded
    if (decision.reason?.isRateLimit()) {
      return res.status(429).json({ error: "Rate Limit Exceeded" });
    }

    // If denied for ANY other reason
    if (decision.isDenied()) {
      return res.status(403).json({ error: "Access Denied" });
    }

    next();
  } catch (error) {
    console.error("Arcjet Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;

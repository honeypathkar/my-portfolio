import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
let redisClient = null;

try {
  redisClient = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      // Retry connection every 5 seconds, up to 3 times, then stop
      if (times > 3) {
        console.warn("Redis connection failed. Falling back to database directly.");
        return null;
      }
      return 5000;
    }
  });

  redisClient.on("error", (err) => {
    console.error("Redis Error:", err.message);
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis successfully.");
  });
} catch (e) {
  console.error("Could not initialize Redis client:", e.message);
  redisClient = null;
}

export const getCache = async (key) => {
  if (!redisClient || redisClient.status !== "ready") return null;
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Redis GET Error:", error);
    return null;
  }
};

export const setCache = async (key, data, ttlSeconds = 3600) => {
  if (!redisClient || redisClient.status !== "ready") return;
  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttlSeconds);
  } catch (error) {
    console.error("Redis SET Error:", error);
  }
};

export const clearCacheByPattern = async (pattern) => {
  if (!redisClient || redisClient.status !== "ready") return;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
      console.log(`Cleared Redis keys matching pattern: ${pattern}`);
    }
  } catch (error) {
    console.error("Redis DEL Pattern Error:", error);
  }
};

export const clearAllPortfolioCache = async () => {
  await clearCacheByPattern("cache:projects*");
  await clearCacheByPattern("cache:experience*");
};

export default redisClient;

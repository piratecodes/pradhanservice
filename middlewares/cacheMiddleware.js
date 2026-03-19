import NodeCache from 'node-cache';

// Create the cache engine. stdTTL is "Time To Live" in seconds.
// 86400 seconds = 24 hours.
export const appCache = new NodeCache({ stdTTL: 86400 });

export const cacheRoute = (req, res, next) => {
  // Only cache GET requests (never cache POSTs like form submissions!)
  if (req.method !== 'GET') return next();

  // We use the exact URL as the unique storage key (e.g., '/api/v1/cities')
  const key = req.originalUrl;
  const cachedData = appCache.get(key);

  if (cachedData) {
    // CACHE HIT ⚡: Serve instantly from RAM
    return res.status(200).json(cachedData);
  } else {
    // CACHE MISS 🐌: Hijack the response to save it for next time
    const originalJson = res.json;
    
    res.json = function (body) {
      // Only cache successful 200-level responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        
        // 🛡️ THE BULLETPROOF FIX 🛡️
        // This strips away all hidden Mongoose functions and circular references,
        // leaving only pure, lightweight data for the cache to store safely!
        const safeBody = JSON.parse(JSON.stringify(body));
        appCache.set(key, safeBody);
        
      }
      // Resume sending the data to the user
      originalJson.call(this, body);
    };
    
    next(); // Move on to the controller to fetch from MongoDB
  }
};
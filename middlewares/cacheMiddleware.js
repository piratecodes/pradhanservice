import NodeCache from 'node-cache';

// Create the cache engine. stdTTL is "Time To Live" in seconds. (24 hours)
export const appCache = new NodeCache({ stdTTL: 86400 });

export const cacheRoute = (req, res, next) => {
  if (req.method !== 'GET') return next();

  const key = req.originalUrl;
  const cachedData = appCache.get(key);

  if (cachedData) {
    return res.status(200).json(cachedData);
  } else {
    const originalJson = res.json;
    
    res.json = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const safeBody = JSON.parse(JSON.stringify(body));
        appCache.set(key, safeBody);
      }
      originalJson.call(this, body);
    };
    
    next(); 
  }
};

// 🌟 NEW: The Cache Clearing Tool
export const clearCache = (routePattern) => {
  if (!routePattern) {
    // If no specific route is given, nuke the whole cache (Nuclear Option)
    appCache.flushAll();
    console.log('🧹 Cache completely flushed.');
    return;
  }

  // Find all cached keys that match the pattern (e.g., '/location-pages/kolkata')
  const allKeys = appCache.keys();
  const keysToDelete = allKeys.filter(key => key.includes(routePattern));
  
  if (keysToDelete.length > 0) {
    appCache.del(keysToDelete);
    console.log(`🧹 Cache cleared for routes matching: ${routePattern}`);
  }
};
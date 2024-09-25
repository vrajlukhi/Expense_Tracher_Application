const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const cacheData = async (key, fetchFunction) => {
    if (cache.has(key)) {
        return cache.get(key);
    } else {
        const result = await fetchFunction();
        cache.set(key, result);
        return result;
    }
};

module.exports = { cacheData };
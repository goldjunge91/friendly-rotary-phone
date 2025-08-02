export function getProperty(obj, key) {
    if (typeof key !== 'string') {
        return undefined;
    }
    const keys = key.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
        if (current === null || typeof current !== 'object') {
            return undefined;
        }
        current = current[keys[i]];
    }
    return current;
}

function sumArray(arr) {
    if (!Array.isArray(arr)) {
        return 0;
    }
    return arr.reduce((sum, current) => sum + current, 0);
}

module.exports = {
    sumArray,
};

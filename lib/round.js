function round(number, precision = 1) {
    return Math.round(number * (10 ** precision)) / (10 ** precision);
}

export { round };
module.exports = function roundToTwo(num, dec) {    
    return +(Math.round(num + ("e+" + dec))  + ("e-" + dec));
}
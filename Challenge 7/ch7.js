function weirdMultiply(sentence) {
    let result = 1;
    let strNumber = sentence.toString();
    if (strNumber.length === 1) {
        result = parseInt(strNumber);
        return result;
    } else {
        for (let i = 0; i < strNumber.length; i++) {
            result *= parseInt(strNumber.charAt(i));
        }
        return weirdMultiply(result);
    }
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));

function indexPrime(param1) {
  let result = [];
  let number = 2;

  while (result.length < param1) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      result.push(number);
    }
    number++
  }

  return result[result.length - 1];
}

console.log(indexPrime(4))
console.log(indexPrime(500))
console.log(indexPrime(37786))
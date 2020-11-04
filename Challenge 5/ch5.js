function stringManipulation(word) {
  let vocal = 'aiueoAIUEO';
  let isVocal = false;
  let result = '';
  for (let i = 0; i < vocal.length; i++) {
    if (word[0] === vocal[i]) {
      isVocal = true;
    }
  }
  if (isVocal) {
    result = word;
  } else {
    result = word.substring(1) + word[0] + 'nyo';
  }
  console.log(result);
}

stringManipulation('ayam');
stringManipulation('bebek');
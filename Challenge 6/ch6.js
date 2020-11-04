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
  return result;
}

function sentenceManipulation(sentence) {
  let arraySentence = sentence.split(' ');
  for (let i = 0; i < arraySentence.length; i++) {
    arraySentence[i] = stringManipulation(arraySentence[i]);
  }
  let newSentence = arraySentence.join(' ');
  console.log(newSentence);
}

sentenceManipulation('ibu pergi ke pasar bersama aku');
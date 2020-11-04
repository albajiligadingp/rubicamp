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
    return newSentence;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini > '
});

rl.prompt();
rl.on('line', (input) => {
    console.log('hasil konversi: ' + sentenceManipulation(input));
    rl.prompt();
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);
});


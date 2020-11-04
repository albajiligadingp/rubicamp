const fs = require('fs'); // module file system
const readline = require('readline'); // module readline
// const data = JSON.parse(fs.readFileSync('data.json')); readFile synchronous

fs.readFile('data.json', 'utf8', (err, jsonString) => { // readFile asynchronous
    if (err) throw err;
    const data = JSON.parse(jsonString);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Tebakan: '
    });

    let count = 0;
    console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n');
    console.log('Pertanyaan:', data[count].question);
    rl.prompt();

    rl.on('line', (input) => {
        if (count < data.length - 1) {
            if (input.toLowerCase() == data[count].answer) {
                count++;
                console.log('Selamat Anda benar!\n');
                console.log('Pertanyaan:', data[count].question);
                rl.prompt();
            } else {
                console.log('Wkwkwk, Anda kurang beruntung!\n');
                rl.prompt();
            }
        } else {
            if (input.toLowerCase() == data[count].answer) {
                console.log('Selamat Anda benar!\n');
                console.log('Hore Anda menang!');
                process.exit(0);
            } else {
                console.log('Wkwkwk, Anda kurang beruntung!\n');
                rl.prompt();
            }
        }
    });
});

const fs = require('fs'); // module file system
//const data = JSON.parse(fs.readFileSync('data.json')); //readFile synchronous
const readline = require('readline'); // module readline
let read = process.argv[2];

fs.readFile('data.json', 'utf8', (err, jsonString) => { //readFile asynchronous
    if (err) throw err;
    const data = JSON.parse(jsonString);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Jawaban: '
    });

    if (!read) {
        console.log("Tolong sertakan nama file sebagai inputan soalnya.");
        console.log("Misalnya 'node solution.js data.json.'");
        process.exit(0);
    } else {
        console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini " + process.argv[2]);
        console.log("Untuk bermain jawablah dengan jawaban yang sesuai.");
        console.log("Gunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
    
        let count = 0;
        let wrong = 0;
        console.log('Pertanyaan:', data[count].question);
        rl.prompt();
    
        rl.on('line', (input) => {
            if (count < data.length - 1) {
                if (input.toLowerCase() !== 'skip') {
                    if (input.toLowerCase() === data[count].answer) {
                        count++;
                        console.log('Anda beruntung!\n');
                        console.log('Pertanyaan:', data[count].question);
                        rl.prompt();
                    } else {
                        wrong++;
                        console.log('\nAnda kurang beruntung! Anda telah salah ' + wrong + ' kali, silahkan coba lagi.');
                        rl.prompt();
                    }
                } else {
                    if (input.toLowerCase() === 'skip') {
                        data.push(data[count]);
                        console.log('\nPertanyaan:', data[count + 1].question);
                        rl.prompt();
                        count++;
                        wrong = 0;
                    }
                }
            } else {
                if (input.toLowerCase() === data[count].answer) {
                    console.log('Anda beruntung!\n');
                    console.log('Anda berhasil!');
                    process.exit(0);
                } else {
                    wrong++;
                    console.log('\nAnda kurang beruntung! Anda telah salah ' + wrong + ' kali, silahkan coba lagi.');
                    rl.prompt();
                }
            }
        })
    }
})


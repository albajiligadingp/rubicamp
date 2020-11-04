const fs = require('fs');

let read = process.argv[2];
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

if (!read) {
    console.log('>>> JS TODO <<<');
    console.log('$ node todo.js <command>');
    console.log('$ node todo.js list');
    console.log('$ node todo.js task <task_id>');
    console.log('$ node todo.js add <task_content>');
    console.log('$ node todo.js delete <task_id>');
    console.log('$ node todo.js complete <task_id)');
    console.log('$ node todo.js uncomplete (ctask_id)');
    console.log('$ node todo.js list:outstanding asc|desc');
    console.log('$ node todo.js list:completed asc|desc');
    console.log('$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>');
    console.log('$ node todo.js filter:<tag_name>');
    process.exit(0);
}

switch (read) {
    case 'add':
        let sentence = '';
        for (let i = 3; i < process.argv.length; i++) {
            sentence += process.argv[i] + ' ';
        }
        data.push({
            'task': sentence.trim(),
            'status': false,
            'tag': [],
        })
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
        console.log(`"${sentence.trim()}" telah ditambahkan.`);
        break;

    case 'list':
        console.log('Daftar Pekerjaan')
        for (let i = 0; i < data.length; i++) {
            console.log(`${i + 1}. [${data[i].status ? 'X' : ' '}] ${data[i].task}`);
        }
        break;

    case 'delete':
        let deleteItem = parseInt(process.argv[3] - 1);
        let item = data[deleteItem];
        data.splice(deleteItem, 1);
        console.log(`"${item.task}" telah dihapus dari daftar.`);
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
        break;

    case 'complete':
        let completeItem = parseInt(process.argv[3] - 1);
        data[completeItem].status = true;
        console.log(`"${data[completeItem].task}" telah selesai.`);
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
        break;

    case 'uncomplete':
        let uncompleteItem = parseInt(process.argv[3] - 1);
        data[uncompleteItem].status = false;
        console.log(`"${data[uncompleteItem].task}" status selesai dibatalkan.`);
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
        break;

    case 'list:outstanding':
        console.log('Daftar Pekerjaan');
        if (process.argv[3] === 'asc') {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].status) {
                    console.log(`${i + 1}. [${data[i].status ? 'X' : ' '}] ${data[i].task}`);
                }
            }
        } else if (process.argv[3] === 'desc') {
            for (let j = data.length - 1; j >= 0; j--) {
                if (!data[j].status) {
                    console.log(`${j + 1}. [${data[j].status ? 'X' : ' '}] ${data[j].task}`);
                }
            }
        }
        break;

    case 'list:complete':
        console.log('Daftar Pekerjaan');
        if (process.argv[3] === 'asc') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].status) {
                    console.log(`${i + 1}. [${data[i].status ? 'X' : ' '}] ${data[i].task}`);
                }
            }
        } else if (process.argv[3] === 'desc') {
            for (let j = data.length - 1; j >= 0; j--) {
                if (data[j].status) {
                    console.log(`${j + 1}. [${data[j].status ? 'X' : ' '}] ${data[j].task}`);
                }
            }
        }
        break;

    case 'tag':
        let tagItem = parseInt(process.argv[3] - 1);
        for (let i = 4; i < process.argv.length; i++) {
            data[tagItem].tag.push(process.argv[i]);
        }
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
        console.log(`"${data[tagItem].tag}" telah ditambahkan ke dalam daftar "${data[tagItem].task}"`);
        break;

    default: // filter
        let filterItem = process.argv[2].split(':');
        for (let i = 0; i < data.length; i++) {
            if (data[i].tag.includes(filterItem[1])) {
                console.log('Daftar Pekerjaan')
                console.log(`${i + 1}. [${data[i].status ? 'X' : ' '}] ${data[i].task}`);
            }
        }
        break;
}


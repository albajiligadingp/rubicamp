const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const Table = require('cli-table');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./university.db', err => {
    if (err) throw err;
});

class University {
    loginInterface() {
        console.log("==============================================");
        console.log("Welcome to Universitas Pendidikan Indonesia");
        console.log("Jl. Setiabudhi No. 225");
        console.log("==============================================");
        const login = new Login();
        login.login();
    }
}

class Login extends University {
    login() {
        const sqlUname = `SELECT username FROM admin WHERE username = ?`;
        const sqlPass = `SELECT password FROM admin WHERE password = ?`;

        rl.question('username: ', answer => {
            let uname = answer;

            db.all(sqlUname, [uname], (err) => {
                if (err) throw err;

                console.log('==============================================');
                rl.question('password: ', answer => {
                    let pass = answer;

                    db.all(sqlPass, [pass], (err, rows) => {
                        if (err) throw err;

                        if (rows.length > 0 && pass === rows[0].password) {
                            console.log('==============================================');
                            console.log(`Welcome, ${uname} your access level is: ADMIN `);
                            const success = new Dashboard();
                            success.menuInterface();
                        } else {
                            console.log();
                            console.log('Username atau password salah.');
                            const login = new University();
                            login.loginInterface();
                        }
                    });
                });
            });
        });
    }
}

class Dashboard {
    menuInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Mahasiswa");
        console.log("[2] Jurusan");
        console.log("[3] Dosen");
        console.log("[4] Mata kuliah");
        console.log("[5] Kontrak");
        console.log("[6] Keluar");
        console.log("==============================================");
        return this.askMenu();
    }

    askMenu() {
        rl.question('Masukkan salah satu no, dari opsi diatas: ', (answer) => {
            switch (answer) {
                case '1':
                    const mahasiswa = new Mahasiswa();
                    mahasiswa.mahasiswaInterface();
                    break;
                case '2':
                    const jurusan = new Jurusan();
                    jurusan.jurusanInterface();
                    break;
                case '3':
                    const dosen = new Dosen();
                    dosen.dosenInterface();
                    break;
                case '4':
                    const matkul = new Matkul();
                    matkul.matkulInterface();
                    break;
                case '5':
                    const kontrak = new Kontrak();
                    kontrak.kontrakInterface();
                    break;
                case '6':
                    process.exit(0);
                    break
                default:
                    this.question();
                    break;
            }
        });
    }
}

// Kelola Data Mahasiswa
class Mahasiswa {
    mahasiswaInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Daftar murid");
        console.log("[2] Cari murid");
        console.log("[3] Tambah murid");
        console.log("[4] Hapus murid");
        console.log("[5] Kembali");
        console.log("==============================================");
        return this.askMahasiswaMenu();
    }

    askMahasiswaMenu() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showMahasiswa();
                    break;
                case '2':
                    this.searchMahasiswa();
                    break;
                case '3':
                    this.addMahasiswa();
                    break;
                case '4':
                    this.deleteMahasiswa();
                    break;
                case '5':
                    const kembali = new Dashboard();
                    kembali.menuInterface();
                    break;
                default:
                    this.mahasiswaInterface();
                    break;
            }
        });
    }

    showMahasiswa() {
        const sql = `SELECT * FROM mahasiswa`;

        db.all(sql, [], (err, rows) => {
            if (err) throw err;

            const table = new Table({
                head: ['NIM', 'Nama', 'Alamat', 'Umur', 'Jurusan'],
                colWidths: [10, 25, 15, 10, 10]
            });

            rows.forEach(row => {
                table.push([row.nim, row.nama, row.alamat, row.umur, row.jurusan]);
            });

            console.log('==============================================');
            console.log(table.toString());
            this.mahasiswaInterface();
        });
    }

    searchMahasiswa() {
        console.log('==============================================');
        rl.question('Masukkan NIM: ', (answer) => {
            let nim = answer;
            const sql = `SELECT nim, nama, alamat, umur, jurusan FROM mahasiswa WHERE mahasiswa.nim = ?`

            db.all(sql, [nim], (err, rows) => {
                if (err) throw err;

                if (rows.length > 0) {
                    console.log('==============================================');
                    console.log('Data Mahasiswa');
                    console.log('==============================================');
                    console.log(`NIM      : ${rows[0].nim}`);
                    console.log(`Nama     : ${rows[0].nama}`);
                    console.log(`Alamat   : ${rows[0].alamat}`);
                    console.log(`Umur     : ${rows[0].umur}`);
                    console.log(`Jurusan  : ${rows[0].jurusan}`);
                    this.mahasiswaInterface();
                } else {
                    console.log('==============================================');
                    console.log(`Mahasiswa dengan NIM: ${nim} tidak terdaftar.`);
                    this.searchMahasiswa();
                }
            })
        })
    }

    addMahasiswa() {
        console.log('==============================================');
        console.log('Lengkapi data di bawah ini:');
        rl.question("NIM: ", (nim) => {
            rl.question("Nama: ", (nama) => {
                rl.question("Alamat: ", (alamat) => {
                    rl.question("Umur: ", (umur) => {
                        rl.question("Jurusan: ", (jurusan) => {
                            const sql = `INSERT INTO mahasiswa (nim, nama, alamat, umur, jurusan) VALUES (?, ?, ?, ?, ?)`;

                            let newNim = nim;
                            let newNama = nama;
                            let newAlamat = alamat;
                            let newUmur = umur;
                            let newJurusan = jurusan;

                            db.all(sql, [newNim, newNama, newAlamat, newUmur, newJurusan], (err) => {
                                if (err) throw err;
                                console.log('==============================================');
                                console.log('Data mahasiswa baru berhasil ditambahkan.');
                                this.mahasiswaInterface();
                            })
                        })
                    })
                })
            })
        })
    }

    deleteMahasiswa() {
        console.log('====================================================');
        rl.question('Masukkan NIM mahasiswa yang akan dihapus: ', answer => {
            let nim = answer;
            const sql = `DELETE FROM mahasiswa WHERE nim = ?`;

            db.run(sql, [nim], err => {
                if (err) throw err;
                console.log('==============================================');
                console.log(`Mahasiswa dengan NIM: ${nim} telah dihapus.`);
                this.mahasiswaInterface();
            });
        });
    }
}

// Kelola Data Jurusan
class Jurusan {
    jurusanInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Daftar jurusan");
        console.log("[2] Cari jurusan");
        console.log("[3] Tambah jurusan");
        console.log("[4] Hapus jurusan");
        console.log("[5] Kembali");
        console.log("==============================================");
        return this.askJurusanMenu();
    }

    askJurusanMenu() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showJurusan();
                    break;
                case '2':
                    this.searchJurusan();
                    break;
                case '3':
                    this.addJurusan();
                    break;
                case '4':
                    this.deleteJurusan();
                    break;
                case '5':
                    const kembali = new Dashboard();
                    kembali.menuInterface();
                    break;
                default:
                    this.jurusanInterface();
                    break;
            }
        });
    }

    showJurusan() {
        const sql = `SELECT * FROM jurusan`;

        db.all(sql, [], (err, rows) => {
            if (err) throw err;

            const table = new Table({
                head: ['ID Jurusan', 'Nama Jurusan'],
                colWidths: [10, 25]
            });

            rows.forEach(row => {
                table.push([row.idjurusan, row.namajurusan]);
            });

            console.log('==============================================');
            console.log(table.toString());
            this.jurusanInterface();
        });
    }

    searchJurusan() {
        console.log('==============================================');
        rl.question('Masukkan ID Jurusan: ', (answer) => {
            let id = answer;
            const sql = `SELECT idjurusan, namajurusan FROM jurusan WHERE jurusan.idjurusan = ?`;

            db.all(sql, [id], (err, rows) => {
                if (err) throw err;

                if (rows.length > 0) {
                    console.log('==============================================');
                    console.log('Data Jurusan');
                    console.log('==============================================');
                    console.log(`ID Jurusan   : ${rows[0].idjurusan}`);
                    console.log(`Nama Jurusan : ${rows[0].namajurusan}`);
                } else {
                    console.log('==============================================');
                    console.log(`Jurusan dengan ID: ${id} tidak terdaftar.`);
                }
                this.jurusanInterface();
            })
        })
    }

    addJurusan() {
        console.log('==============================================');
        console.log('Lengkapi data di bawah ini:');
        rl.question("ID Jurusan: ", (idjurusan) => {
            rl.question("Nama Jurusan: ", (namajurusan) => {
                const sql = `INSERT INTO jurusan (idjurusan, namajurusan) VALUES (?, ?)`;

                let newId = idjurusan;
                let newNama = namajurusan;

                db.all(sql, [newId, newNama], (err) => {
                    if (err) throw err;
                    console.log('==============================================');
                    console.log('Data jurusan baru berhasil ditambahkan.');
                    this.jurusanInterface();
                })
            })
        })
    }

    deleteJurusan() {
        console.log('====================================================');
        rl.question('Masukkan ID Jurusan yang akan dihapus: ', answer => {
            let id = answer;
            const sql = `DELETE FROM jurusan WHERE idjurusan = ?`;

            db.run(sql, [id], err => {
                if (err) throw err;
                console.log('==============================================');
                console.log(`Jurusan dengan ID: ${id} telah dihapus.`);
                this.jurusanInterface();
            });
        });
    }
}

// Kelola Data Dosen
class Dosen {
    dosenInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Daftar dosen");
        console.log("[2] Cari dosen");
        console.log("[3] Tambah dosen");
        console.log("[4] Hapus dosen");
        console.log("[5] Kembali");
        console.log("==============================================");
        return this.askDosenMenu();
    }

    askDosenMenu() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showDosen();
                    break;
                case '2':
                    this.searchDosen();
                    break;
                case '3':
                    this.addDosen();
                    break;
                case '4':
                    this.deleteDosen();
                    break;
                case '5':
                    const kembali = new Dashboard();
                    kembali.menuInterface();
                    break;
                default:
                    this.dosenInterface();
                    break;
            }
        });
    }

    showDosen() {
        const sql = `SELECT * FROM dosen`;

        db.all(sql, [], (err, rows) => {
            if (err) throw err;

            const table = new Table({
                head: ['NIP', 'Nama Dosen'],
                colWidths: [10, 25]
            });

            rows.forEach(row => {
                table.push([row.nip, row.namadosen]);
            });

            console.log('==============================================');
            console.log(table.toString());
            this.dosenInterface();
        });
    }

    searchDosen() {
        console.log('==============================================');
        rl.question('Masukkan NIP: ', (answer) => {
            let nip = answer;
            const sql = `SELECT nip, namadosen FROM dosen WHERE dosen.nip = ?`;

            db.all(sql, [nip], (err, rows) => {
                if (err) throw err;

                if (rows.length > 0) {
                    console.log('==============================================');
                    console.log('Data Dosen');
                    console.log('==============================================');
                    console.log(`NIP        : ${rows[0].nip}`);
                    console.log(`Nama Dosen : ${rows[0].namadosen}`);
                } else {
                    console.log('==============================================');
                    console.log(`Dosen dengan NIP: ${nip} tidak terdaftar.`);
                }
                this.dosenInterface();
            })
        })
    }

    addDosen() {
        console.log('==============================================');
        console.log('Lengkapi data di bawah ini:');
        rl.question("NIP: ", (nip) => {
            rl.question("Nama Dosen: ", (namadosen) => {
                const sql = `INSERT INTO dosen (nip, namadosen) VALUES (?, ?)`;

                let newNip = nip;
                let newNama = namadosen;

                db.all(sql, [newNip, newNama], (err) => {
                    if (err) throw err;
                    console.log('==============================================');
                    console.log('Data dosen baru berhasil ditambahkan.');
                    this.dosenInterface();
                })
            })
        })
    }

    deleteDosen() {
        console.log('====================================================');
        rl.question('Masukkan NIP Dosen yang akan dihapus: ', answer => {
            let nip = answer;
            const sql = `DELETE FROM dosen WHERE nip = ?`;

            db.run(sql, [nip], err => {
                if (err) throw err;
                console.log('==============================================');
                console.log(`Dosen dengan NIP: ${nip} telah dihapus.`);
                this.dosenInterface();
            });
        });
    }
}

// Kelola Data Mata Kuliah
class Matkul {
    matkulInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Daftar mata kuliah");
        console.log("[2] Cari mata kuliah");
        console.log("[3] Tambah mata kuliah");
        console.log("[4] Hapus mata kuliah");
        console.log("[5] Kembali");
        console.log("==============================================");
        return this.askMatkulMenu();
    }

    askMatkulMenu() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showMatkul();
                    break;
                case '2':
                    this.searchMatkul();
                    break;
                case '3':
                    this.addMatkul();
                    break;
                case '4':
                    this.deleteMatkul();
                    break;
                case '5':
                    const kembali = new Dashboard();
                    kembali.menuInterface();
                    break;
                default:
                    this.matkulInterface();
                    break;
            }
        });
    }

    showMatkul() {
        const sql = `SELECT * FROM matakuliah`;

        db.all(sql, [], (err, rows) => {
            if (err) throw err;

            const table = new Table({
                head: ['ID Matkul', 'Nama Matkul', 'SKS', 'Dosen'],
                colWidths: [10, 25, 10, 10]
            });

            rows.forEach(row => {
                table.push([row.idmk, row.namamk, row.sks, row.dosen]);
            });

            console.log('==============================================');
            console.log(table.toString());
            this.matkulInterface();
        });
    }

    searchMatkul() {
        console.log('==============================================');
        rl.question('Masukkan ID Matkul: ', (answer) => {
            let idmk = answer;
            const sql = `SELECT idmk, namamk, sks, dosen FROM matakuliah WHERE matakuliah.idmk = ?`;

            db.all(sql, [idmk], (err, rows) => {
                if (err) throw err;

                if (rows.length > 0) {
                    console.log('==============================================');
                    console.log('Data Mata Kuliah');
                    console.log('==============================================');
                    console.log(`ID Matkul   : ${rows[0].idmk}`);
                    console.log(`Nama Matkul : ${rows[0].namamk}`);
                    console.log(`SKS         : ${rows[0].sks}`);
                    console.log(`Dosen       : ${rows[0].dosen}`);
                } else {
                    console.log('==============================================');
                    console.log(`Mata kuliah dengan ID: ${idmk} tidak terdaftar.`);
                }
                this.matkulInterface();
            })
        })
    }

    addMatkul() {
        console.log('==============================================');
        console.log('Lengkapi data di bawah ini:');
        rl.question("ID Matkul: ", (idmk) => {
            rl.question("Nama Matkul: ", (namamk) => {
                rl.question("SKS: ", (sks) => {
                    rl.question("Dosen: ", (dosen) => {
                        const sql = `INSERT INTO matakuliah (idmk, namamk, sks, dosen) VALUES (?, ?, ?, ?)`;
        
                        let newId = idmk;
                        let newNama = namamk;
                        let newSks = sks;
                        let newDosen = dosen;
        
                        db.all(sql, [newId, newNama, newSks, newDosen], (err) => {
                            if (err) throw err;
                            console.log('==============================================');
                            console.log('Data mata kuliah baru berhasil ditambahkan.');
                            this.matkulInterface();
                        })
                    })
                })
            })
        })
    }

    deleteMatkul() {
        console.log('====================================================');
        rl.question('Masukkan ID Matkul yang akan dihapus: ', answer => {
            let idmk = answer;
            const sql = `DELETE FROM matakuliah WHERE idmk = ?`;

            db.run(sql, [idmk], err => {
                if (err) throw err;
                console.log('==============================================');
                console.log(`Mata kuliah dengan ID: ${idmk} telah dihapus.`);
                this.matkulInterface();
            });
        });
    }
}

// Kelola Data Kontrak
class Kontrak {
    kontrakInterface() {
        console.log("==============================================");
        console.log("Silahkan pilih opsi di bawah ini:");
        console.log("[1] Daftar kontrak");
        console.log("[2] Cari kontrak");
        console.log("[3] Tambah kontrak");
        console.log("[4] Hapus kontrak");
        console.log("[5] Kembali");
        console.log("==============================================");
        return this.askKontrakMenu();
    }

    askKontrakMenu() {
        return rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showKontrak();
                    break;
                case '2':
                    this.searchKontrak();
                    break;
                case '3':
                    this.addKontrak();
                    break;
                case '4':
                    this.deleteKontrak();
                    break;
                case '5':
                    const kembali = new Dashboard();
                    kembali.menuInterface();
                    break;
                default:
                    this.kontrakInterface();
                    break;
            }
        });
    }

    showKontrak() {
        const sql = `SELECT * FROM report`;

        db.all(sql, [], (err, rows) => {
            if (err) throw err;

            const table = new Table({
                head: ['ID Kontrak', 'NIM', 'Dosen', 'Mata Kuliah', 'Nilai'],
                colWidths: [10, 10, 10, 10, 10]
            });

            rows.forEach(row => {
                table.push([row.idreport, row.nim, row.dosen, row.matakuliah, row.nilai]);
            });

            console.log('==============================================');
            console.log(table.toString());
            this.kontrakInterface();
        });
    }

    searchKontrak() {
        console.log('==============================================');
        rl.question('Masukkan ID Kontrak: ', (answer) => {
            let idreport = answer;
            const sql = `SELECT idreport, nim, dosen, matakuliah, nilai FROM report WHERE report.idreport = ?`;

            db.all(sql, [idreport], (err, rows) => {
                if (err) throw err;

                if (rows.length > 0) {
                    console.log('==============================================');
                    console.log('Data Kontrak');
                    console.log('==============================================');
                    console.log(`ID Kontrak  : ${rows[0].idreport}`);
                    console.log(`NIM         : ${rows[0].nim}`);
                    console.log(`Dosen       : ${rows[0].dosen}`);
                    console.log(`Mata Kuliah : ${rows[0].matakuliah}`);
                    console.log(`Nilai       : ${rows[0].nilai}`);
                } else {
                    console.log('==============================================');
                    console.log(`Kontrak dengan ID: ${idreport} tidak terdaftar.`);
                }
                this.kontrakInterface();
            })
        })
    }

    addKontrak() {
        console.log('==============================================');
        console.log('Lengkapi data di bawah ini:');
        rl.question("ID Kontrak: ", (idreport) => {
            rl.question("NIM: ", (nim) => {
                rl.question("Dosen: ", (dosen) => {
                    rl.question("Mata Kuliah: ", (matakuliah) => {
                        rl.question("Nilai: ", (nilai) => {
                            const sql = `INSERT INTO report (idreport, nim, dosen, matakuliah, nilai) VALUES (?, ?, ?, ?, ?)`;
            
                            let newId = idreport;
                            let newNim = nim;
                            let newDosen = dosen;
                            let newMatkul = matakuliah;
                            let newNilai = nilai;
            
                            db.all(sql, [newId, newNim, newDosen, newMatkul, newNilai], (err) => {
                                if (err) throw err;
                                console.log('==============================================');
                                console.log('Data kontrak baru berhasil ditambahkan.');
                                this.kontrakInterface();
                            })
                        })
                    })
                })
            })
        })
    }

    deleteKontrak() {
        console.log('====================================================');
        rl.question('Masukkan ID Kontrak yang akan dihapus: ', answer => {
            let idreport = answer;
            const sql = `DELETE FROM report WHERE idreport = ?`;

            db.run(sql, [idreport], err => {
                if (err) throw err;
                console.log('==============================================');
                console.log(`Kontrak dengan ID: ${idreport} telah dihapus.`);
                this.kontrakInterface();
            });
        });
    }
}

const start = new University();
start.loginInterface();
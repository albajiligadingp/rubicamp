-- create database
sqlite3 university.db

-- create and insert into table admin
CREATE TABLE admin (
  username VARCHAR(255) NOT NULL,
  password CHAR(9) NOT NULL
);

INSERT INTO admin (
  username,
  password
) VALUES (
  "gading",
  "gading313"
);

-- create and insert into table mahasiswa
CREATE TABLE mahasiswa (
  nim TEXT PRIMARY KEY, 
  nama TEXT NOT NULL, 
  alamat TEXT NOT NULL,
  umur INTEGER NOT NULL,
  jurusan TEXT NOT NULL, 
  FOREIGN KEY (jurusan) REFERENCES jurusan(idjurusan)
);

INSERT INTO mahasiswa ( 
  nim, 
  nama, 
  alamat,
  umur,
  jurusan 
) VALUES ( 
  "0001", 
  "Albajili Gading P", 
  "Bogor",
  20, 
  1
);

INSERT INTO mahasiswa ( 
  nim, 
  nama, 
  alamat,
  umur, 
  jurusan 
) VALUES ( 
  "0002", 
  "Ade Sugiono", 
  "Cirebon",
  19, 
  2 
);

INSERT INTO mahasiswa ( 
  nim, 
  nama, 
  alamat,
  umur, 
  jurusan 
) VALUES ( 
  "0003", 
  "Yuda Aditya", 
  "Bandung",
  21, 
  3 
);

-- create and insert into tabel jurusan
CREATE TABLE jurusan (
  idjurusan INTEGER PRIMARY KEY, 
  namajurusan TEXT NOT NULL 
);

INSERT INTO jurusan (namajurusan) VALUES ("Bahasa Jepang");
INSERT INTO jurusan (namajurusan) VALUES ("Bahasa Cina");
INSERT INTO jurusan (namajurusan) VALUES ("Bahasa Rusia");

-- create and insert into tabel dosen
CREATE TABLE dosen (
  nip TEXT PRIMARY KEY, 
  namadosen TEXT NOT NULL 
);

INSERT INTO dosen (nip, namadosen) VALUES ("TI1", "Rubi Henjaya");
INSERT INTO dosen (nip, namadosen) VALUES ("TI2", "Agung Drajat");
INSERT INTO dosen (nip, namadosen) VALUES ("TI3", "Zidny Ilma");

-- create and insert into tabel mata kuliah
CREATE TABLE matakuliah ( 
  idmk INTEGER PRIMARY KEY, 
  namamk TEXT NOT NULL, 
  sks INTEGER NOT NULL,
  dosen TEXT NOT NULL,
  FOREIGN KEY (dosen) REFERENCES dosen(nip)
);

INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Hiragana",  4, "TI1");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Katakana",  4, "TI2");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Kanji",  4, "TI2");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Hangeul",  4, "TI3");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Tata Bahasa",  3, "TI1");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Peribahasa",  2, "TI2");
INSERT INTO matakuliah ( namamk, sks, dosen ) VALUES ( "Data Mining",  3, "TI3");

-- create and insert into tabel report
CREATE TABLE report (
  idreport INTEGER PRIMARY KEY, 
  nim TEXT NOT NULL, 
  dosen TEXT NOT NULL, 
  matakuliah INTEGER NOT NULL, 
  nilai TEXT NOT NULL, 
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
  FOREIGN KEY (dosen) REFERENCES dosen(nip),
  FOREIGN KEY (matakuliah) REFERENCES matakuliah(idmk)
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0001", 
  "TI1", 
  1, 
  "A"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0001", 
  "TI1", 
  2, 
  "A"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0001", 
  "TI1", 
  3, 
  "B"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0002", 
  "TI2", 
  4, 
  "D"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0002", 
  "TI2", 
  7, 
  "B"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0003", 
  "TI3", 
  5, 
  "B"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0003", 
  "TI3", 
  6, 
  "B"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0003", 
  "TI3", 
  7, 
  "B"
);

INSERT INTO report ( 
  nim, 
  dosen, 
  matakuliah, 
  nilai 
) VALUES ( 
  "0002", 
  "TI3", 
  7, 
  "E"
);

SELECT * FROM admin;
SELECT * FROM mahasiswa;
SELECT * FROM jurusan;
SELECT * FROM dosen;
SELECT * FROM matakuliah;
SELECT * FROM report;
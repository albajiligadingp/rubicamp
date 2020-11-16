-- 1
SELECT
  nim,
  nama,
  alamat,
  umur,
  jurusan,
  namajurusan
FROM
  mahasiswa,
  jurusan
WHERE
  mahasiswa.jurusan = jurusan.idjurusan;

-- 2
SELECT
  *
FROM
  mahasiswa
WHERE
  umur < 20;

-- 3
SELECT
  nama,
  nilai
FROM
  mahasiswa,
  report
WHERE
  mahasiswa.nim = report.nim
AND
  report.nilai <= 'B';

-- 4
SELECT
  nama,
  sum(matakuliah.sks)
FROM
  mahasiswa,
  matakuliah,
  report
WHERE
  mahasiswa.nim = report.nim
AND
  report.matakuliah = matakuliah.idmk
GROUP BY
  mahasiswa.nama
HAVING
  sum(matakuliah.sks) > 10;

-- 5
SELECT
  nama,
  namamk
FROM
  mahasiswa,
  matakuliah,
  report
WHERE
  mahasiswa.nim = report.nim
AND
  report.matakuliah = matakuliah.idmk
AND
  matakuliah.namamk = 'Data Mining'; 

-- 6
SELECT
  namadosen,
  count(mahasiswa.nama)
FROM
  mahasiswa,
  dosen,
  report
WHERE
  mahasiswa.nim = report.nim
AND
  report.dosen = dosen.nip
GROUP BY
  mahasiswa.nama
HAVING
  count(mahasiswa.nama);

-- 7
SELECT
  nama,
  umur
FROM
  mahasiswa
ORDER BY
  umur
ASC;

-- 8
-- WHERE
SELECT
  nama,
  namajurusan,
  namadosen,
  namamk,
  nilai
FROM
  mahasiswa,
  jurusan,
  dosen,
  matakuliah,
  report
WHERE
  mahasiswa.nim = report.nim
AND
  mahasiswa.jurusan = jurusan.idjurusan
AND
  dosen.nip = report.dosen
AND
  matakuliah.idmk = report.matakuliah
AND
  report.nilai > 'C';

-- JOIN
SELECT
  nama,
  namajurusan,
  namadosen,
  namamk,
  nilai
FROM
  mahasiswa
JOIN
  jurusan
ON
  mahasiswa.jurusan = jurusan.idjurusan
JOIN
  dosen
ON
  dosen.nip = report.dosen
JOIN
  matakuliah
ON 
  matakuliah.idmk = report.matakuliah
JOIN
  report
ON
  mahasiswa.nim = report.nim
AND
  report.nilai > 'C';

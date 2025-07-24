const express = require('express');
const app = express();
const pool = require('./database'); // import koneksi
const port = 3000;

app.use(express.json());

// Contoh route untuk ambil semua buku
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error ambil data buku');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

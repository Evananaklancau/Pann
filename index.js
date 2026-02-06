const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambah ini buat baca folder
const app = express();

app.use(cors());

// --- DATABASE TETEP SAMA ---
const databaseGame = [
    { pertanyaan: "🇮🇩", jawaban: "Indonesia", hint: "Negara kepulauan terbesar" },
    { pertanyaan: "🇲🇾", jawaban: "Malaysia", hint: "Rata-rata Indonesia" },
    { pertanyaan: "🇯🇵", jawaban: "Jepang", hint: "Negara Matahari Terbit" }
];

// --- 1. BIAR BISA BUKA HTML (HOME) ---
// Pas orang buka link utama, arahkan ke file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 2. API ENDPOINTS ---
app.get('/api/tebak-bendera', (req, res) => {
    const random = databaseGame[Math.floor(Math.random() * databaseGame.length)];
    res.json({
        status: true,
        soal: `Negara manakah ini? ${random.pertanyaan}`,
        hint: `Petunjuk: ${random.hint}`
    });
});

app.get('/api/jawab', (req, res) => {
    const tebakanUser = req.query.tebakan;
    const cek = databaseGame.find(item => item.jawaban.toLowerCase() === tebakanUser.toLowerCase());
    if (cek) {
        res.json({ status: true, message: "🎉 BENER!" });
    } else {
        res.json({ status: false, message: "❌ SALAH!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API & Web jalan di port ${PORT}`);
});

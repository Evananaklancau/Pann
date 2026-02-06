const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Statistik sederhana
let hitCount = 0;
const startTime = new Date();

// Middleware buat ngitung request
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) hitCount++;
    next();
});

// Route Utama: Kirim Dashboard HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route Statistik buat Dashboard
app.get('/api/status', (req, res) => {
    res.json({
        status: "Online",
        runtime: Math.floor((new Date() - startTime) / 1000 / 60) + " Menit",
        total_requests: hitCount,
        memory_usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB"
    });
});

// --- API GAME LU ---
const databaseGame = [
    { pertanyaan: "🇮🇩", jawaban: "Indonesia", hint: "Negara kepulauan terbesar" },
    { pertanyaan: "🇯🇵", jawaban: "Jepang", hint: "Negara Matahari Terbit" }
];

app.get('/api/tebak-bendera', (req, res) => {
    const random = databaseGame[Math.floor(Math.random() * databaseGame.length)];
    res.json({ status: true, soal: random.pertanyaan, hint: random.hint });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Dashboard meluncur!`);
});

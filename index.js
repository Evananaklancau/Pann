const express = require('express');
const cors = require('cors');
const app = express();

// Menggunakan CORS agar file HTML bisa mengakses API ini
app.use(cors());

// Railway akan mengisi process.env.PORT secara otomatis
const PORT = process.env.PORT || 3000;

// --- DATABASE GAME TEBAK BENDERA ---
const databaseGame = [
    { pertanyaan: "🇮🇩", jawaban: "Indonesia", hint: "Negara kepulauan terbesar" },
    { pertanyaan: "🇯🇵", jawaban: "Jepang", hint: "Negara Matahari Terbit" },
    { pertanyaan: "🇧🇷", jawaban: "Brasil", hint: "Negara dengan trofi Piala Dunia terbanyak" },
    { pertanyaan: "🇫🇷", jawaban: "Prancis", hint: "Ibu kotanya Paris" },
    { pertanyaan: "🇸🇦", jawaban: "Arab Saudi", hint: "Negara tempat Mekkah berada" },
    { pertanyaan: "🇰🇷", jawaban: "Korea Selatan", hint: "Negara K-Pop" },
    { pertanyaan: "🇲🇾", jawaban: "Malaysia", hint: "Negara Jiran Indonesia" },
    { pertanyaan: "🇺🇸", jawaban: "Amerika Serikat", hint: "Negara Paman Sam" },
    { pertanyaan: "🇦🇷", jawaban: "Argentina", hint: "Negara Lionel Messi" },
    { pertanyaan: "🇹🇭", jawaban: "Thailand", hint: "Negara Gajah Putih" }
];

// --- ENDPOINT ---

// 1. Home
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "API Game Tebak Bendera Twin Dev di Railway",
        endpoint: {
            ambil_soal: "/api/tebak-bendera",
            jawab: "/api/jawab?tebakan=NamaNegara"
        }
    });
});

// 2. Ambil Soal
app.get('/api/tebak-bendera', (req, res) => {
    const random = databaseGame[Math.floor(Math.random() * databaseGame.length)];
    res.json({
        status: true,
        soal: `Negara manakah ini? ${random.pertanyaan}`,
        hint: `Petunjuk: ${random.hint}`
    });
});

// 3. Jawab Soal
app.get('/api/jawab', (req, res) => {
    const tebakanUser = req.query.tebakan;

    if (!tebakanUser) {
        return res.json({ status: false, message: "Masukkan parameter ?tebakan=" });
    }

    const cek = databaseGame.find(item => item.jawaban.toLowerCase() === tebakanUser.toLowerCase());

    if (cek) {
        res.json({ status: true, message: `🎉 BENER! Jawabannya adalah ${cek.jawaban}.` });
    } else {
        res.json({ status: false, message: "❌ SALAH! Coba lagi bro." });
    }
});

// Menjalankan server pada 0.0.0.0 agar bisa diakses publik
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server Game meluncur di port ${PORT}`);
});

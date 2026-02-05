const express = require('express');
const axios = require('axios');
const app = express();

// Port sesuai screenshot lu tadi
const PORT = 2047;

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "API Twin Dev Online!",
        features: ["/api/tiktok"]
    });
});

// FITUR TIKTOK DOWNLOADER
app.get('/api/tiktok', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.json({
            status: false,
            message: "Masukan parameter url! Contoh: ?url=https://vt.tiktok.com/xxx"
        });
    }

    try {
        // Kita "pinjam" data dari api publik yang stabil
        const response = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${url}`);
        const hasil = response.data;

        // Kita susun ulang biar rapi ala API lu sendiri
        res.json({
            status: true,
            creator: "Twin Dev",
            result: {
                title: hasil.data.title,
                author: hasil.data.author.nickname,
                video: hasil.data.video.noWatermark, // Ini link video tanpa WM
                music: hasil.data.music.play_url,
                cover: hasil.data.video.cover
            }
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Gagal ngambil data, mungkin link salah atau server down."
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server jalan di http://private.mikudev.my.id:${PORT}`);
});

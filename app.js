const express = require('express');
const app = express();
const PORT = 3000;

// Middleware untuk logging sederhana
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Endpoint Utama yang akan kita test
app.get('/api/v1/resource', (req, res) => {
    // Simulasi beban kerja (delay acak antara 50ms - 400ms)
    const simulateLatency = Math.floor(Math.random() * 350) + 50;

    setTimeout(() => {
        // Simulasi error sesekali (5% peluang error) untuk mengetes Threshold k6
        if (Math.random() < 0.05) {
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }

        res.json({
            status: "success",
            data: { id: 1, name: "Performance Test Item" },
            server_latency: `${simulateLatency}ms`
        });
    }, simulateLatency);
});

app.listen(PORT, () => {
    console.log(`🚀 API Demo jalan di http://localhost:${PORT}`);
});
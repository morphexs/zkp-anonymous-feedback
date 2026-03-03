const express = require("express");
const snarkjs = require("snarkjs");
const fs = require("fs");

const app = express();
app.use(express.json());

const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

app.post("/verify", async (req, res) => {
    try {
        const { proof, publicSignals } = req.body;

        if (!proof || !publicSignals) {
            return res.status(400).json({ error: "Missing proof or publicSignals" });
        }

        const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

        res.json({ valid: isValid });

    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ valid: false, error: "Internal verification failure" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ ZKP Verifier Microservice running on http://localhost:${PORT}`);
});
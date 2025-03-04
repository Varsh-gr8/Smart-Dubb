const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
app.post("/upload", upload.single("video"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded successfully: <a href="/uploads/${req.file.filename}" target="_blank">${req.file.filename}</a>`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

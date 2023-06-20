import express from "express";
import path from "path";

const app = express();

app.use(express.static("frontend"));


app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));

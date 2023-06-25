import express from "express";
import path from "path";

// Resolving the current directory path.
const __dirname = path.resolve();


const app = express();

app.use(express.static("frontend", { type: "module" }));


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 5002, () => console.log("Server running..."));

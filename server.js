import express from "express";
import path from "path";
// Resolving the current directory path.
const __dirname = path.resolve();

const app = express();

app.use(
    express.static(path.join(__dirname, "frontend"), {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".js")) {
                res.setHeader(
                    "Content-Type",
                    "application/javascript; charset=utf-8"
                );
            }
            if (filePath.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 5002, () => console.log("Server running..."));

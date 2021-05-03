const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
//const http = require("http");
const port = 4000;

app.use(
    cors({
        origin: 'http://localhost:4000',
        credentials: true
    })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "연결이 되었구나!" });
    console.log("연결이 되었구나!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://naganda.tk:${port}`);
});

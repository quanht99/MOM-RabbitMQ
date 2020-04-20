const express = require('express');
const Body_Parser = require('body-parser');
const morgan = require('morgan');
const app = express();

const controller = require('./controller');

app.use(morgan('tiny'))
app.use(Body_Parser.json());
app.use(Body_Parser.urlencoded({
    extended: false
}));

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.post("/crawl-page", controller.crawlPage);

app.listen(3000, (err) => {
    if (!err) {
        console.log("Server is running in ", 3000);
    }
})

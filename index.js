import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/article/:id", (req, res) => {
    res.render("article.ejs", {
        articleId: req.params.id
    });
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.post("/submit", (req, res) => {
    const date = new Date();
    let today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();  

    res.render("index.ejs", {
        title: req.body["title"],
        content: req.body["content"],
        dateCreated: today
    });
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
})
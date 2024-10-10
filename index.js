import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;
let articleId = 0;
let arrayOfArticle = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        array: arrayOfArticle
    });
})

app.get("/article/:id", (req, res) => {
    let id = req.params.id;
    let articles = arrayOfArticle.filter(a => a.id == id);

    res.render("article.ejs", {
        article: articles[0]
    });
})

app.get("/delete/:id", (req, res) => {
    arrayOfArticle = arrayOfArticle.filter(a => a.id != req.params.id);
    res.redirect("/");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.get("/update/:id", (req, res) => {
    let articles = arrayOfArticle.filter(a => a.id == req.params.id);
    res.render("update.ejs", {
        article: articles[0]
    })
})

app.post("/save/:id", (req, res) => {
    const date = new Date();
    let today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();  
    
    arrayOfArticle = arrayOfArticle.filter(a => a.id != req.params.id);
  
    arrayOfArticle.push({id: parseInt(req.params.id), title: req.body.title, content: req.body.content, date: today});

    res.redirect(`/article/${ req.params.id }`);
})

app.post("/submit", (req, res) => {
    const date = new Date();
    let today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();  

    arrayOfArticle.push({id: articleId++, title: req.body.title, content: req.body.content, date: today});

    res.redirect("/");
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
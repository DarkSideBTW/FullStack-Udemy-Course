//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema);

app
  .route('/articles')
  .get(async (req, res) => {
    try {
      let foundArticles = await Article.find({});
      res.send(foundArticles);
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    try {
      const articleTitle = req.body.title;
      const articleContent = req.body.content;

      const newArticle = new Article({
        title: articleTitle,
        content: articleContent,
      });

      const isSaved = newArticle.save();

      res.send(isSaved);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedArticles = await Article.deleteMany({});
      res.send(deletedArticles);
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port, () => {
  console.log(`Server started on port ${3000}`);
});

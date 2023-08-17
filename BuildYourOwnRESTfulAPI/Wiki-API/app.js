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

//////////////////////////Requests Targetting all Articles///////////////////////

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

/////////////////////////////////////Requests Targetting A Specific Articles///////////////////////

app
  .route('/articles/:articleTitle')
  .get(async (req, res) => {
    try {
      const foundArticle = await Article.findOne({
        title: req.params.articleTitle,
      });
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send('No articles matching that title was found.');
      }
    } catch (err) {
      console.log(err);
    }
  })
  .put(async (req, res) => {
    try {
      const found = await Article.replaceOne(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content }
      );
      res.send(found);
    } catch (err) {
      console.log(err);
    }
  })
  .patch(async (req, res) => {
    try {
      const update = await Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body }
      );
      res.send(update);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const remove = await Article.deleteOne({
        title: req.params.articleTitle,
      });

      res.send(remove);
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port, () => {
  console.log(`Server started on port ${3000}`);
});

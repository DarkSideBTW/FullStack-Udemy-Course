import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let todos = ['todo1', 'todo2'];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', { todosList: todos });
});

app.post('/submit', (req, res) => {
  todos.push(req.body.addTodo);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

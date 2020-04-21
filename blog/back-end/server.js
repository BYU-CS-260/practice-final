const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

// Configure multer so that it will upload to '/public / images '
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  photo: String,
  blurb: String,
  entry: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Blog.find();
    res.send({
      entries: entries
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error"
    });
  }
});

app.get('/api/entries/:id', async (req, res) => {
  try {
    let entry = await Blog.findOne({
      _id: req.params.id
    });
    if (!entry) {
      return res.status(404).send({
        message: "entry not found"
      });
    }
    res.send({
      entry: entry
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error"
    });
  }
});

app.post('/api/entries', upload.single('photo'), async (req, res) => {
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a photo."
    });

  if (!req.body.author || !req.body.title || !req.body.blurb || !req.body.entry) {
    return res.status(400).send({
      message: "missing author or title or blurb or entry"
    });
  }
  const entry = new Blog({
    author: req.body.author,
    title: req.body.title,
    photo: "/images/" + req.file.filename,
    blurb: req.body.blurb,
    entry: req.body.entry
  });
  try {
    await entry.save();
    res.send({
      entry: entry
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error"
    });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

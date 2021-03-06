const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme
const itemSchema = new mongoose.Schema({
  title: String,
  recipeBody: String,
  imageLink: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Recipe', itemSchema);

// delete and item from the museum
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// edit an item 
app.put('/api/items/:id', async (req, res) => {
  console.log("api/items/:id", req.body);
  try {
    //await console.log("before: " + item.title);
    let item = await Item.findOne({
      _id: req.params.id
    });
    await console.log(item.title);
    item.title = req.body.title;
    item.recipeBody = req.body.recipeBody;
    item.imageLink = req.body.imageLink;
    // item.description = req.body.description;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
// app.post('/api/photos', upload.single('photo'), async (req, res) => {
//   if (!req.file) {
//     return res.sendStatus(400);
//   }
//   res.send({
//     path: "/images/" + req.file.filename
//   });
// });

// Create a new item
app.post('/api/items', async (req, res) => {
  console.log("api/items ", req.body);
  const item = new Item({
    title: req.body.title,
    imageLink: req.body.imageLink,
    recipeBody: req.body.recipeBody,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3002!'));

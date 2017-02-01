// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

const cors = require('cors')

const corsOptions = {
  origin: 'https://api.instagram.com'
}

app.use(cors(corsOptions))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.get('/users', function (req, res) {
  console.log('I received a GET request');

  db.users.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/users', function (req, res) {
  console.log(req.body);
  db.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/users/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.users.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/users/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.users.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/users/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.firstname);
  db.users.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {firstname: req.body.firstname, email: req.body.email, lastname: req.body.lastname}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
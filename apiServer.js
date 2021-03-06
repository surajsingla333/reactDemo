var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var keys = require('./keys');

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/bookshop';

const CONNECTION_URL = `mongodb+srv://saral_suraj:74jbmsyk@clusterreact-mtlkk.mongodb.net/bookshop?retryWrites=true&w=majority`;
// 'mongodb+srv://saral_suraj:74jbmsyk@clusterreact-mtlkk.mongodb.net/bookshop?retryWrites=true&w=majority';

// MONGO ATLAS
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true,  useUnifiedTopology: true });

// LOCAL DB
// mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
db.once('open', function() {
    console.log("We are connected to DB");
    // addRandomValue();
})

// --->> SET UP SESSIONS <<----
app.use(session({
  secret: 'mySectreString',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60})
}))
// SAVE SESSION CART API
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      console.log("\n\n");
      console.log("CART POST ERROR");
      console.log("\n");
      console.log(err);
      console.log("\n\n")
    }
    res.json(req.session.cart);
  })
})

// GET SESSION CART API
app.get('/cart', function(req,res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

// --->> END SESSION SET UP <<----

var Books = require('./models/books.js');

// --->> POST BOOKS <<-------
app.post('/books', function(req, res){
  var book = req.body;
  console.log("\n\nIN POST METHOD\n\n");

  Books.create(book, function(err, books){
    if(err){
      console.log("\n\n");
      console.log("BOOK POST ERROR");
      console.log("\n");
      console.log(err);
      console.log("\n\n")
    }
    res.json(books);
  })
});

// --->> GET BOOKS <<-----
app.get('/books', function(req, res){
    console.log("GETTING BOOKS");
  Books.find(function(err, books){
    if(err){
      console.log("\n\n");
      console.log("BOOK GET ERROR");
      console.log("\n");
      console.log(err);
      console.log("\n\n")
    }
    res.json(books);
  })
});

// --->> DELETE BOOKS <<-----
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      console.log("\n\n");
      console.log("BOOK DELETE ERROR");
      console.log("\n");
      console.log(err);
      console.log("\n\n")
    }
    res.json(books);
  })
});

// --->> UPDATE BOOKS <<-----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = {_id: req.params._id};

  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      console.log("\n\nERROR\n\n")
      console.log("\n\n");
      console.log("BOOK UPDATE ERROR");
      console.log("\n");
      console.log(err);
      console.log("\n\n")
    }
    res.json(books);
  })
});

// --->> GET BOOKS IMAGES API<<-----
app.get('/images', function(req,res){
  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILESYSTEM
  const fs = require('fs');
  // READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    var i = 1;
    // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach(function(file){
      filesArr.push({name: file});
      i++;
    });
    // SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  })
})

// END API

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log("API server is listening on 3001")
})

module.exports = app;

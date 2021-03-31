const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://davidag:resilient@cluster0.zmptf.mongodb.net/demo?retryWrites=true&w=majority"
const dbName = "demo"

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
//
app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {books: result, phrases: ["N/A", "Never want to read again","I'd rather not talk about it","Meh","Almost","Amazing"]})
  })
})

app.post('/books', (req, res) => {
  db.collection('books').insertOne({author: req.body.author, title: req.body.title, review: 0, }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/review', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({author: req.body.author, title: req.body.title}, {
    $set: {
      review:req.body.review
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
// app.put('/thumbDown', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1,
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// delete only one book
app.delete('/book', (req, res) => {
  db.collection('books').findOneAndDelete({author: req.body.author, title: req.body.title}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// deletes all books
app.delete('/books', (req, res) => {
  db.collection('books').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

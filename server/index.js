/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable radix */
const express = require('express');

const app = express();
const port = 4000;
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
// console.log('PATH: ', path.join(__dirname, 'build', 'index.html'))
app.use(cors());
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/reviews', (req, res) => {
  req.query.productID = Number.parseInt(req.query.productID);
  // console.log('1111111111111111');
  console.log('REQUEST IN SERVER: ', req.query);
  // db.getAllReviews()
  db.getReviewsByProductID(req.query)
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((error) => {
      console.log('ERROR IN SERVER: ', error);
      res.status(500).send('Error retrieving reviews from db: ', error);
    });
});

// app.get('/productID', (req, res) => {
//   console.log("IN REVIEW SERVICE: ", req.query)
//   // this.setState({
//   //   productID: req.query.params['0']
//   // })
//   axios.get('http://localhost:1963/productID', {
//     params: req.query.params[0]
//   })
//   .then(confirmation => res.send(confirmation))
//   .catch(error => console.log("ERROR IN REVIEW SERVER: ", error))
// })

app.post('/reviews', (req, res) => {
  // console.log(req.body)
  db.saveReviewToDB(req.body)
    .then((confirmation) => {
      res.status(200).send(confirmation);
    })
    .catch((error) => {
      res.status(500).send('Error on server writing review: ', error);
    });
});

app.post('/helpful', (req, res) => {
  db.addHelpfulRating(req.body.productID, req.body._id)
    .then((confirmation) => {
      res.status(200).send(confirmation);
    })
    .catch((error) => {
      res.status(500).send('Error on server adding helpful rating: ', error);
    });
});

app.post('/unhelpful', (req, res) => {
  db.addUnhelpfulRating(req.body.productID, req.body._id)
    .then((confirmation) => {
      res.status(200).send(confirmation);
    })
    .catch((error) => {
      res.status(500).send('Error on server adding helpful rating: ', error);
    });
});

app.listen(port, () => console.log(`Server is posted up at http://localhost:${port} `));

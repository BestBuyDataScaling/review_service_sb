const { pool, client } = require('./postgres.config.js');

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

function argumentSplitter(obj) {
  const keys = Object.keys(obj);
  const vals = Object.values(obj);
  let result = '';
  for (let i = 0; i < keys.length; i++) {
    result += `${keys[i]} = ${vals[i]} `;
  }
  return result;
}

function justValues(obj) {
  return Object.values(obj);
}

function justKeys(obj) {
  return Object.keys(obj);
}

function params(arr, starting = 0) {
  const result = [];
  for (let i = starting + 1; i < starting + arr.length + 1; i++) {
    result.push(`$${i}`);
  }
  return result;
}
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// client.connect()
//   .then(() => console.log('Successfully connected to DB'))
//   .catch(() => console.log('failed to connect to db'))
//   .finally(() => client.end());
// // client.query('SELECT NOW()', (err, res) => {
// //   console.log(err, res);
// //   client.end();
// // });

const updateReview = (revID, updates) => {
  let vals = params(justValues(updates));
  let keys = justKeys(updates);
  console.log(vals);
  let query = keys.map((key, index) => `${key} = ${vals[index]}`);
  console.log(query);
  return pool.query(`UPDATE reviews SET ${query.join(', ')} WHERE reviewid = ${revID}`, [argumentSplitter(updates)])
    .catch((err) => console.log('failed to connect to db :', err))
};

const deleteReview = (revID) => (
  pool.query('DELETE FROM reviews WHERE reviewid = $1', [revID])
    .catch((err) => console.log('failed to connect to db :', err))
);

const addHelpfulRating = (revID) => (
  pool.query('UPDATE reviews SET reviewHelpful = reviewHelpful + 1 WHERE reviewid = ?', [revID])
    .catch(() => console.log('failed to connect to db'))
);

const addUnhelpfulRating = (revID) => (
  pool.query('UPDATE reviews SET reviewHelpful = reviewUnhelpful + 1 WHERE reviewid = ?', [revID])
    .catch(() => console.log('failed to connect to db'))
);

const getAllReviews = () => (
  pool.query('SELECT * FROM reviews')
    .catch(() => console.log('failed to connect to db'))
);

const saveReviewToDB = (reviewData) => {
  const args = justValues(reviewData);
  return pool.query(`INSERT INTO reviews(${justKeys(reviewData).join(', ')}) VALUES(${params(args).join(', ')})`, justValues(reviewData))
    .catch((err) => console.log('failed to connect to db: ', err));
};

const getReviewsByProductID = (productID) => (
  pool.query('SELECT * FROM reviews WHERE productID = $1', justValues(productID))
);

module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;
module.exports.addHelpfulRating = addHelpfulRating;
module.exports.addUnhelpfulRating = addUnhelpfulRating;
module.exports.getAllReviews = getAllReviews;
module.exports.saveReviewToDB = saveReviewToDB;
module.exports.getReviewsByProductID = getReviewsByProductID;

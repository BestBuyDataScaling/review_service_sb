const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('cassReviews.csv');
writeReviews.write('productID|reviewID|reviewHeading|reviewText|reviewUserID|reviewRating|reviewRecommended|reviewHelpful|reviewUnhelpful|reviewQuality|reviewEaseOfUse|reviewValue|createdAt\n', 'utf8');

function writeTenMillionReviews(writer, encoding, callback) {
    let i = 10000000;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const productID = (() => {
          return Math.floor(Math.random() * 10000000) + 1;
        })();
        const reviewHeading = faker.company.bs();
        const reviewText = faker.lorem.sentences();
        const reviewUserID = (() => {
          return Math.floor(Math.random() * 10000000) + 1;
        })();
        const reviewRating = Math.floor(Math.random() * 5) + 1;
        const reviewRecommended = faker.random.boolean();
        const reviewHelpful = faker.random.number(10000);
        const reviewUnhelpful = faker.random.number(10000);
        const reviewQuality = Math.floor(Math.random() * 5) + 1;
        const reviewValue = Math.floor(Math.random() * 5) + 1;
        const reviewEaseOfUse = Math.floor(Math.random() * 5) + 1;
        // faker.date.recent(92)
        const createdAt = new Date(faker.date.recent(92)).getTime();



        // const avatar = faker.image.avatar();
        const data = `${productID}|${id}|${reviewHeading}|${reviewText}|${reviewUserID}|${reviewRating}|${reviewRecommended}|${reviewHelpful}|${reviewUnhelpful}|${reviewQuality}|${reviewEaseOfUse}|${reviewValue}|${createdAt}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
  // see if we should continue, or wait
  // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
  // had to stop early!
  // write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

  writeTenMillionReviews(writeReviews, 'utf-8', () => {
    writeReviews.end();
  });



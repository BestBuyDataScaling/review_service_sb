const faker = require('faker');
const fs = require('fs');

const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('productID|ProductName\n', 'utf8');

function writeTenMillionProducts(writer, encoding, callback) {
    let i = 10000000;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const productName = `${faker.commerce.productAdjective()} ${faker.commerce.productAdjective()} ${faker.commerce.color()} ${faker.commerce.productMaterial()} ${faker.commerce.product()} with ${faker.commerce.color()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`;
        const data = `${id}|${productName}\n`;
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

  writeTenMillionProducts(writeProducts, 'utf-8', () => {
    writeProducts.end();
  });


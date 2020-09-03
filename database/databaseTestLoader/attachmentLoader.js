const faker = require('faker');
const fs = require('fs');

const writeAttachments = fs.createWriteStream('attachments.csv');
writeAttachments.write('attachmentID|attachmentURL|reviewID\n', 'utf8');

function writeTenMillionAttachments(writer, encoding, callback) {
    let i = 10000000;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const attachmentURL = faker.image.image();
        const reviewID = Math.floor(Math.random() * 10000000) + 1;
        const data = `${id}|${attachmentURL}|${reviewID}\n`;
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

  writeTenMillionAttachments(writeAttachments, 'utf-8', () => {
    writeAttachments.end();
  });


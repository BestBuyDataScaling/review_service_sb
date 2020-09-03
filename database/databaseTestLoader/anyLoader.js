const fs = require('fs');

module.exports.csvWriter = (nameOfFile, numberOfRows, CSVheader, delimiterChar, ...dataFuncs) => {
  const writeCSV = fs.createWriteStream(`${nameOfFile}.csv`);
  writeCSV.write(CSVheader + '\n', 'utf8');

  function writeTenMillionCSV(writer, encoding, callback) {
      let i = numberOfRows;
      let id = 0;
      function write() {
        let ok = true;
        do {
          i -= 1;
          id += 1;
          let data = '';
          for (let j = 0; j < dataFuncs.length; j++) {
            if (dataFuncs[j] === 'count') {
              data += `${id}${delimiterChar}`;
            } else {
              data += `${dataFuncs[j]}${delimiterChar}`
            }
          }
          data += '\n';
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

    writeTenMillionCSV(writeCSV, 'utf-8', () => {
      writeCSV.end();
    });
  };

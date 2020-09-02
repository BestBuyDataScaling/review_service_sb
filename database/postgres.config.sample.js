const { Pool, Client } = require('pg');

module.exports.pool = new Pool({
  user: '',
  host: '',
  database: 'bestbuy10mil',
  port: '',
});
module.exports.client = new Client({
  user: '',
  host: '',
  database: 'bestbuy10mil',
  port: '',
});

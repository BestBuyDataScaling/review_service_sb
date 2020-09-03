import { sleep } from 'k6';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

// let's collect all errors in one metric
let errorRate = new Rate('error_rate');

// See https://k6.io/docs/using-k6/options
export let options = {
  thresholds: {
    error_rate: ['rate < 0.1'],
  },
  stages: [
    { duration: '1m', target: 200 },
    { duration: '3m', target: 1000 },
    // { duration: '1m', target: 0 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        Dublin: { loadZone: 'amazon:ie:dublin', percent: 100 },
      },
    },
  },
}

export default function() {
  let item = Math.floor(Math.random() * 10000000) + 1;
  let res = http.get(`http://localhost:4000/reviews/?productID=${item}`);

  errorRate.add(res.status >= 400);

  sleep(1);
}

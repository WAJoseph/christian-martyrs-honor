import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  scenarios: {
    average_load: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
        { duration: "3m", target: 50 }, // Stay at 50 users for 3 minutes
        { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
      ],
      gracefulRampDown: "30s",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests must complete within 1s
    http_req_failed: ["rate<0.01"], // Less than 1% of requests can fail
  },
};

const BASE_URL = "http://localhost:3000";

export default function () {
  // Homepage load
  let res = http.get(BASE_URL);
  check(res, { "homepage status is 200": (r) => r.status === 200 });
  sleep(1);

  // Gallery page load
  res = http.get(`${BASE_URL}/gallery`);
  check(res, { "gallery status is 200": (r) => r.status === 200 });
  sleep(2);

  // Timeline page load (heaviest due to data)
  res = http.get(`${BASE_URL}/timeline`);
  check(res, { "timeline status is 200": (r) => r.status === 200 });
  sleep(3);

  // Testimonies page load with API call
  res = http.get(`${BASE_URL}/community`);
  check(res, { "community status is 200": (r) => r.status === 200 });
  sleep(1);
}

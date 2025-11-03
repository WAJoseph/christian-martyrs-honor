import http from "k6/http";
import { sleep, check } from "k6";
import { Rate } from "k6/metrics";

const moderationFailureRate = new Rate("moderation_failures");

export const options = {
  vus: 50,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must complete within 500ms
    moderation_failures: ["rate<0.1"], // Less than 10% moderation failures allowed
  },
};

const MODERATION_ENDPOINT = "http://localhost:3000/api/moderation";
const TEST_CONTENT = {
  text: "This is a test testimony about St. Stephen and his martyrdom. He showed great courage and faith.",
};

export default function () {
  const res = http.post(MODERATION_ENDPOINT, JSON.stringify(TEST_CONTENT), {
    headers: { "Content-Type": "application/json" },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "moderation successful": (r) => {
      const success = r.json("result.isValid");
      if (!success) {
        moderationFailureRate.add(1);
      }
      return success;
    },
  });

  sleep(1);
}

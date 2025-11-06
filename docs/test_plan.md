# Test Plan and NFR Verification

This document maps each Non-Functional Requirement NFR to concrete test cases, recommended tools, and acceptance criteria. It also lists example test snippets and how to run them.

## Overview

- Unit tests: Jest + React Testing Library for components and domain logic.
- Integration tests: Supertest (or Playwright) for API endpoints.
- E2E tests: Playwright for user flows (submission, search, admin actions).
- Performance & load: k6 for API and moderation microservice performance tests; Playwright for page-load times.
- Accessibility: axe-core (via Playwright or jest-axe).

## Mapping NFRs to tests

NFR1 (Uptime >= 99.5%)

- Type: Monitoring / synthetic checks
- Tool: UptimeRobot / external synthetic monitor or GitHub Actions scheduled probe
- Acceptance: 99.5% availability over 30 days.
- Test: Schedule heartbeat checks to `/health` every 5 minutes. Alert if >0.5% downtime.

NFR2 (RBAC for admin)

- Type: Integration tests
- Tool: Supertest or Playwright
- Acceptance: Admin-only endpoints return 403 for normal users, 200 for admin.
- Test case (integration):
  - POST /api/admin/martyrs (as non-admin) => 403
  - POST /api/admin/martyrs (as admin) => 201

NFR3 (PII minimization & encryption)

- Type: Security review + integration tests
- Tool: Static code review, tests to ensure PII fields are not returned in public endpoints
- Acceptance: Public endpoints do not return PII; data at rest encrypted (DB config)
- Test case:
  - Submit testimony with email -> GET /testimonies/:id (public) does not contain email
  - DB encryption is configured (documented in infra)

NFR4 (Page load 2-3s on mid-range mobile)

- Type: Performance
- Tool: Playwright measured timing / Lighthouse CI
- Acceptance: Largest Contentful Paint (LCP) and Time to Interactive within target on emulated mid-range device
- Test: Playwright script that loads pages with network throttling (Slow 3G / CPU slowdown) and asserts timings.

NFR5 (AI moderation <= 500ms at 95th)

- Type: API performance / load
- Tool: k6
- Acceptance: 95th percentile latency <= 500ms
- Test: k6 script that calls moderation endpoint with realistic payloads and reports p95.

NFR6 (50 concurrent users)

- Type: Load
- Tool: k6
- Acceptance: 50 VUs performing typical flows with <5% error rate and acceptable latency

NFR7 (WCAG)

- Type: Accessibility
- Tool: Playwright + axe-core / jest-axe
- Acceptance: No critical WCAG violations on core pages (homepage, testimony form, gallery)
- Test: Axe scan during Playwright E2E.

NFR8 (Search within 2 clicks)

- Type: E2E
- Tool: Playwright
- Acceptance: User can reach results within 2 clicks from homepage
- Test: Script that clicks search and assert result page opens.

NFR9 (Audit records retention >= 90 days)

- Type: Policy + DB test
- Tool: DB query + integration test
- Acceptance: Audit records query returns records and retention policy (cron job) in infra

NFR10 (Maintainability)

- Type: Process checks
- Tool: Lint, typecheck, unit tests in CI
- Acceptance: CI passes lint, build, tests on PR

NFR11 (Read-only mode)

- Type: Integration
- Tool: Playwright / Supertest
- Acceptance: When READ_ONLY=true, write endpoints return 503 and submissions are queued
- Test: Set READ_ONLY env and POST /api/testimonies -> returns 503 and store queued item

NFR12 (Licensing and attribution)

- Type: Integration / E2E
- Tool: Playwright
- Acceptance: Gallery item view shows licensing metadata fields
- Test: GET gallery item -> contains fields: license_class, attribution_source, author

## Example test snippets

### Jest + React Testing Library (component test)

```ts
// tests/components/Navigation.test.tsx
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/ui/Navigation";

test("renders nav links", () => {
  render(<Navigation />);
  const home = screen.getByRole("link", { name: /Home/i });
  expect(home).toBeInTheDocument();
});
```

### Playwright (page load / E2E)

```js
// tests/e2e/search.spec.js
const { test, expect } = require("@playwright/test");

test("search is reachable within two clicks", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click("text=Search"); // example
  await page.click("text=By Century");
  await expect(page).toHaveURL(/search/);
});
```

### k6 (AI moderation p95)

```js
import http from "k6/http";
import { check } from "k6";
export let options = { vus: 20, duration: "30s" };
export default function () {
  const res = http.post(
    "http://localhost:3000/api/moderate",
    JSON.stringify({ text: "sample" })
  );
  check(res, { "status 200": (r) => r.status === 200 });
}
```

## How to proceed (practical steps)

1. Add testing dependencies:
   - Jest, @testing-library/react, @testing-library/jest-dom
   - Playwright
   - k6 (or use GitHub Actions with performance runners)
2. Add tests incrementally: start with RBAC and API integration (supertest) then UI E2E.
3. Implement monitoring/health endpoint `/health` for uptime checks.
4. Document DB retention policy (migration or job) and verify with queries.
5. Produce PlantUML images (use PlantUML server or local jar) from the `.puml` files in `docs/diagrams/`.

If you want, I can:

- Scaffold Jest + RTL tests and one example test file for the `Navigation` component.
- Add a Playwright example config and an E2E test for the 2-click search.
- Add k6 scripts and a GitHub Actions workflow to run perf checks in CI (optional).

Choose which of the above you want me to implement next and I'll scaffold the files and CI steps.

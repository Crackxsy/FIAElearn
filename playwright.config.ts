import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx prisma migrate deploy && npx prisma db seed && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 180_000,
    reuseExistingServer: false,
    env: { DATABASE_URL: "file:./prisma/e2e.db" },
  },
});

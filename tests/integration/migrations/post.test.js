import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

async function clearDatabase() {
  await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await clearDatabase();
});

test("POST to /api/v1/migrations should return 200", async () => {
  const first_response = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  expect(first_response.status).toBe(201);

  const firstResponseBody = await first_response.json();
  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const second_response = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  expect(second_response.status).toBe(200);

  const secondResponseBody = await second_response.json();
  expect(Array.isArray(secondResponseBody)).toBe(true);
  expect(secondResponseBody.length).toBe(0);
});

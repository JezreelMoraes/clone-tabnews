import orchestrator from 'tests/orchestrator.js';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const databaseDependency = responseBody.dependencies.database;
  expect(databaseDependency.version).toEqual('16.0');

  const parsedMaxConnections = Number(databaseDependency.max_connections);
  expect(databaseDependency.max_connections).toEqual(parsedMaxConnections);

  const parsedOpenedConnections = Number(databaseDependency.opened_connections);
  expect(databaseDependency.opened_connections).toEqual(
    parsedOpenedConnections
  );
  expect(databaseDependency.opened_connections).toBe(1);
});

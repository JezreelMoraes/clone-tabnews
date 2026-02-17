import database from 'infra/database';

async function status(request, response) {
  const databaseVersionResult = await database.query('SHOW server_version;');
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query('SHOW max_connections;');
  const maxConnectionsValue = Number(
    maxConnectionsResult.rows[0].max_connections
  );

  const openedConnectionsResult = await database.query(
    'SELECT count(*) FROM pg_catalog.pg_stat_activity WHERE datname = $1',
    [process.env.POSTGRES_DB]
  );

  const openedConnectionsValue = Number(openedConnectionsResult.rows[0].count);

  response.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;

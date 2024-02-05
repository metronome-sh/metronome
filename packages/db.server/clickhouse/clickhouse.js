const { createClient } = require('@clickhouse/client');
const { env } = require('@metronome/env.server');

const { database, host, password, port, username } = env.clickhouse();

exports.clickhouse = createClient({
  host: `${host}:${port}`,
  username,
  password,
  database,
});

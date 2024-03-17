'use strict';

const { clickhouse } = require('../clickhouse.cjs');

module.exports.up = async function () {
  await clickhouse.command({
    query: `
      CREATE TABLE errors_housekeeping (
        project_id String,
        hash String,
        status String
      ) ENGINE = PostgreSQL(postgres_creds, table='errors_housekeeping')
    `,
  });
};

module.exports.down = async function () {
  await clickhouse.command({
    query: `
      DROP TABLE IF EXISTS errors_housekeeping;
    `,
  });
};

// Update with your config settings.

module.exports = {
  client:"sqlite3",
  useNullAsDefault: true,
  connection: {
      filename: "./data/jsonWebTokenAuth.db3",
  },
  migrations: {
    directory: "./data/migrations",
  },
  seed: { 
    directory: "./data/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    },
  },
};

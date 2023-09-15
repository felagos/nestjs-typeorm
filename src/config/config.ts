export default () => ({
  env: process.env.ENV.toLowerCase(),
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  dbHost: process.env.POSTGRES_HOST,
  dbPort: process.env.POSTGRES_PORT,
});

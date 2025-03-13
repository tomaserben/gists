import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/lib/db/schema.js',
  dbCredentials: {
    url: './sqlite.db'
  },
  dialect: 'sqlite'
});
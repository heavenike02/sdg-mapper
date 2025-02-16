import { Pool } from 'pg';

const pool: Pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-holy-base-a98rjqd4-pooler.gwc.azure.neon.tech',
  database: 'neondb',
  password: 'npg_E2RVGyfKXQa9',
  port: 5432, // default PostgreSQL port
});

export default pool;


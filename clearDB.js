import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.jpwtrmhsrowzmsjfnnap:43417356Octa@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  await client.connect();
  console.log("Connected to DB");

  // Fetch all table names in public schema
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
  `);
  
  const allTables = res.rows.map(r => r.table_name);
  console.log("All tables:", allTables);

  // Filter out any table related to category (e.g. category, categories)
  const tablesToTruncate = allTables.filter(t => !t.toLowerCase().includes('category'));

  if (tablesToTruncate.length > 0) {
    const query = `TRUNCATE TABLE ${tablesToTruncate.map(t => `"${t}"`).join(', ')} CASCADE;`;
    console.log("Executing:", query);
    await client.query(query);
    console.log("Successfully truncated all non-category tables.");
  } else {
    console.log("No tables found to truncate.");
  }

  await client.end();
}

run().catch(console.error);

const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.jpwtrmhsrowzmsjfnnap:43417356Octa@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
});
client.connect().then(() => {
  return client.query("DELETE FROM users WHERE email = 'Admin123@gmail.com'");
}).then((res) => {
  console.log('Rows deleted:', res.rowCount);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

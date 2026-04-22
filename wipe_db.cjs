const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.jpwtrmhsrowzmsjfnnap:43417356Octa@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
});

client.connect().then(() => {
  console.log('Connected to Supabase PostgreSQL database.');
  
  const query = `
    TRUNCATE TABLE 
      appointments, 
      employee_service, 
      employee_work_schedule, 
      services, 
      employees, 
      business_hours, 
      businesses, 
      subscriptions, 
      users 
    CASCADE;
  `;
  
  console.log('Executing TRUNCATE query...');
  return client.query(query);
}).then((res) => {
  console.log('Tables successfully truncated. Categories were preserved.');
  process.exit(0);
}).catch(err => {
  console.error('Error executing query:', err);
  process.exit(1);
});

import { db } from "@vercel/postgres";
// Load driver for postgres
import postgres from "postgres";

const client = await db.connect();

// Create a new connection to Supabase
const connString = process.env.SUPABASE_URL as string;
const sqlSupabase = postgres(connString);

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

async function listResidentKV2() {
  try {
    const data = await sqlSupabase`
      SELECT * FROM resident_kv2
      WHERE nama_resident ILIKE '%Fachrial%';
    `;

    return data;
  } finally {
    await sqlSupabase.end();
  }
}

export async function GET() {
  try {
  	return Response.json(await listResidentKV2());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}

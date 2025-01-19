import { db, sql } from "@vercel/postgres";
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

// KV2
async function listRukunTetangga() {
  const data = await client.sql`
    SELECT
      id,
      rt_number
    FROM rukun_tetangga
    ORDER BY rt_number ASC;
  `;

  return data.rows;
}

async function listStreets() {
  const data = await client.sql`
    SELECT
      id,
      street_name
    FROM streets
    ORDER BY street_name ASC;
  `;

  return data.rows;
}

async function listBlocks() {
  const data = await client.sql`
    SELECT
      id,
      block_name
    FROM blocks
    ORDER BY block_name ASC;
  `;

  return data.rows;
}

async function listHouses() {
  const data = await client.sql`
    SELECT
      houses.id,
      houses.house_number,
      houses.house_owner,
      houses.house_tenants,
      houses.occupied,
      streets.street_name,
      blocks.block_name,
      rukun_tetangga.rt_number
    FROM houses
    JOIN streets ON houses.street_id = streets.id
    JOIN blocks ON houses.block_id = blocks.id
    JOIN rukun_tetangga ON houses.rt_id = rukun_tetangga.id
    WHERE houses.occupied is false
    AND blocks.block_name not ILIKE 'O'
    ORDER BY house_number ASC;
  `;

  return data.rows;
}

async function deleteHouseKV2() {
  const id = "c46aa338-1f20-43d7-86d2-28d28d4775f7, 9f913750-1d3d-4b72-aaff-20d29fe10f55, 5fcdc551-f9c1-4ee0-8537-91875cb4848f, 080a2d41-69b8-435b-a57d-7a3904ee1ac3, 455a75d3-439a-4e1a-a930-e205cee15d3a";
  await client.sql`
    DELETE FROM houses 
    WHERE id IN 
    (
    SELECT
      houses.id
    FROM houses
    JOIN streets ON houses.street_id = streets.id
    JOIN blocks ON houses.block_id = blocks.id
    JOIN rukun_tetangga ON houses.rt_id = rukun_tetangga.id
    WHERE houses.occupied is false
    AND blocks.block_name not ILIKE 'O'
    )
  `;
}

// KV2 Supabase
async function listResidentKV2() {
  try {
    // Fetch reference data
    const blocks = await listBlocks();
    const streets = await listStreets();
    const rukunTetangga = await listRukunTetangga();
    // console.log(rukunTetangga);
    const residents = await sqlSupabase`
      select distinct 
        blok AS block_id, 
        no_rumah AS house_number, 
        nama_jalan AS street_id, 
        rt AS rt_id
      from resident_kv2
      where nama_jalan ILIKE 'JL.WALET'
      and blok ILIKE 'L'
    `;
    // console.log(residents);
    // return data;
    // Map the results
    const mappedResidents = residents.map((resident: any) => {
      const block = blocks.find(b => b.block_name === resident.block_id);
      const street = streets.find(s => s.street_name.toLowerCase() === resident.street_id.split('.')[1].toLowerCase());
      const rt = rukunTetangga.find(r => r.rt_number === ('00' + resident.rt_id));
      // console.log(street);
      return {
        block_id: block ? block.id : null,
        house_number: resident.house_number,
        street_id: street ? street.id : null,
        rt_id: rt ? rt.id : null,
      };
    });

    return mappedResidents;

  } catch (error) {
    console.error('Error fetching resident data:', error);
    throw error;
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

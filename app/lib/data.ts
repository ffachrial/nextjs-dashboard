import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  StreetField,
  BlockField,
  RTField,
  HousesTable,
  HouseForm,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// KV2
export async function fetchStreets() {
  try {
    const data = await sql<StreetField>`
      SELECT
        id,
        street_name
      FROM streets
      ORDER BY street_name ASC
    `;

    const streets = data.rows;
    return streets;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all streets.');
  }
}

export async function fetchBlocks() {
  try {
    const data = await sql<BlockField>`
      SELECT
        id,
        block_name
      FROM blocks
      ORDER BY block_name ASC
    `;

    const blocks = data.rows;
    return blocks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all blocks.');
  }
}

export async function fetchRT() {
  try {
    const data = await sql<RTField>`
      SELECT
        id,
        rt_number
      FROM rukun_tetangga
      ORDER BY rt_number ASC
    `;

    const rtNumber = data.rows;
    return rtNumber;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all blocks.');
  }
}

export async function fetchFilteredHouses( query: string, currentPage: number ) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const houses = await sql<HousesTable>`
      SELECT
        houses.id,
        houses.house_number,
        houses.house_owner,
        houses.occupied,
        blocks.block_name,
        streets.street_name,
        rukun_tetangga.rt_number
      FROM houses
      JOIN blocks ON houses.block_id = blocks.id
      JOIN streets ON houses.street_id = streets.id
      JOIN rukun_tetangga ON houses.rt_id = rukun_tetangga.id
      WHERE
        houses.house_number ILIKE ${`%${query}%`} OR
        blocks.block_name ILIKE ${`%${query}%`} OR
        streets.street_name ILIKE ${`%${query}%`} OR
        houses.house_owner ILIKE ${`%${query}%`} OR
        houses.occupied::text ILIKE ${`%${query}%`} OR
        CONCAT(blocks.block_name, houses.house_number) ILIKE ${`%${query}%`}
      ORDER BY blocks.block_name, houses.house_number ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return houses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch houses');
  }
}

export async function fetchHousesPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM houses
      JOIN blocks ON houses.block_id = blocks.id
      JOIN streets ON houses.street_id = streets.id
      JOIN rukun_tetangga ON houses.rt_id = rukun_tetangga.id
      WHERE
        houses.house_number ILIKE ${`%${query}%`} OR
        blocks.block_name ILIKE ${`%${query}%`} OR
        streets.street_name ILIKE ${`%${query}%`} OR
        houses.house_owner ILIKE ${`%${query}%`} OR
        houses.occupied::text ILIKE ${`%${query}%`} OR
        CONCAT(blocks.block_name, houses.house_number) ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of houses.');
  }
}

export async function fetchHouseById(id: string) {
  try {
    const house = await sql<HouseForm>`
      SELECT
        id,
        house_number,
        house_owner,
        house_tenants,
        occupied,
        block_id,
        street_id,
        rt_id
      FROM houses
      WHERE id = ${id};
    `;

    return house.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
